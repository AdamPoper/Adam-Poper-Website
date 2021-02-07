/*
Author: Adam Poper
Date: 1/11/2021
Last Updated: 2/7/2021
Purpose: This is the backend for adampoper.io. Contains all the api endpoints and manages
         the database of images and projects
*/

const express = require('express');     // using express for the all the server functionality
const DataStore = require('nedb');      // using nedb for storing all the database functionality

const bodyparser = require('body-parser');     // this is so the server can parse the request data as json
const fs = require('fs');                  // fs is needed for reading and writing to files
const path = require('path');              // path isn't technically required but nice to have
const fetch = require('node-fetch');       // this server makes use of the fetch api for making api calls 

/*
    images and projects are stored in separate databases for ease of use and simplicity
    they get loaded immediately before the server does anything else
*/

// loading the image database
const imageDatabase = new DataStore('public/imageDatabase.db');
imageDatabase.loadDatabase();


// loading the images into the program so they are ready to be sent when ever the frontend requests them
const images = [];
initImages();


// loading the project database
const projectDatabase = new DataStore('public/projectDatabase.db');
projectDatabase.loadDatabase();


// loads the project data into the program so they are ready to be access when ever the frontend requests them
// there are api limits for github which is why each project is loaded only once when the server starts 
// to avoid those limits as much as possible
const projects = [];
initProjects();

// initialize the express app
const app = express();
const PORT = 3001;  // front end uses 3000 when in localhost, but uses 80 on the ubuntu server

// begin the listening and set up the settings for the server
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});
app.use(express.static('public'));
app.use(bodyparser.json({limit: '30mb'}));
app.use(express.json({limit: '10mb'}));



/**************************************************/
/*  Endpoints for the client-server communication */
/**************************************************/

// this is only used for testing and debugging
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

// used to send the entire images array to the client
// There is probably a better way to do this but this will do for now
app.get('/api/allImages', (request, response) => {
    console.log('retrieve all images post request');
    response.json({imageArray: images});
});


// Stores info about a new project which is just the github api url 
// because that's where the server gets project info from 
app.post('/api/projectStore', (request, response) => {
    console.log('project store post request');
    const data = request.body;
    //console.log(data);
    if(data.gitHubApiLink !== ' ') {   // so it doesn't store an empty project
        const projData = {
            gitHubApiLink: data.gitHubApiLink,
            mediaFiles: [],         // Initialize the project entry with an empty media files array
        }                           // So they can be added later
        projectDatabase.insert(projData);
    }
    response.json({message: 'thank you'});
});


// Add either a photo or video to a project. Uses the github api url to id the project
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
    decodeDataBase64(mediaData64, mediaFilePath);   // works for either video or image base 64 data

    // update the database entry by pushing a new mediafile entry into the mediafiles array
    // a mediafile entry is its filepath, metadata, and file type (jpg, png or mp4)
    projectDatabase.update({gitHubApiLink: proj}, {$push: {mediaFiles: {mediaFilePath, mediaMetaData, fileType}}}, {}, (error, numUpdated)=>{
        if(error) 
            throw error;
        else 
            console.log('updated: ' + numUpdated);
    });
    projectDatabase.find({}).exec((error, docs)=>{console.log(docs)});
    response.json({message: 'thank you'});
});


// Sends the entire projects array to the client
app.get('/api/allProjects', (request, response) => {
    console.log('get requets made to retrieve all projects');
    response.json({projectsArray: projects});
});


// Retrieves the media files for a particular project. Uses github api url to id the project
// Sends an array of the project media files. Each element is the base 64 data with the metadata
// reappended at the front and the file type
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


// Dedicated for decoding images from base 64 to a buffer to be written to a file
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

// Exact same thing as the function above except used for video and images
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


// Initialize the images by loading every data entry form the imageDatabase as base 64
// Stores its info as an element in the images array
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


// Initialize the projects by loading every entry from the projectDatabase
// This only happens once per project when the server starts as not to go over the github api limits
// Each element in the project database is the api url, title, repo url, language used, description, and id
// This function is async because it uses the fetch api to get the project data from github
// Uses the github api to get the repository url, Title, Description, and Language
async function initProjects(){
    projectDatabase.find({}, async (error, docs) => {
        if(error)
            throw error;
        else{
            for(let i = 0; i < docs.length; i++){
                const api = docs[i].gitHubApiLink;
                const id = docs[i]._id;
                const response = await fetch(api);
                const proj_data = await response.json();
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