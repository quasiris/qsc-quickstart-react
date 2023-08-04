import React, { Component } from 'react'
export default class content1 extends Component {
    render(){ 
        return (        
            <div className="photo-main">
                <img style={{minWidth:'250px',minHeight:'250px',maxHeight:'60px',maxWidth: '60px'}} src={this.props.image} alt="green apple slice"/>
            </div>
        );}
}