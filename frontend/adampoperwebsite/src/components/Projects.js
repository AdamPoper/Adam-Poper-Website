import React from 'react';
import Nav from './Nav.js';
import Project from './Project.js';
import '../projectStyle.css';
import background from '../images/coding.jpg';
import ProjectView from './ProjectView.js';

class Projects extends React.Component{
    constructor(){
        super();
        this.state = {
            projects: [],
            projectTitle: 'Projects',
            currentProject: {},
            viewingProj: false
        };
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.setActiveProject = this.setActiveProject.bind(this);
    }
    componentDidMount() {
        this.retrieveProjects();
    }
    async retrieveProjects(){
        const reponse = await fetch('/api/allProjects');
        const data = await reponse.json();
        this.setState({projects: data.projectsArray});
        console.log(this.state.projects);
    }
    setActiveProject(proj) {
        this.setState({currentProject: proj});
        this.setState({projectTitle: proj.Title});
        this.setState({viewingProj: true});
    }
    render(){        
        const projects = this.state.projects.map(proj => 
            <Project projectInfo={proj} key={proj.id}
            onSelectHandle={this.setActiveProject}
            />
        );

        return(
            <div className='projects-page'>
                <div style={{
                    backgroundImage: `url(${background})`
                }} className='projects-intro'>
                    <Nav />
                    <h1 className='projects-header'>Project Showcase</h1>
                    <div className='intro-message'>
                        <p>Welcome to my personal project collection.</p>
                        <p>These projects highlight the languages, skills,</p>
                        <p>and technologies I know and how I use them.</p>
                    </div>
                </div>
                <div className='project-viewing'>
                    <button style={{display: this.state.viewingProj ? '': 'none'}} 
                            onClick={() => {this.setState({viewingProj: false})}}>Back</button>
                    <h1 className='project-header'>{this.state.viewingProj ? this.state.projectTitle : 'Projects'}</h1>
                    <div className='projects'>
                        <div style={{
                            display: this.state.viewingProj ? 'none' : '',
                        }}>{projects}</div>
                        <div>
                            {this.state.viewingProj ? <ProjectView projectInfo={this.state.currentProject}/> : <div/>}
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}
export default Projects;