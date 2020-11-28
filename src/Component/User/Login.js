import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, PageHeader, message } from 'antd';
import "antd/dist/antd.css"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from '../../store/Index'
import { handleGetUserInfAction } from '../../store/ActionCreators'
import '../common/Common.css'
import * as AJAX from '../../util/Ajax'

class Login extends Component {

  constructor(props) {
    super(props)
    this.success = this.success.bind(this)
  }

  success(res) {
    const action = handleGetUserInfAction(res.data.object, res.data.code)
    store.dispatch(action)
    console.log(res)
    console.log(this)
    if (res.data.object.type === 1) {
      this.props.history.push('/papersList')
    } else {
      this.props.history.push('/searchPaper')
    }
  }

  onFinish = (values) => {
    AJAX.POST('/exam/user/loginCheck', { //这里是URL和数据
      "account": values.account,
      "password": values.password
    }, (res) => {//这里是需要执行的方法
      const action = handleGetUserInfAction(res.data.object, res.data.code)
      store.dispatch(action)
      message.success('登陆成功')
      if (res.data.object.type === 1) {
        this.props.history.push('/paperList')
      } else {
        this.props.history.push('/searchPaper')
      }
    }, this.props.history)
  }

  render() {
    return (
      <div className="login">
        <PageHeader
          className="site-page-header"
          backIcon="false"
          title="登录"
        />
        <Form
          name="login_form"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="account"
            rules={[
              {
                min: 8,
                max: 32,
                message: '账号长度在8-32位!'
              },
              {
                required: true,
                message: '请输入您的账号!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                min: 8,
                max: 32,
                message: '密码长度在8-32位!'
              },
              {
                required: true,
                message: '请输入您的密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="changePassword">
              修改密码
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <Link to="register">学生注册!</Link>
          </Form.Item>
        </Form>
      </div >
    )
  }
}

export default withRouter(Login)
