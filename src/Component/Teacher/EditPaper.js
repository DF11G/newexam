import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Collapse, PageHeader, Button, Checkbox } from 'antd';
import "antd/dist/antd.css"
import * as AJAX from '../../Util/Ajax'
import '../Common/Common.css'
import CreateProblem from './AddProblem'
import { DeleteOutlined } from '@ant-design/icons';
import {CHOICE_PROBLEM, MATERIAL_PROBLEM, FATHER_PROBLEM} from '../../Enum/ProblemTypeEnum'

const { Panel } = Collapse;

class EditPaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            paper: null,
            fatherProblemId: null
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
    }

    deleteProblemRequest = (paperId, problem) => {
        let url = '/exam/paper/deleteProblem?paperId=' + paperId + '&problemId=' + problem.id
        AJAX.DELETE(url, (res) => {
            this.getProblemsRequest()
        })
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
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    subProblemList = (fatherProblem) => {
        let subProblems = fatherProblem.subProblems
        let other = (problem) => {
            if (problem.type === 1) {
                let choices = JSON.parse(problem.answer)
                return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
            } else {
                return null;
            }
        }
        let problemList = subProblems.map((problem) =>
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
                        fatherProblemId: fatherProblem.id
                    })
                }}>创建新试题</Button>
            </div>
        )
    }



    problemList = () => {
        if (this.state.paper != null) {
            let problems = this.state.paper.problems
            console.log(problems)
            let other = (problem) => {
                if (problem.type === CHOICE_PROBLEM) {
                    let choices = JSON.parse(problem.answer)
                    return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
                } else if (problem.type == FATHER_PROBLEM) {
                    return this.subProblemList(problem);
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
                        fatherProblemId: null
                    })
                }}>创建新试题</Button>
                <CreateProblem
                    visible={this.state.visible}
                    paperId={this.props.history.location.paperId}
                    fatherProblemId={this.state.fatherProblemId}
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

export default withRouter(EditPaper)
