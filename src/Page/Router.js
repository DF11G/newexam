import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './Page'

class BasicRoute extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Page>
                        {/* <Route
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
                        ></Route> */}
                    </Page>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default BasicRoute;