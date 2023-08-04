import http from "../http-common";

class DataService {
    getproducts() {
        return http.get("search/ab/products?q=");
      }
    searchProduct(searchText) {
    return http.get(`search/ab/products?q=${searchText}`);
    }
    searchProductWithFilter(filter) {
    return http.get(`search/ab/products?${filter}`);
    }
    suggestProducts(searchText) {
    return http.get(`suggest/ab/products?q=${searchText}`);
    }
    suggestFilter() {
    return http.get(`search/ab/products`);
    }
    getPage(number) {
    return http.get(`search/ab/products?page=${number}`);
    }
    getData(requestText) {
    return http.get(`search/ab/products?${requestText}`);
    }
}
export default new DataService();