import React from 'react';
import Nav from './Nav.js';
import Photograph from './Photograph';
import '../App.css';
import background from '../images/mkway1.jpg';

class Photography extends React.Component {
    constructor(){
        super();
        this.state = {
            imageCards: [],
            isLoading: false
        };
        this.initServerContact = this.initServerContact.bind(this);
    }
    componentDidMount() {
        this.initServerContact();
    }
    async initServerContact(){
        const response = await fetch('/api/allImages');
        const data = await response.json();
        const imageArray = data.imageArray;
        this.setState({imageCards: imageArray});
    }
    render(){
        const imageComponents = this.state.imageCards.map(img => 
            <Photograph key={img.id} source={img.image64} name={img.imageName}
             fileName={img.fileName}/>
        );
        let message;
        if(imageComponents.length === 0)
            message = 'Loading...';
        else
            message = 'Photographs';
        return(
            <div className='photography'>
                <div style={{
                    backgroundImage: `url(${background})`,
                }} className='photos-Introduction'>
                    <Nav />
                    <h1 className='photographyHeader'>Photography</h1>
                    <div className='photographyDescription'>
                        <p>Welcome to my gallery of photographs</p>
                        <p>This is a portfolio of pictures taken by me</p>
                        <p>These are my favortites and represent my best work</p>
                    </div>
                </div>
                <div className='photo-container'>
                    <h1 className='photographyHeader'>{message}</h1>
                    <div className='photos'>{imageComponents}</div>                        
                </div>
            </div>    
        );
    }
}
export default Photography;