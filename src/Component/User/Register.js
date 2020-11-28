import React, { Component } from 'react'
import "antd/dist/antd.css"
import { withRouter } from "react-router-dom"
import { Form, Input, Tooltip, Button, PageHeader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../common/Common.css'
import store from '../../store/Index'
import { handleGetUserInfAction } from '../../store/ActionCreators'
import * as AJAX from '../../util/Ajax'

class Register extends Component {

  constructor(props) {
    super(props)
  }

  onFinish = (values) => {
    AJAX.PUT('/exam/user/register', {
      account: values.account,
      password: values.password,
      name: values.name
    }, (res) => {
      const action = handleGetUserInfAction(res.data.object, res.data.code)
      store.dispatch(action)
      this.props.history.push('/login')
    }, this.props.history)
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
            rules={[
              {
                min: 8,
                max: 32,
                message: '账号长度在8-32位!'
              },
              {
                required: true,
                message: '请输入账号'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                min: 8,
                max: 32,
                message: '密码长度在8-32位!'
              },
              {
                required: true,
                message: '请输入密码'
              }
            ]}
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
                min: 8,
                max: 32,
                message: '密码长度在8-32位!'
              },
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

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">注册</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }

}

export default withRouter(Register)
