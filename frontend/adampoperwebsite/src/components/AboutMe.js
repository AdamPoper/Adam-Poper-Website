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
                }} className='intro'>
                    <Nav />
                    <h1 className='header'>About Me</h1>
                    <div className='intro-message'>
                        <p>This page is dedicated to providing general information</p>
                        <p>about me including my education, hobbies, interests, and</p>
                        <p>my journey through software engineering so far</p>
                    </div>
                </div>
                <div className='content'>
                    <img src={Adam}/>
                    <div className='introduction'>
                        <h1>Introduction</h1>
                        <p>
                            My name is Adam Poper. I am a student in my junior year attending Slippery Rock University of Pennsylvania pursuing
                            a bachelor of science degree in computer science with the career goal of becoming a software engineer.
                            I have been practicing my computer programming skills for four years now and started when I was 
                            introduced to it in a high school class. Since then I have been in the constant pursuit to learn more about
                            this field and create bigger and greater projects. From a young age, I have always loved builing things and have always
                            been fascinated by how things work the way that they do. Because of this, I have a unique curiosity for learning about all
                            sorts of topics ranging from astronomy to history to computers. I have a tendency to learn very quickly about
                            everying and anything that peaks my interest. Software Engineering is the perfect career path for me 
                            because it gives me the tools and freedom to create and learn about whatever I want, whenever I want to.                    
                        </p>
                        <h1>This Portfolio</h1>
                        <p>
                            There are several purposes of this portfolio. One is to provide a platform to share my software engineering projects
                            in a simple and straight forward way to highlight the languages, technologies, algorithms, and tools I know and how I use them. 
                            I built this website to very flexible and easily updatable for any new projects I make and wish to share.
                            Another purpose is to have an online presence which is becoming increasingly more important
                            for software developers. The next reason is it also gives me a place to store and access
                            photos I take so I can easily share them. The final reason is this website itself is a software project
                            that I can add to my list of technical skills. Making this website has taught me a lot of things 
                            about how web development works. This is a fullstack website which makes use of Node JS for the backend to manage the database
                            of projects and images. The frontend uses React JS to display all the information in a neat and presentfull way.
                        </p>
                        <h1>Education</h1>
                        <p>
                            Currently I am a college student attending Slippery Rock University in Pennylvania. I'm in my junior year
                            pursuing my bachelor degree in computer science.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutMe;