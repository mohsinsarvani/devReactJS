import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from './Home'
import Products from './Products'
import About from './About'

class App extends Component {
  constructor(props) {
    super(props)

    this.loadCategories = this.loadCategories.bind(this)
    this.createCategory = this.createCategory.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.readCategory = this.readCategory.bind(this)

    this.createProduct = this.createProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.removeProduct = this.removeProduct.bind(this)
    this.readProduct = this.readProduct.bind(this)

    this.state = {
      categories: [],
      category: {},
      products: [],
    }
  }
  loadCategories() {
    this.props.api.loadCategories()
      .then(res => {
          this.setState({
            categories: res.data
          })
      })
  }
  createCategory(category) {
    this.props.api.createCategory(category)
      .then((res) => this.loadCategories())
  }
  editCategory(category) {
    this.props.api.editCategory(category)
      .then((res) => this.loadCategories())
  }
  removeCategory(category) {
    this.props.api.deleteCategory(category.id)
      .then((res) => this.loadCategories())
  }
  createProduct(product) {
    return this.props.api.createProduct(product)
  }
  loadProducts(category) {
    this.props.api.loadProducts(category)
      .then((res) => {
        this.setState({
          products: res.data
        })
      })
  }
  readCategory(id) {
    this.props.api.readCategory(id)
      .then((res) => {
        this.setState({
          category: res.data
        })
      })
  }
  removeProduct(product) {
    return this.props.api.deleteProduct(product.id)
  }
  readProduct(id) {
    return this.props.api.readProduct(id)
  }
  editProduct(product) {
    return this.props.api.editProduct(product)
  }
  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <Link to='/' className='navbar-brand'>
                Products Management
              </Link>
              <ul className='nav navbar-nav'>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/products'>Products</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/about'>About</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className='container' style={{'paddingTop': 20}}>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route path='/products' render={(props) => {
              return (<Products 
                {...props}
                loadCategories={this.loadCategories}
                createCategory={this.createCategory}
                editCategory={this.editCategory}
                categories={this.state.categories}
                removeCategory={this.removeCategory}

                readProduct={this.readProduct}
                createProduct={this.createProduct}
                editProduct={this.editProduct}
                loadProducts={this.loadProducts}
                readCategory={this.readCategory}
                products={this.state.products}
                category={this.state.category}
                removeProduct={this.removeProduct}
                />)
            }} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
