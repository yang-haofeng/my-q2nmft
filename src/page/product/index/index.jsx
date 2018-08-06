import React, {Component} from "react";
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';

import './index.scss';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      total: 0,
      listType: 'list'
    };
  }

  componentDidMount() {
    this.loadProductList();
  }

  // 加载商品列表
  loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if (this.state.listType === 'search') {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    // 请求接口
    Product.getProductList(listParam).then(res => {
      this.setState(res);
    }, errMsg => {
      this.setState({
        list: []
      });
      MUtil.errorTips(errMsg);
    });
  }

  // 搜索
  onSearch = (searchType, searchKeyword) => {
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: searchType,
      searchKeyword: searchKeyword
    }, () => {
      this.loadProductList();
    });
  }

  // 页数发生变化的时候
  onPageNumChange = (pageNum) => {
    //setState完之后，请求当前页数据
    this.setState({
      pageNum: pageNum
    }, this.loadProductList);
  }

  // 改变商品状态，上架 / 下架
  onSetProductStatus = (e, productId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1,
      msg = currentStatus === 1
        ? '确定要下架该商品？' : '确定要上架该商品？';
    if (window.confirm(msg)) {
      //更新商品状态
      Product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        MUtil.successTips(res);
        //操作成功后刷新列表
        this.loadProductList();
      }, errMsg => {
        MUtil.errorTips(errMsg);
      });
    }
  }

  render() {
    const tableHeads = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'},
    ];
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"/>
              <span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={this.onSearch}/>
        <TableList tableHeads={tableHeads}>
          {this.createListBody()}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.total}
          onChange={this.onPageNumChange}/>
      </div>
    );
  }

  createListBody = () => {
    return this.state.list.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>
            <p>{product.name}</p>
            <p>{product.subtitle}</p>
          </td>
          <td>￥{product.price}</td>
          <td>
            <p>{product.status === 1 ? '在售' : '已下架'}</p>
            <button
              className="btn btn-xs btn-warning"
              onClick={(e) => {
                this.onSetProductStatus(e, product.id, product.status)
              }}>
              {product.status === 1 ? '下架' : '上架'}
            </button>
          </td>
          <td>
            <Link to={`/product/detail/${product.id}`}>查看详情</Link>
            <br/>
            <Link to={`/product/save/${product.id}`}>编辑</Link>
          </td>
        </tr>
      );
    })
  }
}