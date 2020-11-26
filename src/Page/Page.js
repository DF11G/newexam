import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Layout } from 'antd';
import "antd/dist/antd.css"
import UserInfoMenu from '../Component/Common/UserInfoMenu'
import Axios from 'axios'
import store from '../Store/Index'
import { handleGetUserInfAction } from '../Store/ActionCreators'
import './Page.css'

const { Header, Content, Footer } = Layout;

class Page extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            type: null
        }
        this.handleStoreChange = this.handleStoreChange.bind(this)
        store.subscribe(this.handleStoreChange)
    }

    handleStoreChange() {
        this.setState({
            name: store.getState().name,
            type: store.getState().type
        })
    }

    componentDidMount() {
        let needNotLoginpages = new Set(['/login', '/changePassword', '/register'])
        Axios.get('/exam/user/getUserDetail').then((res) => {
            if (res.data.code === 1) {
                const action = handleGetUserInfAction(res.data.object, res.data.code)
                store.dispatch(action)
            } else if (res.data.code === 6) {
                if (!needNotLoginpages.has(this.props.history.location.pathname)) {
                    this.props.history.push('/login')
                }
            } else {
                alert('请求错误')
            }
        }).catch((e) => {
            alert(e)
        })
    }

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo">
                        </div>
                        <div className="page-menu">
                            <UserInfoMenu name={this.state.name} type={this.state.type} history={this.props.history}></UserInfoMenu>
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>

            </div>
        )
    }
}

export default withRouter(Page)