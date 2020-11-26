import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import * as AJAX from '../../Util/Ajax'
import { PageHeader, Statistic, Row, Input, Radio, Form, Button, message } from 'antd';
import "antd/dist/antd.css"
import '../Common/Common.css'

import ProblemShow from './ProblemShow'
const { TextArea } = Input;

class AnswerProblem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalTime: 0,
            editTime: 0,
            isEdit: false,
            isEditTime: 0,
            remainTime: 100,
            paperAnswer: null,
            answeringProblem: null
        }
    }

    componentDidMount() {
        if (this.props.history.location.paperAnswerId == null) {
            this.props.history.push('/searchPaper')
        } else {
            //根据路由中的答卷id获取答卷
            this.getPaperAnswerRequest(this.props.history.location.paperAnswerId)
            //设置定时器
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    componentWillUnmount() {
        //取消定时器
        clearInterval(this.timerID);
    }

    getPaperAnswerRequest = (paperAnswerId) => {
        AJAX.GET('/exam/answer/getPaperAnswerDetail?paperAnswerId=' + paperAnswerId, (res) => {
            this.setState({
                paperAnswer: res.data.object,
                remainTime: res.data.object.paper.time * 60 - res.data.object.totalTime
            })
            //根据答卷获取当前作答的题目
            this.getProblemRequest(res.data.object)
        })
    }

    getProblemRequest = (paperAnswer) => {
        AJAX.GET('/exam/answer/getNextProblem?paperAnswerId=' + paperAnswer.id, (res) => {
            if (res.data.object != null) {
                this.setState({
                    answeringProblem: res.data.object,
                    totalTime: 0,
                    editTime: 0,
                    isEdit: false
                })
            } else {
                message.warning('This is a warning message')
            }
        })
    }

    submitAnswerRequest = (answer) => {
        AJAX.PUT('/exam/answer/submitAnswer', {
            paperAnswerId: this.props.history.location.paperAnswerId,
            totalTime: this.state.totalTime,
            editTime: this.state.editTime,
            answer: answer
        }, (res) => {
            this.getProblemRequest(this.state.paperAnswer)
        })
    }

    tick() {
        this.setState({
            totalTime: this.state.totalTime + 1,
            remainTime: this.state.remainTime - 1
        });
        if (this.state.isEdit) {
            if (this.state.isEditTime >= 4) {
                this.setState({
                    isEdit: false,
                })
            }
            this.setState({
                editTime: this.state.editTime + 1,
                isEditTime: this.state.isEditTime + 1
            })
        }
    }

    problemAnswerForm = (props) => {
        if (props.problem == null) return null
        let content
        if (props.problem.type === 1) {
            let radios =
                JSON.parse(props.problem.answer).map((answer) => <Radio value={answer}>{answer}</Radio>)
            content = (
                <div>
                    <Radio.Group>
                        {radios}
                    </Radio.Group>
                </div>
            )
        } else {
            content = (
                <div>
                    <TextArea rows={4}
                        onChange={(value) => {
                            this.setState({
                                isEdit: true,
                                isEditTime: 0
                            })
                        }}
                    ></TextArea>
                </div>
            )
        }
        return (
            <Form
                onFinish={(values) => {
                    this.submitAnswerRequest(values.answer)
                }}
            >
                <Form.Item
                    name="answer"
                    rules={[
                        {
                            required: true,
                            message: '请作答!',
                        },
                    ]}
                >
                    {content}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交答案</Button>
                </Form.Item>
            </Form>
        )
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="试卷答题"
                    subTitle="测试试卷"
                >
                    <Row>
                        <Statistic title="剩余时间" value={this.state.remainTime + '秒'} />
                        <Statistic
                            title="此题用时"
                            value={this.state.totalTime + '秒'}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="作答用时" value={this.state.editTime + '秒'} />
                    </Row>
                </PageHeader>
                <Form
                    name="login_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <ProblemShow problem={this.state.answeringProblem} />
                    <this.problemAnswerForm problem={this.state.answeringProblem} />
                </Form>
            </div>
        );
    }
}

export default withRouter(AnswerProblem)
