import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Input, PageHeader, InputNumber, Form, Tag, Button, Modal } from 'antd';
import "antd/dist/antd.css"
import { PlusOutlined } from '@ant-design/icons';
import * as AJAX from '../../util/Ajax'
import '../common/Common.css'
const { TextArea } = Input;
class CreatePaper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collection: ['姓名'],
      inputVisible: false,
      inputValue: '',
      modalVisible: false,
      paperId: null
    }
  }

  onFinish = (values) => {
    AJAX.PUT('/exam/paper/createPaper', {
      "title": values.title,
      "introduction": values.introduction,
      "time": values.time,
      "collection": JSON.stringify(this.state.collection)
    }, (res) => {
      this.setState({
        paperId: res.data.object.id,
        modalVisible: true
      })
    }, this.props.history)
  }

  handleClose = removedTag => {
    const collection = this.state.collection.filter(tag => tag !== removedTag);
    console.log(collection);
    this.setState({ collection });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { collection } = this.state;
    if (inputValue && collection.indexOf(inputValue) === -1) {
      collection = [...collection, inputValue];
    }
    this.setState({
      collection,
      inputVisible: false,
      inputValue: '',
    })
  }

  saveInputRef = input => {
    this.input = input;
  }

  handleModalOk = e => {
    this.setState({
      modalVisible: false,
    })
    this.props.history.push({
      pathname: '/editPaper',
      paperId: this.state.paperId
    })
  }

  handleModalCancel = e => {
    this.setState({
      modalVisible: false,
    })
    this.props.history.push("/paperList")
  }

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  render() {
    const { collection, inputVisible, inputValue } = this.state;
    const tagChild = collection.map(this.forMap);
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title="创建试卷"
        />
        <Form
          className="login-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="title"
            label="试卷标题"
            rules={[{ required: true, message: '请输入试卷标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="试卷简介"
            rules={[{ required: true, message: '请输入试卷简介' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="time"
            label="最长答题时间"
            rules={[{ required: true, message: '请输入最长答题时间' }]}
          >
            <InputNumber />
          </Form.Item>
          <div>
            <div style={{ marginBottom: 16 }}>
              {tagChild}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={this.showInput} className="site-tag-plus">
                  <PlusOutlined /> 添加新的收集项
                </Tag>
              )}
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建试卷
                        </Button>
          </Form.Item>
        </Form>
        <Modal
          title="创建试卷"
          visible={this.state.modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        >
          <p>是否进入试题编辑界面？也可稍后在管理试卷页面中进行编辑</p>
        </Modal>
      </div>
    )
  }

}

export default withRouter(CreatePaper);
