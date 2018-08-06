import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';

//page
import Home from 'page/home/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import OrderList from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path={'/'} render={this.renderLayoutRouter}/>
        </Switch>
      </Router>
    )
  }

  renderLayoutRouter = () => {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/product' component={ProductRouter}/>
          <Route path='/product-category' component={ProductRouter}/>
          <Route path="/order/index" component={OrderList}/>
          <Route path="/order/detail/:orderNumber" component={OrderDetail}/>
          <Route path='/user/index' component={UserList}/>
          <Redirect exact from="/order" to="/order/index"/>
          <Redirect exact path='/user' to='/user/index'/>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
