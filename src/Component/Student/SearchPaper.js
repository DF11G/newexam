import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Axios from 'axios'
import { Row, Col, Input, Button, PageHeader, Statistic, Form } from 'antd';
import "antd/dist/antd.css"
import '../Common.css'

const { Search } = Input;

class SearchPaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            paper: null,
            isUseful: 0
        }
    }

    searchPaperRequest = (code) => {
        Axios.get('/exam/paper/getByCode?code=' + code).then((res) => {
            if (res.data.code === 1) {
                this.setState({
                    paper: res.data.object
                })
                if (res.data.object.state === 2 || res.data.object.state === 3) {
                    this.setState({
                        isUseful: 1
                    })
                } else {
                    this.setState({
                        isUseful: 0
                    })
                }
            } else if (res.data.code === 5) {
                alert('没找到此试卷')
            } else if (res.data.code === 6) {
                alert('重新登录')
            } else {
                alert('请求错误')
            }
        }).catch(() => {
            alert('服务器错误')
        })
    }

    onSearch = (value) => {
        this.searchPaperRequest(value)
    }

    showPaper = (props) => {
        if (props.paper == null) {
            return null
        } else {
            let paper = props.paper
            let a = this
            return (
                <div>
                    <Row>
                        <Col span={6}>
                            <Statistic title="试卷标题" value={paper.title} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="作答时长" value={paper.time + '分钟'} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="创建人" value={paper.creator.name} />
                        </Col>
                        <Col span={6}>
                            <br></br>
                            {a.state.isUseful ?
                                <Button type="primary" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/answerPaper',
                                        paper: this.state.paper
                                    })
                                }}>开始作答</Button> : <Button type="primary" disabled onClick={() => {
                                    this.props.history.push({
                                        pathname: '/answerPaper',
                                        paper: this.state.paper
                                    })
                                }}>试卷已过期</Button>}
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    render() {
        return (
            <div>

                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="搜索试卷"
                />
                <Form
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Search
                        placeholder="输入试卷编号"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={this.onSearch}
                        onChange={() => {
                            this.setState({
                                paper: null
                            })
                        }}
                        maxLength='6'
                    />
                    <this.showPaper paper={this.state.paper} />
                </Form>
            </div>
        );
    }

}

export default withRouter(SearchPaper)
