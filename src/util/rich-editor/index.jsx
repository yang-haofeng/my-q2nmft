import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

// 通用的富文本编辑器
class RichEditor extends React.Component {

  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      // 编辑商品时，收到商品信息后，设置编辑器内容
      this.simditor.setValue(nextProps.defaultDetail);
    }
  }

  //加载jquery组件
  loadEditor() {
    //拿到textarea的dom
    const element = this.refs['textarea'];
    //初始化编辑器
    this.simditor = new Simditor({
      textarea: $(element),  //传一个jquery对象
      defaultValue: this.props.placeholder || '请输入内容',
      upload: {  //图片上传
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    });
    this.bindEditorEvent();
  }

  //富文本编辑器的事件
  bindEditorEvent() {
    //监听jquery的事件，传给react组件
    this.simditor.on('valuechanged', e => {
      this.props.onValueChange(this.simditor.getValue());
    })
  }

  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"/>
      </div>
    );
  }
}

export default RichEditor;