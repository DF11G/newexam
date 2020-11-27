import React, { Component } from 'react'
import { Redirect, withRouter } from "react-router-dom";
import { Table, Switch, Space, PageHeader, message, Modal } from 'antd';

import * as AJAX from '../../util/Ajax'
import '../common/Common.css'
import {CREATING, READY_TO_ANSWERING, ANSWERING, END_ANSWER} from '../../enum/PaperStateEnum'

class PaperList extends Component {

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
    AJAX.GET('/exam/paper/get', (res) => {
      this.setState({
        data: res.data.object
      })
      this.setState({
        deletePaper: null,
      })
    })
  }

  deletePaperRequest() {
    AJAX.DELETE('/exam/paper/delete?paperId=' + this.state.deletePaper.id, (res) => {
      message.success('删除成功！')
      this.getPapersListRequest()
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
        } else if (state === READY_TO_ANSWERING) {
          isChecked = true
          unCheckedName = "创建中"
          checkedName = "允许作答"
        } else if (state === ANSWERING) {
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
                if (!checked) {
                  newState = CREATING
                } else {
                  newState = READY_TO_ANSWERING
                }
              } else {
                if (!checked) {
                  newState = END_ANSWER
                } else {
                  newState = ANSWERING
                }
              }
              AJAX.POST('/exam/paper/changeState', {
                paperId: record.id,
                state: newState
              }, (res) => {
                message.success('变更成功！')
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
              pathname: '/editPaper',
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
          onOk={e=>{this.deletePaperRequest()}}
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

export default withRouter(PaperList)