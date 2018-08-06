import React from 'react';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';

//添加品类
class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      parentId: 0,
      categoryName: ''
    };
  }

  componentDidMount() {
    this.loadCategoryList();
  }

  // 加载品类列表,显示父品类列表
  loadCategoryList() {
    Product.getCategoryList().then(res => {
      this.setState({
        categoryList: res
      });
    }, errMsg => {
      MUtil.errorTips(errMsg);
    });
  }

  // 表单的值发生变化
  onValueChange = (e) => {
    const name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  // 提交
  onSubmit = (e) => {
    const categoryName = this.state.categoryName.trim();
    // 品类名称不为空，提交数据
    if (categoryName) {
      Product.saveCategory({
        parentId: this.state.parentId,
        categoryName: categoryName
      }).then((res) => {
        MUtil.successTips(res);
        //返回到品类列表
        this.props.history.push('/product-category/index');
      }, (errMsg) => {
        MUtil.errorTips(errMsg);
      });
    } else { // 否则，提示错误
      MUtil.errorTips('请输入品类名称');
    }
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表"/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                  <select name="parentId"
                          className="form-control"
                          onChange={this.onValueChange}>
                    <option value="0">根品类/</option>
                    {
                      this.state.categoryList.map((category, index) => {
                        return <option value={category.id} key={index}>根品类/{category.name}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input type="text" className="form-control"
                         placeholder="请输入品类名称"
                         name="categoryName"
                         value={this.state.name}
                         onChange={this.onValueChange}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button
                    type="submit" className="btn btn-primary"
                    onClick={this.onSubmit}>
                    提交
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAdd;