import React from 'react';

class FooterComponent extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    componentDidMount() {}

    render(){
        return(
            <div className='footer-comp'>
                <a href={this.props.link} target='_blank' rel='noreferrer'><img src={this.props.source} alt=''/></a>
            </div>
        );
    }
}
export default FooterComponent;