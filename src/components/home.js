import React, { Component } from 'react'
import DataService from "../services/DataService";
import Navbar from './navbar';
import Content from './content';
import Pagination from './pagination';
import FilterPanel from './filterPanel';
import Footer from './footer';
import Sort from './sort';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
          products: [],
          filters: [],
          users :[],
          itemsListCheckedCheckboxes :[],
          sort  :[],
          checkedCheckboxes: [] ,
          firstPage:0,
          currentPage:0,
          nextPage:0,
          lastPage:0,
          previousPage:0,
          search:false,
          isDivVisible:false,
          sortText:'',
          resultNumber:'',
          requestText:'',
          searchText:'',
          requestTextNav:'',
          
        };
        this.update=this.update.bind(this);
      }
      update(nextState) {
        this.setState(nextState) 
      }
      componentDidMount() {
        this.getData(this.state.requestText);      
      }
      getData(newRequestText) {
        DataService.getData(newRequestText)
          .then(response => {
            this.setState({
                products: response.data.result.products.documents,
                firstPage:response.data.result.products.paging.firstPage.number,
                currentPage:response.data.result.products.paging.currentPage,
                nextPage:response.data.result.products.paging.nextPage.number,
                previousPage:response.data.result.products.paging.previousPage.number,
                lastPage:response.data.result.products.paging.lastPage.number,
                resultNumber:response.data.result.products.total,
                sort:response.data.result.products.sort.sort,
                filters: response.data.result.products.facets
            });
          })
          .catch(e => {
            console.log(e);
          });
      }      
      
      render(){ 
        return (
          <div className='main-container'>
             <Navbar sortText={this.state.sortText} searchText={this.state.searchText}  setProducts={this.update} />
             <div className='top-content'>
                <div className='header-content'>
                    <div className="menu-heading">
                        <div className="filter-title">
                          <h2 className=''>Products </h2>
                          <h5 className=''>{this.state.resultNumber} results found</h5>
                        </div>
                    </div>
                </div>
                <div className='sort-content'>
                    <br/>
                    <Sort requestText={this.state.requestText} sort={this.state.sort} searchText={this.state.searchText} checkedCheckboxes={this.state.checkedCheckboxes} setProducts={this.update}/>
                </div>
             </div>
             <div className='main-content'> 
                <FilterPanel filters={this.state.filters} resultNumber={this.state.resultNumber} items={this.state.itemsListCheckedCheckboxes} checkedCheckboxes={this.state.checkedCheckboxes} searchText={this.state.searchText} sortText={this.state.sortText} setProducts={this.update} setvalues={this.update}/>
                <Content products={this.state.products} checkedCheckboxes={this.state.checkedCheckboxes} items={this.state.itemsListCheckedCheckboxes} searchText={this.state.searchText} sortText={this.state.sortText} isDivVisible={this.state.isDivVisible} setProducts={this.update}  />
             </div>
             <div className='footer-content'>
                <Pagination requestText={this.state.requestText} currentPage={this.state.currentPage} lastPage={this.state.lastPage} previousPage={this.state.previousPage} nextPage={this.state.nextPage} setPagination={this.update}/>
                <br/><br/><br/><br/>
                <Footer/>
            </div>
          </div>
        );
      };
}