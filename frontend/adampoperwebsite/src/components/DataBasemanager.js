import React from 'react';

class DatabaseManager extends React.Component{
    constructor(){
        super();
        this.state = {
            searchImageName: '',
            gitHubApi: ' ',
            mediaToSend: [],
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.onImageSearch = this.onImageSearch.bind(this);
        this.onGithubAPIUpdate = this.onGithubAPIUpdate.bind(this);
        this.onNewProjSubmit = this.onNewProjSubmit.bind(this);
        this.addProjectMedia = this.addProjectMedia.bind(this);
    }
    async contactServer(){
        const response = await fetch('/api');
        const data = await response.json();
        console.log(data.message);
    }
    
    componentDidMount() {
        this.contactServer();
    }
    async submitImage(){
        console.log('submitting');
        const files = document.getElementById('fileInput').files;
        console.log(files);
        const filesArray = Array.prototype.slice.call(files);
        const imageFile = filesArray[0];
        console.log(filesArray[0]);
        const name = imageFile.name;
        const reader = new FileReader(imageFile);
        reader.onload = () => {
            let image64 = reader.result;
            this.submitImageToServer(name, image64);
        };
        reader.readAsDataURL(imageFile);
    }
    async submitImageToServer(name, img64){
        const sendData = {
            imageName: name,
            image64: img64
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        };
        const response = await fetch('/api/imageStore', options);
        const res_data = await response.json();
        console.log(res_data);
    }
    updateSearch(name) { this.setState({searchImageName: name});}
    async onImageSearch(){
        const searchName =this.state.searchImageName;
        console.log('Searching: ' + searchName);
        const sendData = { searchName };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        };
        const response = await fetch('/api/imageRetrieve', options);
        const res_data = await response.json();
        document.getElementById('selectedImage').src = res_data.image64;
    }
    onGithubAPIUpdate(api) {this.setState({gitHubApi: api});}
    addProjectMedia(){
        const proj = this.state.gitHubApi;
        const mediaFilesArray = document.getElementById('projectMedia').files;
        const mediaFile = mediaFilesArray[0];
        console.log(mediaFile);
        const fileType = mediaFile.type;
        const reader = new FileReader();
        reader.onload = () => {
            const data64 = reader.result;
            this.submitMedia(proj, data64, mediaFile.name, fileType)
        }
        reader.readAsDataURL(mediaFile);
    }
    async submitMedia(proj, mediaData, filename, fileType){
        const sendData = {project: proj, media: mediaData, filename: filename, fileType: fileType};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }
        const response = await fetch('/api/projectMedia', options);
        const res_data = await response.json();
        console.log(res_data);
    }
    
    async onNewProjSubmit() {
        const sendData = {
            gitHubApiLink: this.state.gitHubApi
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        }
        const response = await fetch('/api/projectStore', options);
        const res_data = await response.json();
        console.log(res_data);
    }
    
    render(){
        return(
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{margin: '10px', marginRight: '100px'}}>
                    <h1>Image Manager</h1>
                    <input id="fileInput" type="file" onChange={async (e) =>{
                        const files = e.target.files;
                        console.log(e.target.files);
                        const filesArray = Array.prototype.slice.call(files);
                        const imageFile = filesArray[0];
                        console.log(imageFile);
                        const name = imageFile.name;
                        const reader = new FileReader(imageFile);
                        reader.onload = () => {
                            let image64 = reader.result;
                            this.submitImageToServer(name, image64);
                        };
                        reader.readAsDataURL(imageFile);

                    }}></input>
                    <button onClick={this.submitImage}>Submit</button>
                    <br/>
                    <input type="text" id="imageSearch" onChange={(e) => {
                        this.updateSearch(e.target.value);
                    }}/>
                    <button onClick={this.onImageSearch}>Search Image</button>
                    <br/>
                    <img src="" alt="" id="selectedImage" width="400px"/>
                </div>
                <div style={{margin: '10px'}}>
                    <h1>Project Manager</h1>
                    <div>
                        <label>Github API Repo Link</label>
                        <input type='text' onChange={(e) => {this.onGithubAPIUpdate(e.target.value);}}/>
                        <button onClick={this.onNewProjSubmit}>Submit New Project</button>
                    </div>
                    <label>Add Media</label>
                    <input type='file' id='projectMedia'></input>
                    <br />
                    <button onClick={this.addProjectMedia}>Add Project Media</button>
                </div>
            </div>
        );
    }
}

export default DatabaseManager;