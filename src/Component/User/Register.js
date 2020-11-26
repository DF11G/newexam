import React, { Component } from 'react'
import "antd/dist/antd.css"
import Axios from 'axios'
import { withRouter } from "react-router-dom"
import { Form, Input, Tooltip, Button, Select, PageHeader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import "./Register.css"
import '.././Common/Common.css'
import store from '../../Store/Index'
import { handleGetUserInfAction } from '../../Store/ActionCreators'
const { Option } = Select

class Register extends Component {

  constructor(props) {
    super(props)
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    Axios.put('/exam/user/register', {
      account: values.account,
      password: values.password,
      name: values.name,
      type: values.type
    }).then((res) => {
      if (res.data.code === 1) {
        const action = handleGetUserInfAction(res.data.object, res.data.code)
        store.dispatch(action)
        this.props.history.push('/main')
        alert('注册成功')
      } else if (res.code === 4) {
        alert('账号重复')
      } else {
        alert('请求错误')
      }
    }).catch(() => {
      alert('服务器错误')
    })
  };

  render() {
    return (
      <div className="register">

        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title="注册"
        />

        <Form
          name="register"
          onFinish={this.onFinish}
          scrollToFirstError
          className="register-form"
        >

          <Form.Item
            name="account"
            label="账号"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="再次输入密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认您的密码!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次输入的密码不匹配!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label={
              <span>
                真实姓名&nbsp;
                <Tooltip title="真实姓名用于老师辨认">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[{ required: true, message: '请输入您的真实姓名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label={
              <span>
                账号类型&nbsp;
                <Tooltip title="学生只能答题/老师只能出题">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[{ required: true, message: '请选择账号类型!' }]}
          >
            <Select placeholder="请选择您的账号类型">
              <Option value="2">学生</Option>
              <Option value="1">教师</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">注册</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }

}

export default withRouter(Register)
