import React from 'react';
import '../photoStyle.css';
import Photoview from './Photoview.js';

class Photograph extends React.Component{
    constructor(){
        super();
        this.state = { 
            imageSource: " ",
            imageName: " ",
            imageFileName: " ",
            viewing: false
        };
        this.setImageState = this.setImageState.bind(this);
        this.clickHandle = this.clickHandle.bind(this);        
    }
    componentDidMount() {
        this.setImageState();
    }
    clickHandle(){
        const v = this.state.viewing ? false : true;
        this.setState({viewing: v});
    }
    setImageState(){
        this.setState({imageSource: this.props.source});
        this.setState({imageName: this.props.name});
        this.setState({imageFilename: this.props.fileName});
    }
    render(){
        return (
            <div className="photo">
                <div className="container">
                    <img src={this.props.source} alt="No data" /> 
                    <button className="view-button" 
                            onClick={this.clickHandle}>
                        View
                    </button>                                        
                </div>
                <h3>{this.props.name}</h3>
                {this.state.viewing ? 
                    <Photoview closeCallBack={this.clickHandle} 
                               imageName={this.state.imageName}
                               source={this.state.imageSource}/>:<p/>}
            </div>
        );
    }
}
export default Photograph;