import React, { Component } from 'react'
import DataService from "../services/DataService";

export default class Sort extends Component {

      handleSelectChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        let newRequestText='';
        if(this.props.requestText === '')
        {
          newRequestText='sort='+selectedOption.value
        }else{
          for (let index = 0; index < this.props.checkedCheckboxes.length; index++) {
            if(index===this.props.checkedCheckboxes.length-1){
              newRequestText=newRequestText+this.props.checkedCheckboxes[index].filter;
            }else{
              newRequestText=newRequestText+this.props.checkedCheckboxes[index].filter+'&';
            }
          }
          if(newRequestText.length!==0){
            if(this.props.searchText.length===0){
              newRequestText=newRequestText+"&sort="+selectedOption.value;
            }else{
              newRequestText=newRequestText+'&q='+this.props.searchText+"&sort="+selectedOption.value;
            }
          }else{
            if(this.props.searchText.length===0){
              newRequestText="sort="+selectedOption.value;
            }else{
              newRequestText='q='+this.props.searchText+"&sort="+selectedOption.value;
            }
  
          }
          
        }
        DataService.getData(newRequestText)
          .then(response => {
            this.props.setProducts({
                products: response.data.result.products.documents,
                firstPage:response.data.result.products.paging.firstPage.number,
                currentPage:response.data.result.products.paging.currentPage,
                nextPage:response.data.result.products.paging.nextPage.number,
                previousPage:response.data.result.products.paging.previousPage.number,
                lastPage:response.data.result.products.paging.lastPage.number,
                resultNumber:response.data.result.products.total,
                sort:response.data.result.products.sort.sort,
                sortText:"sort="+selectedOption.value,
                requestText:newRequestText,
            });
          })
          .catch(e => {
            console.log(e);
          });
      };
    render(){ 
        return (        
            <div className="select">
                        <select onChange={this.handleSelectChange}>
                        {   
                          this.props.sort.map((sortItem) => (
                            <option key={sortItem.id}  value={sortItem.id}>{sortItem.name}</option>
                          ))
                        }

                      </select>
                    </div>
        );}
}