import React ,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import DataService from '../services/DataService';
import ListGroup from 'react-bootstrap/ListGroup';

  export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
        this.suggestProducts = this.suggestProducts.bind(this);
        this.toggleDropdownn = this.toggleDropdownn.bind(this);
        this.onChangeSearchFromSuggest = this.onChangeSearchFromSuggest.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {
          searchText: "",
          search: false,
          successful: false,
          openDropdown: false,
          message: "",
          dataSuggest:[],
          checkedCheckboxes:[],
          valuesCheckboxes:[]
        };
    }
    componentDidUpdate(prevProps) {
      if (this.props.someProp !== prevProps.someProp) {
        console.log('Props have changed:', this.props.someProp);
      }
    }
    componentDidMount() {
      const rows = 50;
      const cols = 50; 
      const valuesCheckboxes = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => false)
      );
      this.setState({ valuesCheckboxes }); 
    }
    enterPressed(event) {
      var code = event.keyCode || event.which;
      if(code === 13) { //13 is the enter keycode
          this.searchProducts(this.props.searchText);
      } 
      this.toggleDropdownn();
  }
    searchProducts(searchText) {
      this.toggleDropdownn();
      let requestText=''
      if(this.props.sortText.length===0){
        if(searchText.length===0){
          requestText= searchText
       }else{
         requestText='q='+searchText
       }
      }else{
        if(searchText.length===0){
          requestText= this.props.sortText
       }else{
         let result = this.props.sortText.indexOf("q=");
            if(result<0){
              requestText='q='+searchText+'&'+this.props.sortText
            }else{
              requestText =this.props.sortText.substring(0, result)+"q="+searchText;
            }
       }
      }
      
        DataService.getData(requestText)
        .then(response => {
          this.props.setProducts({
              products: response.data.result.products.documents,
              firstPage:response.data.result.products.paging.firstPage.number,
              currentPage:response.data.result.products.paging.currentPage,
              nextPage:response.data.result.products.paging.nextPage.number,
              previousPage:response.data.result.products.paging.previousPage.number,
              lastPage:response.data.result.products.paging.lastPage.number,
              resultNumber:response.data.result.products.total,
              requestText: requestText,
              searchText: searchText,
              isDivVisible: true,
              requestTextNav: requestText,
              checkedCheckboxes: [],
              itemsListCheckedCheckboxes: [],
              valuesCheckboxes:this.state.valuesCheckboxes
          });
        })
        .catch(e => {
          console.log(e);
        });
      }
      suggestProducts(searchText) {
        DataService.suggestProducts(searchText)
        .then(response => {
          this.setState({
            dataSuggest: response.data,
          });
        })
        .catch(e => {
          console.log(e);
        });
      }
    onChangeSearchText(e) {
        const searchText = e.target.value;
        
        this.props.setProducts({
          searchText: searchText
        }, () => {
          document.addEventListener('click', this.toggleDropdownn)
      });
        this.suggestProducts(searchText);
        if(this.state.openDropdown === false){
          this.setState({ 
            openDropdown : true,
           });
        }
        this.setState({ 
          searchText: searchText
         });

      }
    onChangeSearchFromSuggest(suggest){
      this.setState({
        searchText: suggest
      });
      this.searchProducts(suggest);
    }
    toggleDropdownn() {
      this.setState({ 
        openDropdown : false
       });
    }
    render() {
        return(
              <header className="header">
                <a href='https://www.quasiris.de/de/quasiris-search-cloud/' className='logo-container'>
                    <img className='img-logo' alt='' src='https://www.quasiris.de/wp-content/uploads/2017/03/logo.png'></img>
                </a>
                <div className="search-bar-container">
                  <div className="search-container">
                    <input type='text' className="search-input" name="searchText" placeholder='Search...'
                        value={this.props.searchText}
                        onChange={this.onChangeSearchText}
                        onKeyPress={this.enterPressed}>
                      </input>
                    <span onClick={()=>this.searchProducts(this.props.searchText)} className="search-icon">               
                      <button className='icon-style' ><FontAwesomeIcon icon={faSearch}/></button>
                    </span>    
                  </div>
                  <div className='search-result'>
                  <ListGroup  onBlur={() => this.toggleDropdownn()} variant="flush" className='list'> 
                        {this.state.openDropdown ? ( this.state.dataSuggest.map((item)=> (
                          <ListGroup.Item onClick={()=>this.onChangeSearchFromSuggest(item.suggest)} key = {item.suggest} className='listItem'>                   
                            <FontAwesomeIcon icon={faSearch}/>&nbsp;&nbsp;
                            <strong>{item.suggest}</strong>
                          </ListGroup.Item>
                        ))): (null)}
                      </ListGroup >
                  </div>
                </div>
              </header>
        );
    }
}
