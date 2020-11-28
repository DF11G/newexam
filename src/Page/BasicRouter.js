import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './Page'

import Login from '../component/user/Login'
import Register from '../component/user/Register'
import ChangePassword from '../component/user/ChangePassword'
import CreatePaper from '../component/teacher/CreatePaper'
import PaperList from '../component/teacher/PaperList'
import EditPaper from '../component/teacher/EditPaper'
import SearchPaper from '../component/student/SearchPaper'
import CreatePaperAnswer from '../component/student/CreatePaperAnswer'
import AnswerProblem from '../component/student/AnswerProblem'
import PaperAnswerList from '../component/student/PaperAnswerList'

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