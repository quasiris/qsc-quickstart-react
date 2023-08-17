import React, { Component } from 'react'
import DataService from "../services/DataService";
import Card from 'react-bootstrap/Card';

export default class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.suggestFilter = this.suggestFilter.bind(this);
        this.state = {
          filters: [],
          value: [],
          filtersCheckBox: [],
          filterText:'',      
          search:false,      
          resultNumber:'',      
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
      handleCheckboxChange = (filter,rowIndex,colIndex,item) => {
        const newGrid = this.props.values.map((row, i) =>
          i === rowIndex
            ? row.map((col, j) => (j === colIndex ? !col : col))
            : row
        );
        let newItemsList = this.props.items
        let index = -1;
        if(newItemsList.length > 0){
          for (let i = 0; i < newItemsList.length; i++) {
            if (newItemsList[i].name === item) {
                index= i;
            }
          }
        }
        if(index < 0){
          const newItem = {
            name: item,
            filter: filter,
            rowindex: rowIndex,
            colindex: colIndex
        };
          newItemsList.push(newItem)
        }else{
          newItemsList = newItemsList.filter(itemlist => itemlist.name !== item);
        }
        this.props.setvalues({ value: newGrid,items : newItemsList });
        let exist = false;
        let newRequestText='';
        let checkedtab=this.props.checkedCheckboxes;
        if(checkedtab.length===0){
          checkedtab.push({filter})
        }else{
          for(let item of checkedtab){
            if(item.filter===filter){
              let index = checkedtab.indexOf(item)
              checkedtab.splice(index,1)
              exist=true;
            }          
          }
          if(exist===false){
            checkedtab.push({filter})
          }
        }
      if((checkedtab.length===0)&&(this.props.requestTextNav.length===0)&&(this.props.sortText.length===0)){
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
                resultNumber:response.data.result.products.total,
                requestText:newRequestText,
                checkedCheckboxes:checkedtab 
            });
          })
          .catch(e => {
            console.log(e);
          });
      };
      onChange(e, rowIndex,colIndex){
        const newGrid = this.props.values.map((row, i) =>
          i === rowIndex
            ? row.map((col, j) => (j === colIndex ? e.target.checked : col))
            : row
        );
        this.props.setvalues({ value: newGrid });
     }
      render(){ 
        return (
          <Card>
              <div className="container-filter">
                <div className="filter-menu">
                    <div className="filter-body">
                        {
                            this.state.filters.map((facet,i)=>(
                                <div key={facet.id} className="filter-group">
                                    <div className="group-heading">
                                        <h2 className=''>{facet.name}</h2>
                                    </div>
                                    {facet.values.map((item,j)=>(
                                        <div key={item.value} className="checklist">
                                          <label className='subcat'>
                                            <input type="checkbox" checked={this.props.values[i][j]} onChange={(e) => this.onChange(e,i,j)} onClick={()=>this.handleCheckboxChange(item.filter,i,j,item.value)} name="" value={item.value}/>&nbsp;&nbsp;{item.value}&nbsp;({item.count})
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