import React from 'react';
import FooterComponent from './FooterComponent.js';
import snapImg from '../images/snap.png';
import instaImg from '../images/insta.png';
import gitImg from '../images/github.png';
import mailImg from '../images/mail.png';
import linkdImg from '../images/linkedin.png';

class Footer extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    componentDidMount() {}

    render(){
        return(
            <div>
                <footer>
                    <div>
                        <FooterComponent source={snapImg}  link='https://www.snapchat.com/add/silence1999'/>
                        <FooterComponent source={instaImg} link='https://www.instagram.com/adamrpoper/'/>
                        <FooterComponent source={gitImg}   link='https://github.com/AdamPoper'/>
                        <FooterComponent source={mailImg}  link='adampoper@gmail.com'/>
                        <FooterComponent source={linkdImg} link='https://www.linkedin.com/in/adam-poper-9a83a6186/'/>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;