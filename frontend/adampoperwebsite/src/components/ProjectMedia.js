import React from 'react';

class ProjectMedia extends React.Component {
    constructor(){
        super();
        this.state = {
            mediaComponent: null
        };
    }
    componentDidMount() {
        console.log(this.props.type);
        
        switch(this.props.type){
            case 'video/mp4': 
            {
                const mediaComp = <video autoPlay loop muted><source src={this.props.source}/></video>;
                this.setState({mediaComponent: mediaComp});
            } break;
            case 'image/png':
            case 'image/jpg':
            {
                const mediaComp = <img src={this.props.source}/>
                this.setState({mediaComponent: mediaComp});
                // deal with this later
                let img = new Image();
                img.src=this.props.source;
                if(img.naturalWidth);
            } break;
        }
    }
    render() {
        return(
            <div className='project-media-card'>
                {this.state.mediaComponent}
            </div>
        );
    }
}

export default ProjectMedia;