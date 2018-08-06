import React from 'react';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import './category-selector.scss'

// 品类选择器
class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  //回填数据
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
      parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候，直接不做处理
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    // 假如只有一级品类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      });
    } else { // 有两级品类
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        //一级品类变化，加载二级品类列表
        parentCategoryIdChange && this.loadSecondCategory();
      });
    }
  }

  // 加载一级分类
  loadFirstCategory() {
    Product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      });
    }, errMsg => {
      MUtil.errorTips(errMsg);
    });
  }

  // 加载二级分类
  loadSecondCategory = () => {
    Product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      });
    }, errMsg => {
      MUtil.errorTips(errMsg);
    });
  }

  // 选择一级品类
  onFirstCategoryChange = (e) => {
    if (this.props.readOnly) {
      return;
    }
    const newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级品类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    });
  }

  // 选择二级品类
  onSecondCategoryChange = (e) => {
    if (this.props.readOnly) {
      return;
    }
    const newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue
    }, this.onPropsCategoryChange);
  }

  // 传给父组件选中的结果
  onPropsCategoryChange = () => {
    const onCategoryChange = this.props.onCategoryChange;
    // 如果是有二级品类
    if (this.state.secondCategoryId) {
      onCategoryChange && onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else { // 如果只有一级品类
      onCategoryChange && onCategoryChange(this.state.firstCategoryId, 0);
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select className="form-control cate-select"
                value={this.state.firstCategoryId}
                onChange={this.onFirstCategoryChange}
                readOnly={this.props.readOnly}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map(
              (category, index) =>
                <option value={category.id} key={index}>{category.name}</option>
            )
          }
        </select>
        {/*判断二级分类是否显示*/}
        {this.state.secondCategoryList.length ?
          <select name="" className="form-control cate-select"
                  value={this.state.secondCategoryId}
                  onChange={this.onSecondCategoryChange}
                  readOnly={this.props.readOnly}>
            <option value="">请选择二级分类</option>
            {
              this.state.secondCategoryList.map(
                (category, index) => <option value={category.id} key={index}>{category.name}</option>
              )
            }
          </select>
          : null
        }
      </div>
    )
  }
}

export default CategorySelector;