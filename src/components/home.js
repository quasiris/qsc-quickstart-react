import React, { Component } from 'react'
import DataService from "../services/DataService";
import Navbar from './navbar';
import Content from './content';
import Pagination from './pagination';
import FilterPanel from './filterPanel';
import Footer from './footer';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
          products: [],
          users :[],
          value :[],
          items :[],
          checkedCheckboxes: [] ,
          firstPage: 1,
          currentPage: 1,
          nextPage:2,
          lastPage:18025,
          previousPage:0,
          search:false,
          isDivVisible:false,
          sortText:'',
          resultNumber:'',
          requestText:'',
          searchText:'',
          requestTextNav:'',
          sort:[]
        };
        this.update=this.update.bind(this);
        this.updatePanel=this.updatePanel.bind(this);
      }
      update(nextState) {
        this.setState(nextState) 
      }
      updatePanel(nextState) {
        this.setState(nextState);
      }
      componentDidMount() {
        this.getData(this.state.requestText);      
        const rows = 50;
        const cols = 50; 
        const value = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => false)
        );
        this.setState({ value });  
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
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      handleSelectChange = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        let newRequestText='';
        if(this.state.requestText === '')
        {
          newRequestText='sort='+selectedOption.value
        }else{
          for (let index = 0; index < this.state.checkedCheckboxes.length; index++) {
            if(index===this.state.checkedCheckboxes.length-1){
              newRequestText=newRequestText+this.state.checkedCheckboxes[index].filter;
            }else{
              newRequestText=newRequestText+this.state.checkedCheckboxes[index].filter+'&';
            }
          }
          if(newRequestText.length!==0){
            if(this.state.searchText.length===0){
              newRequestText=newRequestText+"&sort="+selectedOption.value;
            }else{
              newRequestText=newRequestText+'&q='+this.state.searchText+"&sort="+selectedOption.value;
            }
          }else{
            if(this.state.searchText.length===0){
              newRequestText="sort="+selectedOption.value;
            }else{
              newRequestText='q='+this.state.searchText+"&sort="+selectedOption.value;
            }
  
          }
          
        }
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
          <div className='main-container'>
             <Navbar sortText={this.state.sortText} searchText={this.state.searchText}  setProducts={this.updatePanel} />
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
                    <div className="select">
                        <select onChange={this.handleSelectChange}>
                        {   
                          this.state.sort.map((sortItem) => (
                            <option key={sortItem.id}  value={sortItem.id}>{sortItem.name}</option>
                          ))
                        }

                      </select>
                    </div>
                </div>
             </div>
             <div className='main-content'> 
                <FilterPanel resultNumber={this.state.resultNumber} values={this.state.value} items={this.state.items} checkedCheckboxes={this.state.checkedCheckboxes} requestTextNav={this.state.requestTextNav} searchText={this.state.searchText} sortText={this.state.sortText} setProducts={this.updatePanel} setvalues={this.update}/>
                <Content products={this.state.products} requestTextNav={this.state.requestTextNav} values={this.state.value} checkedCheckboxes={this.state.checkedCheckboxes} items={this.state.items} searchText={this.state.searchText} sortText={this.state.sortText} isDivVisible={this.state.isDivVisible} setProducts={this.update}  />
             </div>
             <div className='footer-content'>
                <Pagination requestText={this.state.requestText} currentPage={this.state.currentPage} lastPage={this.state.lastPage} previousPage={this.state.previousPage} nextPage={this.state.nextPage} setPagination={this.updatePanel}/>
                <br/><br/><br/><br/>
                <Footer/>
            </div>
          </div>
        );
      };
}