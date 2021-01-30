import React from 'react';
import background from '../images/coding.jpg';
import IntroMessage from './IntroMessage.js';
import Nav from './Nav.js';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {}
    }
    componentDidMount() {}

    render(){
        return (
            <div>
                <div style={{
                    backgroundImage: `url(${background})`,
                    height: '1000px',
                    scale: '50%',
                    backgroundRepeat: 'no-repeat',
                    background: 'cover'
                }}>
                    <Nav />
                    <IntroMessage />
                </div>
                <div className='aboutme'>
                    
                </div>
            </div>
        );
    }
}
export default Home;