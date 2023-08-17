import React, { Component } from 'react'
import Content1 from './content1'
import Content2 from './content2'
import DataService from '../services/DataService';
export default class Content extends Component {

      toggleDiv (item) {
        let newRequestText='';
        const newGrid = this.props.values.map((row, i) =>
          i === item.rowindex
            ? row.map((col, j) => (j === item.colindex ? !col : col))
            : row
        );
        let newItemsList = this.props.items
        newItemsList = newItemsList.filter(itemlist => itemlist.name !== item.name);
        let checkedtab = this.props.checkedCheckboxes
        for(let itemChecked of checkedtab){
          if(itemChecked.filter===item.filter){
            let index = checkedtab.indexOf(itemChecked)
            checkedtab.splice(index,1)
          }          
        }
        if((checkedtab.length===0)&&(this.props.searchText.length===0)&&(this.props.sortText.length===0)){
          newRequestText='';
        }else{
          for (let index = 0; index < checkedtab.length; index++) {
            if(index===checkedtab.length-1){
              newRequestText=newRequestText+checkedtab[index].filter;
            }else{
              newRequestText=newRequestText+checkedtab[index].filter+'&';
            }
          }
          if(this.props.searchText.length!==0){
              newRequestText='q='+this.props.searchText+'&'+newRequestText;
          }
          if(newRequestText.length===0){
            newRequestText=this.props.sortText
          }else{
            if(this.props.sortText.length>0){
              newRequestText=newRequestText+'&'+this.props.sortText
            }}
  
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
                  requestText:newRequestText,
                  checkedCheckboxes:checkedtab,
                  valuesCheckboxes:newGrid,
                  itemsListCheckedCheckboxes : newItemsList,
              });
            })
            .catch(e => {
              console.log(e);
            });
      };
      toggleDivSearch() {
        let newRequestText='';
        if((this.props.checkedCheckboxes.length===0)&&(this.props.sortText.length===0)){
          newRequestText='';
        }else{
          for (let index = 0; index < this.props.checkedCheckboxes.length; index++) {
            if(index===this.props.checkedCheckboxes.length-1){
              newRequestText=newRequestText+this.props.checkedCheckboxes[index].filter;
            }else{
              newRequestText=newRequestText+this.props.checkedCheckboxes[index].filter+'&';
            }
          }
          if(newRequestText.length===0){
            newRequestText=this.props.sortText
          }else{
          if(this.props.sortText.length>0){
            newRequestText=newRequestText+'&'+this.props.sortText
          }}
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
              requestText:newRequestText,
              searchText: '',
              requestTextNav: '',
              isDivVisible :!this.props.isDivVisible
          });
        })
        .catch(e => {
          console.log(e);
        });
      };
    render(){ 
        return (    <div>
                        <div className='Query-container'>
                            {this.props.isDivVisible && (this.props.searchText.length !== 0) && <div className='sQuery'> <span>"{ this.props.searchText}"</span>&nbsp;&nbsp;<div className='clear-query' onClick={()=>this.toggleDivSearch()} > x</div></div>}
                            {this.props.items && this.props.items.map((item)=> 
                                <div key={item.name} className='sQuery'> <span>"{ item.name}"</span>&nbsp;&nbsp;<div className='clear-query' onClick={()=>this.toggleDiv(item)} > x</div></div>
                            )}
                        </div>
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
                    </div>
                    

        );}
}
