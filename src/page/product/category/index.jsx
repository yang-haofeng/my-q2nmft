import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      //取到父品类id
      parentCategoryId: this.props.match.params.categoryId || 0
    };
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState) {
    const oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.categoryId || 0;
    //当界面路由发生改变时，重新加载对应的子品类
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, this.loadCategoryList);
    }
  }

  // 加载品类列表
  loadCategoryList = () => {
    Product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      });
    }, errMsg => {
      this.setState({
        list: []
      });
      MUtil.errorTips(errMsg);
    });
  }

  // 更新品类的名字
  onUpdateName = (categoryId, categoryName) => {
    const newName = window.prompt('请输入新的品类名称', categoryName);
    if (newName) {
      Product.updateCategoryName({
        categoryId: categoryId,
        categoryName: newName
      }).then(res => {
        MUtil.successTips(res);
        //刷新品类列表
        this.loadCategoryList();
      }, errMsg => {
        MUtil.errorTips(errMsg);
      });
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fa fa-plus"/>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={['品类ID', '品类名称', '操作']}>
          {this.renderListBody()}
        </TableList>
      </div>
    );
  }

  renderListBody = () => {
    return this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a className="opear"
               onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称 </a>
            {
              //父品类是0，可以查看子品类
              category.parentId === 0
                //这里还是匹配到了当前界面，界面不会重新加载，只会调用componentDidUpdate方法
                ? <Link to={`/product-category/index/${category.id}`}>
                  查看子品类</Link>
                : null
            }
          </td>
        </tr>
      );
    });
  }
}

export default CategoryList;