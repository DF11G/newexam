import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom"
import Axios from 'axios'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import "antd/dist/antd.css"
import store from '../Store/Index'
import { handleUserLogout } from '../Store/ActionCreators'


function LoginMenu(props) {
  let logout = () => {
    Axios.get('/exam/user/logout').then((res) => {
      if (res.data.code === 1) {
        const action = handleUserLogout()
        store.dispatch(action)
        props.history.push('/login')
      } else {
        alert('请求错误')
      }
    }).catch((e) => {
      alert(e)
    })
  };
  let teacherMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/createPaper">
          创建试卷
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/papersList">
          管理试卷
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/changePassword">
          修改密码
        </Link>
      </Menu.Item>
      <Menu.Item danger onClick={logout}>登出</Menu.Item>
    </Menu>
  );
  let studentMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/searchPaper">
          作答试卷
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/paperAnswerList">
          历史作答
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/changePassword">
          修改密码
        </Link>
      </Menu.Item>
      <Menu.Item danger onClick={logout}>登出</Menu.Item>
    </Menu>
  );
  let menu;
  if(props.type === 1) {
    menu = teacherMenu
  } else if(props.type === 2) {
    menu = studentMenu
  } else {
    menu = null
  }
  return (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {props.name} <DownOutlined />
      </a>
    </Dropdown>
  );
}

function NotLoginMenu() {
  return (
    <Link className="ant-dropdown-link" to="/login">
      点击此处登录 <DownOutlined />
    </Link>
  );
}

class UserInfoMenu extends Component {
  
  constructor(props) {
    super(props)
  }

  UserMenu() {
    if (this.props.name != null) {
      return <LoginMenu name={this.props.name} type={this.props.type} history={this.props.history} />;
    } else {
      return <NotLoginMenu />;
    }
  }

  render() {
    return (
      <div className="login">
        {this.UserMenu()}
      </div>
    )
  }
}

export default withRouter(UserInfoMenu)
