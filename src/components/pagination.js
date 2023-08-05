import React, { Component } from 'react'
export default class Pagination extends Component {
    
    render(){ 
        return (        
            <div className="pagination">
                  <div onClick={()=>this.getPage(this.state.currentPage)} className='index'>{this.state.currentPage}</div>
                  <div><p className='index-text'>of</p></div>
                  <div onClick={()=>this.getPage(this.state.currentPage)} className='index'>{this.state.lastPage}</div>
                  <div onClick={()=>this.getPage(this.state.previousPage)} className='index'>❮</div>
                  <div onClick={()=>this.getPage(this.state.nextPage)} className='index'>❯</div>
              </div>
        );}
}