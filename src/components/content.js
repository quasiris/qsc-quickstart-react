import React, { Component } from 'react'
import Content1 from './content1'
import Content2 from './content2'
export default class Content extends Component {
    render(){ 
        return (
                    <div className='layout-2'>
                    {
                        this.props.products.map((product) => (
                            <div key={product.id} className='content'>
                                <div className='content1 centered'>
                                    <Content1 image={product.document.previewImageUrl} />
                                </div>
                                <div className='content2 extend'>
                                    <Content2 name={product.document.name} sku={product.document.sku}/>
                                </div>
                            </div>
                        ))
                    }
                    </div>

        );}
}
