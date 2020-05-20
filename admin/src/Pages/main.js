// main.js用来配置主路由
import React  from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Login from './login/login';
import AdminIndex from './adminIndex';
import PrivateRoute from './privateRoute';

function Main(){
    return(
        <Router>
            <Switch>
                <Route path="/login/" component = {Login} />
                <Route path='/' exact component = {Login}/>
                <PrivateRoute path='/*' component={AdminIndex}/>
            </Switch>
        </Router>
    )
}
export default Main;