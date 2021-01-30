import React from 'react';
import '../projectStyle.css';

class Project extends React.Component {
    constructor(){
        super();
        this.state = {
            
        };
        this.onProjectClick = this.onProjectClick.bind(this);
    }
    componentDidMount() {
        console.log(this.props.projectInfo);
    }

    async onProjectClick(){
        this.props.onSelectHandle(this.props.projectInfo);
    }

    render(){
        return(
            <div className='project'>
                <h1 onClick={this.onProjectClick}>{this.props.projectInfo.Title}</h1>
                <p>{this.props.projectInfo.Description}</p>
                <h5>{this.props.projectInfo.Language}</h5>
                <h5><a href={this.props.projectInfo.RepoLink} target='_blank' rel='noreferrer'>{this.props.projectInfo.RepoLink}</a></h5>
            </div>
        );
    }
}
export default Project;