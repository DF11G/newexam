import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Table, PageHeader, Tag } from 'antd';
import Axios from 'axios'

import '../Common/Common.css'

class PaperAnswerList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    this.getPaperAnswersRequest()
  }

  getPaperAnswersRequest() {
    Axios.get('/exam/answer/getPaperAnswers').then((res) => {
      if (res.data.code === 1) {
        this.setState({
          data: res.data.object
        })
        console.log(res.data.object)
      } else if (res.data.code === 6) {
        alert('重新登录')
      } else {
        alert('请求错误')
      }
    }).catch(() => {
      alert('服务器错误')
    })
  }

  columns = [
    {
      title: '试卷标题',
      dataIndex: ['paper', 'title'],
    },
    {
      title: '答卷状态',
      dataIndex: 'state',
      render: (text, record) => {
        let color, content;
        if (record.state === 2) {
          color = 'green'
          content = '作答完成'
        } else {
          color = 'red'
          content = '作答中'
        }
        return (
          <Tag color={color}>
            {content}
          </Tag>
        )
      },
    },
    {
      title: '动作',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => {
              this.props.history.push({
                pathname: '/answerProblem',
                paperAnswerId: record.id
              })
            }}>继续答题</a>
          </div>
        )
      }
    },
  ];

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title="作答历史"
        />
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          pagination={false}
        />
      </div>
    )
  }
}

export default withRouter(PaperAnswerList)