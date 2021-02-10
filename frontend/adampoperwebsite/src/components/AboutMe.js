import React from 'react';
import sunset from '../images/sunset1.jpg';
import textbook from '../images/textbook.jpg';
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
                    <div className='paragraphs'>
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
                            about how web development works. This is a fullstack website made completely from scrath which makes use 
                            of Node JS for the backend to manage the database of projects and images. The frontend uses React JS to display 
                            all the information in a neat and presentfull way. The site itself is being hosted by digital ocean
                            on an Ubuntu server. All the styling was done by me to practice using CSS. Every picture was taken 
                            by me using my photography skills, every page was specially crafted to present the information as easy and simply as possible.
                        </p>
                        <h1>Education</h1>
                        <p>
                            Currently I am a college student attending Slippery Rock University in Pennylvania. I'm in my junior year
                            pursuing my bachelor of science degree in computer science. Previously I was a student at Reading Area
                            Community College where I achieved and Associate of Arts Degree before I transfered to Slippery Rock. 
                            My achievements include making the dean's list for my 2018 fall, 2019 fall, and 2020 fall semesters. 
                            I also received membership into the Phi Theta Kappa Honors Society after the spring 2019 semester.
                        </p>
                        <h1>Software Engineering</h1>
                        <p>
                            I was first introduced to computer programming in a high school class I took my senior year where we learned the 
                            basics of C++. During this year we learned the fundamentals of programming including basic arithmetic, variables,
                            strings, arrays, loops, if-statements, functions, etc. During this year I was fascinated by using programming
                            to build things that are fun or useful to solve a real-world problems. I've always loved making things. Especially 
                            as a kid I loved building with legos and in high school I really enjoyed wood shop class in high school.
                            Getting exposed to computer programming my senior year was the best thing that could have happened to me because
                            it layed the ground work for how I would plan my future career. 
                            <br />
                            After high school, I continued learning more about programming through expanding my knowledge about C++. I taught my self 
                            more advanced topics like object oriented programming and how to manage my own memory. But when I took the Computer Science II
                            class at Kutztown University, I learned how to implement these advanced topics more professionally by making my own
                            data structures like linked lists, stacks, queues, and dynamic arrays. After this I felt really confident in my 
                            programming abilities and started exploring libraries like SFML and OpenGL to make more complicated interactive
                            applications with graphics. I made basic games like flappy bird and checkers with SFML and a solar system simulation 
                            with OpenGL. During this time I became captivated in the world of computer graphics. In summer 2020, 
                            I began work on a 2D graphics library for C++ using OpenGL. On my github there is a project called Canvas that 
                            showcases all the features that my graphics rendering engine is capable of. 
                            <br/>
                            Now that I'm a junior in college, I've
                            self educated myself so much I'm at the point where I feel like I can teach my self anything. Which leads me to where I am now.
                            I created this website in a little over a month where I learned that fundamentals of node JS, express JS, NEDB, and react JS
                            to explore full stack web developement so I could make this website and hopefully give me an advantage when applying for 
                            summer internships and full time jobs. The learning never stops in software developement because there is always something 
                            new to do which is why I really want this to be my career. I'm excited for the future because the best is yet to come.                              
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutMe;