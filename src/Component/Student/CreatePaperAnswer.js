import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import * as AJAX from '../../Util/Ajax'
import { PageHeader, Form, Input, Button, Descriptions } from 'antd';
import "antd/dist/antd.css"
import '../Common/Common.css'

class CreatePaperAnswer extends Component {

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
            return (
                <Form
                    name="collection_form"
                    onFinish={(value) => {
                        this.createPaperAnswerRequest(props.paper.id, value)
                    }}
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
                    className="login-form"
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


export default withRouter(CreatePaperAnswer)
