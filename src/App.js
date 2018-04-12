import React, {Component} from 'react';
import {Header} from './components/header';
import {ProductGrid} from './components/productGrid';
import {DropSelect} from './components/dropSelect';
import {ButtonGroup} from './components/buttonGroup';
import {Footer} from './components/footer';
import './assets/css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, products: [], productChunks: [], pagination: {currentPage: 1, currentCount: 0, totalCount: 0, isLoading: true, isFetching: false, pageSize: 50, isLastPage: false}, adIndices: [], sortParms: {sortProp: 'size', sortDirection: 'ASC'}};

    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleSortPropChange = this.handleSortPropChange.bind(this);
    this.handleSortDirectionChange = this.handleSortDirectionChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.fetchProducts();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  componentDidUpdate(nextProps, nextState) {
    // unfortunately we have to use a different method of checking object equality
    // because the default javascript comparision will return false if both objects have different references
    if (!this.myObjectEqual(this.state.sortParms, nextState.sortParms) || this.state.pagination.pageSize !== nextState.pagination.pageSize) {
      // fetch new results if the page size or sort parameters change
      this.fetchProducts();
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <main role="main">
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="jumbotron-heading">Products Grid</h1>
              <p className="lead text-muted">Here you&apos;re sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices..</p>

            </div>
          </section>
        </main>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="album py-5 bg-light">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <p>Currently displaying {this.state.pagination.currentCount} of {this.state.pagination.totalCount} products</p>
                  <div className="btn-toolbar mb-2 mb-md-0">

                    <ButtonGroup options={[{title: 'ASC', onSelect: () => this.handleSortDirectionChange('asc')}, {title: 'DESC', isDisabled: true}]}/>
                    <DropSelect label="Page size" items={[{title: '20', onSelect: () => this.handlePageSizeChange(20)}, {title: '50', onSelect: () => this.handlePageSizeChange(50)}, {title: '100', onSelect: () => this.handlePageSizeChange(100)}]} defaultSelectedIndex={1}/>
                    <DropSelect label="Sort by" items={[{title: 'size', onSelect: () => this.handleSortPropChange('size')}, {title: 'price', onSelect: () => this.handleSortPropChange('price')}, {title: 'id', onSelect: () => this.handleSortPropChange('id')}]}/>
                  </div>
                </div>
                <div className="container">
                  {!this.state.isLoading && (
                    <div className="row">
                      {this.state.productChunks.map((chunk, idx) => {
                        return [(
                          <div key={0} className="row">
                            {chunk.map((obj, key) => (
                              <div key={key} className="col-md-4">
                                <ProductGrid date={obj.date} price={obj.price} face={obj.face} size={obj.size}/>
                              </div>
                            ))}
                          </div>
                        ), (
                          <div key={1} className="mb-4 box-shadow">
                              <aside>
                              <p>But first, a word from our sponsors:</p>
                              <img className="ad" style={{width: '320', height: '200'}} src={`http://localhost:3000/ads/?r=${this.state.adIndices[idx]}/`}/>
                            </aside>
                            </div>)];
                      })
                      }
                    </div>)}
                  {this.state.isFetching && (<p className="text-center">Loading...</p>)}
                  {this.state.pagination.isLastPage && (<p className="text-center">~ end of catalogue ~</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 700) {
      const checkLastPage = this.isLastPage(this.state.pagination.currentPage, this.state.pagination.pageSize, this.state.pagination.totalCount);
      this.setState({pagination: {...this.state.pagination, isLastPage: checkLastPage}});

      if ((!this.state.isLoading && !this.state.isFetching) && !checkLastPage) {
        this.fetchProducts(true);
      }
    }
  }
  fetchProducts(isMore) {
    if (!isMore) {
      this.setState({isLoading: true});
    }
    this.setState({isFetching: true}); // The difference between isFetching and isLoading is that: while isLoading there is no data to display, but while isFetching we already have some local data but we are fetching more
  
    const fecthFromEnpoint = () => {
      const productsEndpoint = `http://localhost:3000/api/products?_page=${this.state.pagination.currentPage}&_limit=${this.state.pagination.pageSize}&_sort=${this.state.sortParms.sortProp}&_order=${this.state.sortParms.sortDirection}`;
      return fetch(productsEndpoint);
    };
    fecthFromEnpoint().then(res => {
      const totalProducts = parseInt(res.headers.get('X-Total-Count'), 10);
  
      res.json().then(data => {
        const prods = isMore ? this.state.products.concat(Array.from(data)) : Array.from(data); // if we are loading more, then join with already existing products

        this.setState({pagination: {...this.state.pagination, currentCount: prods.length, isLoading: false, totalCount: totalProducts, currentPage: this.state.pagination.currentPage + 1}, isLoading: false, isFetching: false, productChunks: this.chunkArray(prods, 20), products: prods}); // Always remeber to set state in a non immutable way
        const set = new Set(); // this uses a set to only make sure that unique values are passed into the array
        while (set.size < this.state.productChunks.length) {
          set.add(Math.floor(Math.random() * 1000));
        }
        const checkLastPage = this.isLastPage(this.state.pagination.currentPage, this.state.pagination.pageSize, this.state.pagination.totalCount);
        this.setState({adIndices: [...set], pagination: {...this.state.pagination, isLastPage: checkLastPage}});
      });
    });
  }
  isLastPage(currentPage, pageSize, totalCount) {
    const numberOfPages = totalCount / pageSize;
    return currentPage >= numberOfPages;
  }
  handleSortDirectionChange(direction) {
    this.setState({sortParms: {...this.state.sortParms, sortDirection: direction}});
  }
  handleSortPropChange(prop) {
    this.setState({sortParms: {...this.state.sortParms, sortProp: prop}});
  }
  handlePageSizeChange(newPageSize) {
    this.setState({pagination: {...this.state.pagination, currentPage: 1, pageSize: parseInt(newPageSize, 10)}}); // once the page size changes also reset the current page to one
  }

  chunkArray(array, chunkSize) {
    const results = [];
    const localArray = Object.assign([], array); // It is advisable to leave the original array intact to avoid side effects
    while (localArray.length) {
      results.push(localArray.splice(0, chunkSize));
    }
    return results;
  }
  myObjectEqual(first, second) {
    // This is a naive implementation of object equality
    const firstProps = Object.getOwnPropertyNames(first);
    const secondProps = Object.getOwnPropertyNames(second);

    if (firstProps.length != secondProps.length) {
      return false;
    }
    for (let i = 0; i < firstProps.length; i++) {
      const propName = firstProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (first[propName] !== second[propName]) {
        return false;
      }
    }
    return true;
  }
}

export default App;
