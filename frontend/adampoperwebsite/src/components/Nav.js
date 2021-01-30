import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
    constructor(){
        super();
        this.state = {};
    }
    componentDidMount() {}

    render(){
        return(
            <div>
                <nav style={{backgroundColor: this.props.backgroundColor}}>
                    <Link to="/" className="linkStyle"><h1>Adam Poper</h1></Link>
                    <ul>
                        <Link to="/" className="linkStyle"><li>Home</li></Link>
                        <Link to="/Projects" className="linkStyle"><li>Projects</li></Link>
                        <Link to="/Photography" className="linkStyle"><li>Photography</li></Link>
                        <Link to="/AboutMe" className="linkStyle"><li>About Me</li></Link>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Nav;