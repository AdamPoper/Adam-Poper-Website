import React from 'react';
import '../projectStyle.css';
import ProjectMedia from './ProjectMedia.js';

class ProjectView extends React.Component {
    constructor(){
        super();
        this.state = {
            mediaDataArray: [],
        };
        this.aquireMediaData = this.aquireMediaData.bind(this);
    }
    componentDidMount() {
        console.log('project view');
        console.log(this.props.projectInfo);
        this.aquireMediaData();
    }
    async aquireMediaData(){
        const sendData = {
            apiUrl: this.props.projectInfo.ApiUrl
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        };
        const response = await fetch('api/chooseProject', options);
        const res_data = await response.json();
        this.setState({mediaDataArray: res_data.mediaFilesArray});
        console.log(this.state.mediaDataArray);
    }

    render() {
        let count = 0;
        const mediaComponents = this.state.mediaDataArray.map(media => 
            <ProjectMedia source={media.fullSource} key={count++} type={media.fileType}/>);
        return(
            <div className='project-view'>
                <p className='desc-style'>{this.props.projectInfo.Description}</p>
                <div className='project-content'>
                    <h2>Languages Used:</h2>
                    <h3>{this.props.projectInfo.Language}</h3>
                    <div className='media'>
                        <h2>Images, Demos, & Examples</h2>
                        <div className='media-cards'>{mediaComponents}</div>
                    </div>
                    <div>
                        <p>Check Out the Source Code 
                            <a href={this.props.projectInfo.RepoLink} target='_blank'> Here!</a></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProjectView;