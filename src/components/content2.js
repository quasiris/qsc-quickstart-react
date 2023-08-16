import React, { Component } from 'react'
export default class content1 extends Component {
    
    render(){ 
        return (
            <div>                              
                <div className="product__info">
                    <div className="title">
                    <a href={`https://alexander-buerkle.com/de-de/produkt/${this.props.sku}`} className="title"><p>{this.props.name}</p></a>
                        
                    </div>
                    <div className="price">
                        Sku : <span>{this.props.sku}</span>
                    </div>
                    <a href={`https://alexander-buerkle.com/de-de/produkt/${this.props.sku}`} className="buy--btn">More Deatils</a>
                </div>
            </div>
        );}
}