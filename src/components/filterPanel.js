import React, { Component } from 'react'
import DataService from "../services/DataService";
import Card from 'react-bootstrap/Card';

export default class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.suggestFilter = this.suggestFilter.bind(this);
        this.state = {
          filters: [],
          filtersCheckBox: [],
          checkedCheckboxes: [],
          filterText:'',      
        };
      }
      componentDidMount() {
        this.suggestFilter();          
      }
      suggestFilter() {
        DataService.suggestFilter()
          .then(response => {
            this.setState({
                filters: response.data.result.products.facets
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      handleCheckboxChange = (filter) => {
        console.log(filter);
        let exist = false;
        let newRequestText='';
        let checkedtab=this.state.checkedCheckboxes;
        if(checkedtab.length===0){
          checkedtab.push({filter})
        }else{
          for(let item of checkedtab){
            if(item.filter===filter){
              let index = checkedtab.indexOf(item)
              checkedtab.splice(index,1)
              exist=true;
              console.log(exist)
            }          
          }
          console.log(exist)
          if(exist===false){
            checkedtab.push({filter})
          }
        }
        console.log(checkedtab)
        this.setState({
          checkedCheckboxes: checkedtab
      });
      if(checkedtab.length===0){
        newRequestText='';
      }else{
        for (let index = 0; index < checkedtab.length; index++) {
          if(index===checkedtab.length-1){
            newRequestText=newRequestText+checkedtab[index].filter;
          }else{
            newRequestText=newRequestText+checkedtab[index].filter+'&';
          }
        }
        console.log(newRequestText)
      }
      DataService.searchProductWithFilter(newRequestText)
          .then(response => {
            this.setState({
              filterText:newRequestText,
            });
            this.props.setProducts({
                products: response.data.result.products.documents,
                firstPage:response.data.result.products.paging.firstPage.number,
                currentPage:response.data.result.products.paging.currentPage,
                nextPage:response.data.result.products.paging.nextPage.number,
                previousPage:response.data.result.products.paging.previousPage.number,
                lastPage:response.data.result.products.paging.lastPage.number,
                requestText:newRequestText,
            });
            console.log(newRequestText)
          })
          .catch(e => {
            console.log(e);
          });
      };
      render(){ 
        return (
          <Card>
              <div className="container-filter">
                <div className="filter-menu">
                    <div className="menu-heading">
                        <div className="filter-title">
                        </div>
                    </div>
                    <div className="filter-body">
                        {
                            this.state.filters.map((facet)=>(
                                <div key={facet.id} className="filter-group">
                                    <div className="group-heading">
                                        <h2 className=''>{facet.name}</h2>
                                    </div>
                                    {facet.values.map((item)=>(
                                        <div key={item.value} className="checklist">
                                            <label className='subcat'>
                                                <input  type="checkbox"  onClick={()=>this.handleCheckboxChange(item.filter)} name="" value={item.value}/>&nbsp;&nbsp;{item.value}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                       
                    </div>
                </div>
              </div>
        </Card>
        );
      };
}