import React, { Component } from 'react'
import DataService from "../services/DataService";
import Navbar from './navbar';
import Content from './content';
import FilterPanel from './filterPanel';
import Footer from './footer';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.state = {
          products: [],
          users :[],
          firstPage: 1,
          currentPage: 1,
          nextPage:2,
          lastPage:18025,
          previousPage:0,
          requestText:''
        };
        this.update=this.update.bind(this);
        this.updatePanel=this.updatePanel.bind(this);
      }
      update(nextState) {
        this.setState({
          requestText:nextState.requestText,
        })
        DataService.getData(this.state.requestText)
        .then(response => {
          this.setState({
            products: response.data.result.products.documents,
            firstPage:response.data.result.products.paging.firstPage.number,
            currentPage:response.data.result.products.paging.currentPage,
            nextPage:response.data.result.products.paging.nextPage.number,
            previousPage:response.data.result.products.paging.previousPage.number,
            lastPage:response.data.result.products.paging.lastPage.number,
          });
          console.log('its update')
        })
        .catch(e => {
          console.log(e);
        });
        
      }
      updatePanel(nextState) {
        this.setState(nextState);
        console.log('its update')          
      }
      componentDidMount() {
        this.getData(this.state.requestText);
      }
      getPage(number){
        let newRequestText='';
        console.log(this.state.requestText);
        if(this.state.requestText === '')
        {
          newRequestText='page='+number;
          this.setState({
            requestText:newRequestText,
          })
        }else{
          if(this.state.requestText.indexOf('page=')===0){
            newRequestText='page='+number+this.state.requestText.substr(7);
            this.setState({
              requestText:newRequestText,
            })
          }else{
            let result = this.state.requestText.indexOf("page=");
            if(result<0){
              newRequestText=this.state.requestText+"&page="+number;
            }else{
              newRequestText =this.state.requestText.substring(0, result)+"page="+number;
            }
            this.setState({
              requestText:newRequestText,
            })
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
            console.log('its get data')
          })
          .catch(e => {
            console.log(e);
          });
      }
      render(){ 
        return (
          <div className='main-container'>
             <Navbar setProducts={this.updatePanel} />
             <FilterPanel setProducts={this.updatePanel}/>
             <Content products={this.state.products}/>
             <div className='footer-content'>
              <div className="pagination">
                  <div onClick={()=>this.getPage(this.state.currentPage)} className='index'>{this.state.currentPage}</div>
                  <div><p className='index-text'>of</p></div>
                  <div onClick={()=>this.getPage(this.state.currentPage)} className='index'>{this.state.lastPage}</div>
                  <div onClick={()=>this.getPage(this.state.previousPage)} className='index'>❮</div>
                  <div onClick={()=>this.getPage(this.state.nextPage)} className='index'>❯</div>
              </div>
              <br/><br/><br/><br/>
              <Footer/>
            </div>
          </div>
        );
      };
}