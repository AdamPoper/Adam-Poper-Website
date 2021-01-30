import React from 'react';
import '../photoStyle.css';

class Photoview extends React.Component {
    constructor(){
        super();
        this.state = {
            maxWidth: 1000,
        };
        this.scaleDown = this.scaleDown.bind(this);
        this.scaleUp = this.scaleUp.bind(this);
    }
    componentDidMount() {}
    scaleDown(){
        let w = this.state.maxWidth - 100;
        this.setState({maxWidth: w});
    }
    scaleUp(){
        let w = this.state.maxWidth + 100;
        this.setState({maxWidth: w});
    }
    render(){
        return(
            <div className='modal'>
                <div className='modal-content' style={{
                    maxWidth: this.state.maxWidth
                }}>
                    <button onClick={this.props.closeCallBack}>X</button>
                    <button onClick={this.scaleDown}>-</button>
                    <button onClick={this.scaleUp}>+</button>
                    <img src={this.props.source} alt=''></img>
                    <h1>{this.props.imageName}</h1>
                </div>
            </div>
        );
    }
}
export default Photoview;
