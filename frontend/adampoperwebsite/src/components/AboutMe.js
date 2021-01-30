import React from 'react';
import sunset from '../images/sunset1.jpg';
import Adam from '../images/Adam_Jobs.jpg';
import Nav from './Nav.js';
import '../aboutMeStyles.css';

class AboutMe extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {

    }
    render() {
        return(
            <div className='aboutme'>
                <div style={{
                    backgroundImage: `url(${sunset})`,
                    backgroundRepeat: 'no-repeat',
                    height: 929,
                }}>
                    <Nav />
                </div>
                <div className='content'>
                    <img src={Adam}/>
                </div>
            </div>
        );
    }
}
export default AboutMe;