import React, { Component } from 'react'
import { Redirect, withRouter } from "react-router-dom";
import { Table, Switch, Space, PageHeader, message, Modal } from 'antd';
import Axios from 'axios'

import '../Common.css'

const CREATING = 1;
const READY_TO_ANSWERING = 2;
const ANSWERING = 3;
const END_ANSWER = 4;

class PapersList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      deletePaper: null,
    }
  }

  componentDidMount() {
    this.getPapersListRequest()
  }

  getPapersListRequest() {
    Axios.get('/exam/paper/get').then((res) => {
      if (res.data.code === 1) {
        this.setState({
          data: res.data.object
        })
        this.setState({
          deletePaper: null,
        });
      } else if (res.data.code === 6) {
        alert('重新登录')
      } else {
        alert('请求错误')
      }
    }).catch(() => {
      alert('服务器错误')
    })
  }

  deletePaperRequest() {
    Axios.delete('/exam/paper/delete?paperId=' + this.state.deletePaper.id)
      .then((res) => {
        if (res.data.code === 1) {
          message.success('删除成功！')
          this.getPapersListRequest()
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
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '试卷状态',
      key: 'state',
      dataIndex: 'state',
      render: (state, record) => {
        let isChecked, checkedName, unCheckedName
        if (state === CREATING) {
          isChecked = false
          unCheckedName = "创建中"
          checkedName = "允许作答"
        } else if(state === READY_TO_ANSWERING) {
          isChecked = true
          unCheckedName = "创建中"
          checkedName = "允许作答"
        } else if(state === ANSWERING) {
          isChecked = true
          checkedName = "作答中"
          unCheckedName = "停止作答"
        } else {
          isChecked = false
          checkedName = "作答中"
          unCheckedName = "停止作答"
        }
        return (
          <Switch checkedChildren={checkedName} unCheckedChildren={unCheckedName}
            defaultChecked={isChecked}
            onChange={(checked, event) => {
              let newState
              if (state === CREATING || state === READY_TO_ANSWERING) {
                if(!checked) {
                  newState = CREATING
                } else {
                  newState = READY_TO_ANSWERING
                }
              } else {
                if(!checked) {
                  newState = END_ANSWER
                } else {
                  newState = ANSWERING
                }
              }
              Axios.post('/exam/paper/changePaperState', {
                paperId: record.id,
                state: newState
              })
                .then((res) => {
                  if (res.data.code === 1) {
                    message.success('变更成功！')
                  } else if (res.data.code === 6) {
                    alert('重新登录')
                  } else {
                    alert('请求错误')
                  }
                }).catch(() => {
                  alert('服务器错误')
                  this.getPapersListRequest()
                })
            }}
          />
        );
      },
    },
    {
      title: '动作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {
            this.props.history.push({
              pathname: '/editProblem',
              paperId: record.id
            })
          }}>编辑试题</a>
          <a onClick={() => {
            this.setState({
              deletePaper: record
            })
          }}>删除</a>
          <a
            href={'/exam/export/exportPaper?paperId=' + record.id}
            download={record.title}
          >导出</a>
        </Space>
      ),
    },
  ];

  handleOk = e => {
    this.deletePaperRequest()
  };

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title="管理试卷"
        />
        <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
        <Modal
          title={'删除试卷'}
          visible={this.state.deletePaper != null}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              deletePaper: null,
            })
          }}
          okText="确认删除"
          cancelText="取消"
        >
          <p>您确定要删除此试卷？删除后将不可恢复！</p>
        </Modal>
      </div>
    )
  }
}

export default withRouter(PapersList)