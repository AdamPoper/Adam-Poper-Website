import React from 'react';
import '../App.css';
class IntroMessage extends React.Component {
    constructor(){
        super();
        this.state = {};
    }
    componentDidMount() {}

    render(){
        return(
            <div className="message">
                <h3>Adam Poper</h3>
                <p>Software Engineer and Computer Science Student
                </p>
                <p>Slippery Rock University</p>
            </div>
        );
    }
}
export default IntroMessage;