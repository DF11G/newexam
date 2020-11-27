import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './Page'

import Login from '../Component/User/Login'
import Register from '../Component/User/Register'
import ChangePassword from '../Component/User/ChangePassword'

import CreatePaper from '../Component/Teacher/CreatePaper'
import PaperList from '../Component/Teacher/PaperList'
import EditPaper from '../Component/Teacher/EditPaper'

import SearchPaper from '../Component/Student/SearchPaper'
import CreatePaperAnswer from '../Component/Student/CreatePaperAnswer'
import AnswerProblem from '../Component/Student/AnswerProblem'
import PaperAnswerList from '../Component/Student/PaperAnswerList'

class BasicRouter extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Page>

                        <Route
                            path='/login' exact component={Login}
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
                            path='/paperList' component={PaperList}
                        ></Route>
                        <Route
                            path='/editPaper' component={EditPaper}
                        ></Route>

                        <Route
                            path='/searchPaper' component={SearchPaper}
                        ></Route>
                        <Route
                            path='/createPaperAnswer' component={CreatePaperAnswer}
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


export default BasicRouter;