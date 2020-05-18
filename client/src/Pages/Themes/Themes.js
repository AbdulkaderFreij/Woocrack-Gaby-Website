import React from 'react';
import ReactGA from 'react-ga';
import { checkAdBlocker } from '../../utils'
import FilterModel from '../../Components/FilterModal/FilterModal'
import Pagination from '../../Components/Pagination/Pagination';
import ItemCard from '../../Components/ItemCard/ItemCard';
import data from '../../data.json'
import './Themes.css';

let years = [];
const original_plugins = data.filter(item => {
  const {tags, categories, yearLastUpdate} = item;
  if (years.indexOf(yearLastUpdate) === -1) {
    years.push(yearLastUpdate);
  }
  if (tags === undefined) {
    return false
  }
  
  if (tags === 'Elementor' || tags === 'Codecanyon' || categories === 'WooCommerce Extensions' || categories === 'Wordpress Plugins') {
    return true;
  }
  
}).sort((item1, item2) => {
  if (item1.yearLastUpdate > item2.yearLastUpdate) {
    return -1;
  }
  if (item1.yearLastUpdate < item2.yearLastUpdate) {
    return 1;
  }
  return 0;
})
const original_themes = data.filter(item => {
  const {tags, categories, yearLastUpdate} = item;
  if (years.indexOf(yearLastUpdate) === -1) {
    years.push(yearLastUpdate);
  }
  if (tags === undefined) {
    return false
  }
  
  if (tags === 'Themeforest' || categories === 'WooCommerce Themes' || categories === 'Wordpress Themes') {
    return true;
  }
  
}).sort((item1, item2) => {
  if (item1.yearLastUpdate > item2.yearLastUpdate) {
    return -1;
  }
  if (item1.yearLastUpdate < item2.yearLastUpdate) {
    return 1;
  }
  return 0;
});

const stripHtml = html => {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

years.sort((item1, item2) => {
  if (item1 > item2) {
    return -1;
  }
  if (item1 < item2) {
    return 1;
  }
  return 0;
})

class Themes extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      plugins: original_plugins,
      themes: original_themes,
      active: 'themes',
      totalPages: null,
      currentPage: null,
      allItems: [],
      currentItems: [],
      resetPagination: false,
      filters: {
        years: years,
        search_query: '',
        selectedYear: -1,
        tags: [],
      },
      filterModel: false,
      adsBlocked: false,
    };
  }
  
  componentDidUpdate = () => ReactGA.pageview(window.location.pathname + window.location.search);
  
  componentDidMount() {
  
    ReactGA.pageview(window.location.pathname + window.location.search)
    this.detectAddBlocker();
    this.detectAddBlockerInterval();
    if (this.state.active === 'themes') {
      this.setState({allItems: this.state.themes});
    } else if (this.state.active === 'plugins') {
      this.setState({allItems: this.state.plugins});
    }
  }
  
  detectAddBlocker = async () => {
    const addsBlocked = await checkAdBlocker();
    this.setState({
      adsBlocked: addsBlocked,
    });
  }
  
  detectAddBlockerInterval = async () => {
    setInterval(() => {
      this.detectAddBlocker();
    }, 8000)
  }
  
  onPageChanged = data => {
    const {allItems} = this.state;
    const {currentPage, totalPages, pageLimit} = data;
    
    const offset = (currentPage - 1) * pageLimit;
    const currentItems = allItems.slice(offset, offset + pageLimit);
    
    this.setState({currentPage, currentItems, totalPages, resetPagination: false});
  }
  
  handleReset = () => {
    this.setState({
      resetPagination: false,
    })
  }
  
  showFilterModel = () => {
    this.setState({
      filterModel: true,
    })
  }
  
  hideFilterModel = () => {
    this.setState({
      filterModel: false,
    })
  }
  
  handleYearFilter = (year) => {
    
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        selectedYear: year,
      },
    }, this.handleFilter)
  }
  
  handleSearchQueryChange = search_query => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        search_query: search_query,
      },
    })
  }
  
  handleSearchSubmit = () => {
    this.handleFilter();
  }
  
  handleFilter = () => {
    const items = this.state[this.state.active];
    
    const filtered_items = items.filter(({yearLastUpdate, description}) => {
      if (yearLastUpdate === parseInt(this.state.filters.selectedYear) || parseInt(this.state.filters.selectedYear) === -1) {
        const search_content = stripHtml(description);
        return search_content.search(this.state.filters.search_query) !== -1;
        
      }
    });
    
    this.setState({
      ...this.state,
      totalPages: null,
      currentPage: null,
      allItems: filtered_items,
      currentItems: [],
      resetPagination: filtered_items.length > 0,
    })
  }
  
  render() {
    const {allItems, currentItems, currentPage, totalPages, active, resetPagination, filterModel, filters} = this.state;
    const totalItems = allItems.length;
    
    if (totalItems === 0) return null;
    
    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    
    return (
        <div className="container mb-5">
          {
            filterModel ? <FilterModel handleYearFilter={this.handleYearFilter} {...this.state.filters}
                                       handleSearchSubmit={this.handleSearchSubmit}
                                       handleSearchQueryChange={this.handleSearchQueryChange}
                                       search_query={this.state.search_query}
                                       hideFilterModel={this.hideFilterModel}/> : null
          }
          <div className="row d-flex flex-row py-5">
            <button className="switch-button" onClick={this.showFilterModel}>Filter</button>          
          </div>
          <div className="row d-flex flex-row py-5">
            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <h2 className={headerClass}>
                  <strong className="text-secondary">{totalItems}</strong> Items
                </h2>
                {currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span
                        className="font-weight-bold">{totalPages}</span>
                </span>
                )}
              </div>
              <div className="d-flex flex-row py-4 align-items-center">
                {
                  allItems.length > 0 ? <Pagination totalRecords={totalItems} pageLimit={18} pageNeighbours={4}
                                                    resetPagination={resetPagination}
                                                    handleReset={this.handleReset}
                                                    onPageChanged={this.onPageChanged}/> : null
                }
              </div>
            </div>
            
            {
              this.state.adsBlocked ? (<div className="ads-blocked">
                <h2>This website rely on Ads please disable your addblocker</h2>
              </div>) : (
                  allItems.length > 0 ? <div className="all-items">
                    
                    {currentItems.map(item => <ItemCard key={item.productId} item={item}/>)}
                  </div> : <div>No result</div>
              )
            }
          </div>
        </div>
    );
  }
  
}

export default Themes;
