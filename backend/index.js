const express = require('express');
const DataStore = require('nedb');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { response } = require('express');

const imageDatabase = new DataStore('public/imageDatabase.db');
imageDatabase.loadDatabase();

const projectDatabase = new DataStore('public/projectDatabase.db');
projectDatabase.loadDatabase();

const app = express();
const PORT = 3001;  // front end uses 3000

const projects = [];
initProjects();

const images = [];
initImages();

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});

app.use(express.static('public'));
app.use(bodyparser.json({limit: '30mb'}));
app.use(express.json({limit: '10mb'}));

app.get('/api', (request, response)=>{
    console.log('Get request made');
    response.json({message: 'Connection made'});
});
app.get('/api/test', (request, response)=>{
    console.log('Get request made');
    response.json({message: 'Connection made'});
});
// submit an image to the server to be stored in the database
app.post('/api/imageStore', (request, response) => {
    console.log('image store post request');
    const data = request.body;
    const fileName = data.imageName;
    const name = data.imageName.split('.')[0];
    let image64 = data.image64;
    const filePath = path.join(__dirname, '/public/images/', fileName);
    const imageData = image64.split(',');
    image64 = imageData[1];
    const metaData = imageData[0];
    decodeImage64(image64, filePath);
    const newData = {
        imageName: name,
        imageFileName: fileName,
        imageFilePath: filePath,
        imageMetaData: metaData
    };
    imageDatabase.insert(newData);
    response.json({message: 'thank you'});
});

// retrieve an image from the database at a later time 
app.post('/api/imageRetrieve', (request, response) => {
    console.log('image retrieve post request');
    const data = request.body;
    const searchName = data.searchName;
    console.log('searching db for entry ' + searchName);
    imageDatabase.findOne({imageName: searchName}, (error, doc) =>{
        if(error) throw error;
        else{
            if(doc != null && searchName === doc.imageName){
                const image64 = fs.readFileSync(doc.imageFilePath, 'base64');
                const fullImageSrc = doc.imageMetaData + ',' + image64;
                const res_data = {
                    message: 'retrieved successfully',
                    image64: fullImageSrc,
                };
                response.json(res_data);
            }
            else {
                response.json({message: 'No Image Found'});
            }
        }
    });
});
app.get('/api/allImages', (request, response) => {
    console.log('retrieve all images post request');
    response.json({imageArray: images});
});

app.post('/api/projectStore', (request, response) => {
    console.log('project store post request');
    const data = request.body;
    //console.log(data);
    if(data.gitHubApiLink !== ' ') {
        const projData = {
            gitHubApiLink: data.gitHubApiLink,
            mediaFiles: [],
        }
        projectDatabase.insert(projData);
    }
    response.json({message: 'thank you'});
});

app.post('/api/projectMedia', (request, response) => {
    const data = request.body;
    const proj = data.project;
    const media = data.media;
    const filename = data.filename;
    const fileType = data.fileType;
    const mediaData = media.split(',');
    const mediaData64 = mediaData[1];
    const mediaMetaData = mediaData[0];
    const mediaFilePath = path.join(__dirname, '/public/projectMedia', filename);
    decodeDataBase64(mediaData64, mediaFilePath);
    projectDatabase.update({gitHubApiLink: proj}, {$push: {mediaFiles: {mediaFilePath, mediaMetaData, fileType}}}, {}, (error, numUpdated)=>{
        if(error) throw error;
        else console.log('updated: ' + numUpdated);
    });
    projectDatabase.find({}).exec((error, docs)=>{console.log(docs)});
    response.json({message: 'thank you'});
});
app.get('/api/allProjects', (request, response) => {
    console.log('get requets made to retrieve all projects');
    response.json({projectsArray: projects});
});

app.post('/api/chooseProject', (request, response) =>{
    const data = request.body;
    console.log('post request made to get media for ' + data);
    projectDatabase.findOne({gitHubApiLink: data.apiUrl}, (error, doc) => {
        if(error) 
            throw error;
        else {
            console.log(doc);
            const mediaData = [];
            for(let i = 0; i < doc.mediaFiles.length; i++){
                console.log(doc.mediaFiles[i].mediaFilePath);
                const rawData64 = fs.readFileSync(doc.mediaFiles[i].mediaFilePath, 'base64');
                const fileType = doc.mediaFiles[i].fileType;
                const fullSource = doc.mediaFiles[i].mediaMetaData + ',' + rawData64;
                mediaData.push({fullSource, fileType});
            }
            response.json({mediaFilesArray: mediaData});
        }
    });
});

function decodeImage64(image64, filePath){
    const imageBuffer = Buffer.from(image64, 'base64');
    fs.writeFileSync(filePath, imageBuffer, (error) => {
        if(error) throw error;
        else{
            console.log('file created from image64');
            return true;
        }
    });
}
function decodeDataBase64(dataBase64, filePath){
    const dataBuffer = Buffer.from(dataBase64, 'base64');
    fs.writeFileSync(filePath, dataBuffer, (error) => {
        if(error) throw error;
        else {
            console.log('file created from base64');
            return true;
        }
    });
}
function initImages(){
    imageDatabase.find({}, (error, docs) => {
        if(error) throw error;
        else{
            for(let i = 0; i < docs.length; i++){
                const image64 = fs.readFileSync(docs[i].imageFilePath, 'base64');
                const fullImageSrc = docs[i].imageMetaData + ',' + image64;
                const name = docs[i].imageName;
                const fileName = docs[i].imageFileName;
                const id = docs[i]._id;
                const imageData = {
                    image64: fullImageSrc,
                    imageName: name,
                    fileName: fileName,
                    id: id
                };
                images.push(imageData);
            }
        }
    });
}

function initProjects(){
    projectDatabase.find({}, async (error, docs) => {
        if(error)
            throw error;
        else{
            for(let i = 0; i < docs.length; i++){
                const api = docs[i].gitHubApiLink;
                const id = docs[i]._id;
                const response = await fetch(api);
                const proj_data = await response.json();
                //console.log(proj_data);
                const project = {
                    ApiUrl: proj_data.url,
                    Title: proj_data.name.replace(/-/g, ' '),
                    RepoLink: proj_data.html_url,
                    Description: proj_data.description,
                    Language: proj_data.language,
                    id: id
                };
                projects.push(project);
            }
        }
    });
}

