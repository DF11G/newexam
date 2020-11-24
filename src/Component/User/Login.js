import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import Axios from 'axios'
import { Form, Input, Button, Checkbox, PageHeader } from 'antd';
import "antd/dist/antd.css"
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from '../Store/Index'
import { handleGetUserInfAction } from '../Store/ActionCreators'
import '../Common.css'
import { ajaxReturn } from '../../Ajax'
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
    var a = this
    Axios.post('/exam/user/loginCheck', {
      "account": values.account,
      "password": values.password
    }).then((res) => {
      ajaxReturn(res.data.code, () => {
        const action = handleGetUserInfAction(res.data.object, res.data.code)
        store.dispatch(action)
        console.log(res)
        console.log(this)
        if (res.data.object.type === 1) {
          this.props.history.push('/papersList')
        } else {
          this.props.history.push('/searchPaper')
        }
      })
      // if (res.data.code === 1) {
      //   const action = handleGetUserInfAction(res.data.object, res.data.code)
      //   store.dispatch(action)
      //   console.log(res)
      //   if (res.data.object.type === 1) {
      //     this.props.history.push('/papersList')
      //   } else {
      //     this.props.history.push('/searchPaper')
      //   }
      // } else if (res.data.code === 3) {
      //   alert('账户名密码错误')
      // } else {
      //   alert('请求错误')
      // }
    }).catch(() => {
      alert('服务器错误')
    })
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
            Or <Link to="register">立即注册!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(Login)
