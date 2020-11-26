import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Collapse, PageHeader, Button, Checkbox } from 'antd';
import "antd/dist/antd.css"
import * as AJAX from '../../Util/Ajax'
import '../Common/Common.css'
import CreateProblem from './CreateProblem'
import { DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

class EditProblem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            paper: null,
            polymerizationProblemId: null
        }
    }

    componentDidMount() {
        if (this.props.history.location.paperId != null) {
            this.getProblemsRequest()
        } else {
            this.props.history.push('/papersList')
        }
    }

    getProblemsRequest = () => {
        AJAX.GET('/exam/paper/getByPaperId?paperId=' + this.props.history.location.paperId, (res) => {
            console.log(res.data.object)
            this.setState({
                paper: res.data.object
            })
        })

        // Axios.get('/exam/paper/getByPaperId?paperId=' + this.props.history.location.paperId).then((res) => {
        //     if (res.data.code === 1) {
        //         console.log(res.data.object)
        //         this.setState({
        //             paper: res.data.object
        //         })
        //     } else if (res.data.code === 5) {
        //         alert('没有')
        //     } else {
        //         alert('请求错误')
        //     }
        // }).catch(() => {
        //     alert('服务器错误')
        // })
    }

    deleteProblemRequest = (paperId, problem) => {
        let url
        if (problem.type != null) {
            url = '/exam/paper/deleteProblem?paperId=' + paperId + '&problemId=' + problem.id
        } else {
            url = '/exam/paper/deletePolymerizationProblem?paperId=' + paperId + '&polymerizationProblemId=' + problem.id
        }

        AJAX.DELETE(url, (res) => {
            this.setState({
                paper: res.data.object
            })
        })

        // Axios.delete(url).then((res) => {
        //     if (res.data.code === 1) {
        //         this.setState({
        //             paper: res.data.object
        //         })
        //     } else if (res.data.code === 5) {
        //         alert('没有')
        //     } else {
        //         alert('请求错误')
        //     }
        // }).catch(() => {
        //     alert('服务器错误')
        // })
    }

    deleteButton = (problem) => (
        <DeleteOutlined onClick={(e) => {
            this.deleteProblemRequest(this.props.history.location.paperId, problem)
            e.stopPropagation()
        }} />
    );

    callback(key) {
        console.log(key);
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    polymerizationProblemList = (polymerizationProblem) => {
        let problems = polymerizationProblem.problems
        let other = (problem) => {
            if (problem.type === 1) {
                let choices = JSON.parse(problem.answer)
                return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
            } else {
                return null;
            }
        }
        let problemList = problems.map((problem) =>
            <Panel header={'第' + problem.sort + '题'} key={problem.sort} extra={this.deleteButton(problem)}>
                <h1>{problem.title}</h1>
                <p>{problem.material}</p>
                {other(problem)}
            </Panel>
        )
        return (
            <div>
                <Collapse>
                    {problemList}
                </Collapse>
                <Button className="content-button" type="primary" onClick={() => {
                    this.setState({
                        visible: true,
                        polymerizationProblemId: polymerizationProblem.id
                    })
                }}>创建新试题</Button>
            </div>
        )
    }



    problemList = () => {
        if (this.state.paper != null) {
            let problems = this.state.paper.problems
            problems = problems.concat(this.state.paper.polymerizationProblems)
            let other = (problem) => {
                if (problem.type === 1) {
                    let choices = JSON.parse(problem.answer)
                    return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
                } else if (problem.type == null) {
                    return this.polymerizationProblemList(problem);
                }
            }
            let listItem = problems.map((problem) =>
                <Panel header={'第' + problem.sort + '题'} key={problem.sort} extra={this.deleteButton(problem)}>
                    <h1>{problem.title}</h1>
                    <p>{problem.material}</p>
                    {other(problem)}
                </Panel>
            )
            return (
                <Collapse>
                    {listItem}
                </Collapse>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="createPaper">
                <PageHeader
                    className="site-page-header"
                    title="编辑试题"
                    onBack={() => this.props.history.goBack()}
                />
                <this.problemList></this.problemList>
                <Button className="content-button" type="primary" onClick={() => {
                    this.setState({
                        visible: true,
                        polymerizationProblemId: null
                    })
                }}>创建新试题</Button>
                <CreateProblem
                    visible={this.state.visible}
                    paperId={this.props.history.location.paperId}
                    polymerizationProblemId={this.state.polymerizationProblemId}
                    visibleChange={() => {
                        this.setState({
                            visible: !this.state.visible
                        })
                    }}
                    refreshProblems={this.getProblemsRequest}
                />
            </div>
        )
    }

}

export default withRouter(EditProblem)
