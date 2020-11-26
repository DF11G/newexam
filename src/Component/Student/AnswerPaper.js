import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import * as AJAX from '../../Util/Ajax'
import { PageHeader, Form, Input, Button, Descriptions } from 'antd';
import "antd/dist/antd.css"
import '../Common/Common.css'

class AnswerPaper extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.history.location.paper == null) {
            this.props.history.push('/searchPaper')
        }
    }

    createPaperAnswerRequest = (paperId, collectionAnswer) => {
        AJAX.PUT('/exam/answer/createPaperAnswer', {
            paperId: paperId,
            collectionAnswer: JSON.stringify(collectionAnswer)
        }, (res) => {
            this.props.history.push({
                pathname: '/answerProblem',
                paperAnswerId: res.data.object.id
            })
        })
    }

    showPaperInfo = (props) => {
        if (props.paper == null) {
            return null;
        } else {
            return (
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label="试卷标题">{props.paper.title}</Descriptions.Item>
                    <Descriptions.Item label="试卷信息">{props.paper.introduction}</Descriptions.Item>
                </Descriptions>
            )
        }
    }

    collectionForm = (props) => {
        if (props.paper == null) {
            return null
        } else {
            console.log(JSON.parse(props.paper.collection))
            let formItems = JSON.parse(props.paper.collection).map((item) => {
                return (
                    <Form.Item
                        name={item}
                        label={item}
                        rules={[
                            {
                                required: true,
                                message: '请填写!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                )
            })
            let onFinish = (value) => {
                this.createPaperAnswerRequest(props.paper.id, value)
            }
            return (
                <Form
                    name="collection_form"
                    onFinish={onFinish}
                >
                    {formItems}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            开始答题
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="作答试卷"
                />
                <Form
                    name="login_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <this.showPaperInfo
                        paper={this.props.history.location.paper}
                    />
                    <this.collectionForm
                        paper={this.props.history.location.paper}
                    />
                </Form>
            </div>
        );
    }
}


export default withRouter(AnswerPaper)
