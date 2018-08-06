import React, {Component} from 'react';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';

import './theme.css';
import './index.scss';

//登录后的通用容器组件
class Layout extends Component {
  render() {
    return (
      <div id="wrapper">
        <NavTop/>
        <NavSide/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;