import React, { Component } from 'react'
import DataService from "../services/DataService";

export default class Pagination extends Component {
    getPage(number){
        let newRequestText='';
        if(this.props.requestText === '')
        {
          newRequestText='page='+number;
        }else{
          if(this.props.requestText.indexOf('page=')===0){
            newRequestText='page='+number;
          }else{
            let result = this.props.requestText.indexOf("page=");
            if(result<0){
              newRequestText=this.props.requestText+"&page="+number;
            }else{
              newRequestText =this.props.requestText.substring(0, result)+"page="+number;
            }
          }
        }

        DataService.getData(newRequestText)
        .then(response => {
          this.props.setPagination({
            products: response.data.result.products.documents,
            firstPage:response.data.result.products.paging.firstPage.number,
            currentPage:response.data.result.products.paging.currentPage,
            nextPage:response.data.result.products.paging.nextPage.number,
            previousPage:response.data.result.products.paging.previousPage.number,
            lastPage:response.data.result.products.paging.lastPage.number,
            requestText:newRequestText,
            filters: response.data.result.products.facets,
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        })
        .catch(e => {
          console.log(e);
        });
      }
    render(){ 
        return (        
            <div className="pagination">
                  <div className='index'>{this.props.currentPage}</div>
                  <span className='index-text'>of</span>
                  <div className='index'>{this.props.lastPage}</div>
                  <div onClick={()=>this.getPage(this.props.previousPage)} className='index'>❮</div>
                  <div onClick={()=>this.getPage(this.props.nextPage)} className='index'>❯</div>
              </div>
        );}
}