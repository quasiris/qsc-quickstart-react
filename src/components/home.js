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
          checkedCheckboxes: [] ,
          firstPage: 1,
          currentPage: 1,
          nextPage:2,
          lastPage:18025,
          previousPage:0,
          search:false,
          requestText:'',
          requestTextNav:''
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
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
      render(){ 
        return (
          <div className='main-container'>
             <Navbar setProducts={this.updatePanel} />
             <FilterPanel values={this.state.value} checkedCheckboxes={this.state.checkedCheckboxes} requestTextNav={this.state.requestTextNav} setProducts={this.updatePanel} setvalues={this.update}/>
             <Content products={this.state.products}/>
             <div className='footer-content'>
                <Pagination requestText={this.state.requestText} currentPage={this.state.currentPage} lastPage={this.state.lastPage} previousPage={this.state.previousPage} nextPage={this.state.nextPage} setPagination={this.updatePanel}/>
                <br/><br/><br/><br/>
                <Footer/>
            </div>
          </div>
        );
      };
}