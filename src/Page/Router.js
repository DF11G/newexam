import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './Page'
import Login from '../Component/User/Login'
import Register from '../Component/User/Register'
import ChangePassword from '../Component/User/ChangePassword'
import CreatePaper from '../Component/Teacher/CreatePaper'
import PapersList from '../Component/Teacher/PapersList'
import EditProblem from '../Component/Teacher/EditProblem'
import SearchPaper from '../Component/Student/SearchPaper'
import AnswerPaper from '../Component/Student/AnswerPaper'
import AnswerProblem from '../Component/Student/AnswerProblem'
import PaperAnswerList from '../Component/Student/PaperAnswerList'

class BasicRoute extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Page>
                        <Route
                            path='/login' component={Login}
                        ></Route>
                        <Route
                            path='/register' component={Register}
                        ></Route>
                        <Route
                            path='/changePassword' component={ChangePassword}
                        ></Route>
                        <Route
                            path='/createPaper' component={CreatePaper}
                        ></Route>
                        <Route
                            path='/papersList' component={PapersList}
                        ></Route>
                        <Route
                            path='/editProblem' component={EditProblem}
                        ></Route>
                        <Route
                            path='/searchPaper' component={SearchPaper}
                        ></Route>
                        <Route
                            path='/answerPaper' component={AnswerPaper}
                        ></Route>
                        <Route
                            path='/answerProblem' component={AnswerProblem}
                        ></Route>
                        <Route
                            path='/paperAnswerList' component={PaperAnswerList}
                        ></Route>
                    </Page>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default BasicRoute;