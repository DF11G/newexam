import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Row } from 'antd';
import "antd/dist/antd.css"
import '../Common.css'

class ProblemShow extends Component {

    constructor(props) {
        super(props)
    }

    problemShow = (props) => {
        if(props.problem == null) return null
        let problem = props.problem
        return (
            <div>
                <Row>
                    {'第'+problem.sort+'题'}
                </Row>
                <Row>
                    {problem.title}
                </Row>
                <Row>
                    {problem.material}
                </Row>
            </div>
        )
    }

    polymerizationProblemShow = (props) => {
        if(props.polymerizationProblem == null) return null
        let polymerizationProblem = props.polymerizationProblem
        return (
            <div>
                <Row>
                    {'第'+polymerizationProblem.sort+'题'}
                </Row>
                <Row>
                    {polymerizationProblem.title}
                </Row>
                <Row>
                    {polymerizationProblem.material}
                </Row>
            </div>
        )
    }


    render() {
        if(this.props.problem == null) {
            return null
        } else {
            return(
                <div>
                    <this.polymerizationProblemShow polymerizationProblem={this.props.problem.polymerizationProblem}/>
                    <this.problemShow problem={this.props.problem}/>
                </div>
            );
        }
    }

}

export default withRouter(ProblemShow)
