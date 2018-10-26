import React, { Component } from 'react';
import { Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { Motor, Home, Driver, Violating } from '../Components'
import moment from 'moment'; 

const route = [
    { path: '/', component: Home, exact: true },
    { path: '/motor', component: Motor, exact: true },
    { path: '/driver', component: Driver, exact: true },
    { path: '/violating', component: Violating, exact: true }
]

const Main = () => (
    <Switch>
        {route.map((v, i) => {
            return (<Route exact={v.exact} key={i} path={v.path} component={v.component} />)
        })}
    </Switch>
)

import 'antd/dist/antd.css'

import '../style/style.css';
import '../Components/style/style.css';
class App extends Component {
    constructor(props) {
        super(props);
    }
    changeTime=()=>{
        const Time = new Date()
        const day = moment(Time).format("d")
        const _day =day.replace(/[0]/g,"天")
        return <div className="time">{moment(Time).format("YYYY年MM月DD号")} 星期{_day}</div>
    }
    onClick(){
        window.location.href = "/"
    }
    render() {
        
        return (
            <div className="app">
                <div className="header">
                    <h1>
                    交管智慧处理终端
                    {this.changeTime()}
                    <div className="backHome" onClick={this.onClick.bind(this)}>返回主页</div>
                    </h1>
                    {/* <div id="start"><img src={require("../style/images/MS WINDOWS 7.A.png")} width="64" /></div> */}
                   
                </div>
                <BrowserRouter>
                    <Main />
                </BrowserRouter >
                <div className="footer">
                 <h3>版权所属：重庆赛丰基业科技公司</h3>
                </div>
            </div>
        )
    }
}

export default App;