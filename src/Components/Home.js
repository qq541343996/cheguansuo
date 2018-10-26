import React, { Component } from 'react'
import { Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.interval = setInterval(() => location.reload(), 3600000);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render() {
        return (
            <div className="container">
                <div className="boxgridSet">
                    <div className="box slidedown">
                        <Link to="/motor" text="机动车业务" key={1}>
                            {/* <div className="boxgrid " style={{ top: "0px" }}>
                                <h3>机动车业务</h3>
                                <div className="content">
                                    <p>Motor vehicle business</p>
                                    <img src={require("../style/images/map.jpg")} width="300px" height="200px" />
                                </div>

                            </div> */}
                            <img src={require("../style/images/机动车业务.png")} width="200px" height="200px" />
                        </Link>
                    </div>
                    <div className="box slideleft">
                        <Link to="/driver" text="驾驶证业务" key={2}>
                            {/* <div className="boxgrid" style={{
                                background: "rgb(176, 235, 23)",
                                left: "0px"
                            }}>
                                <h3>驾驶证业务</h3>
                                <div className="content" style={{
                                    background: "#B0EB17"
                                }}>
                                    <p>Driver's license business<br /></p>
                                    <img src={require("../style/images/SETTINGS.png")} style={{
                                        margin: "30px"
                                    }} />
                                    <img src={require("../style/images/pointer.png")} style={{
                                        margin: "50px 200px"
                                    }} />
                                </div>
                            </div> */}
                            <img src={require("../style/images/驾驶证业务.png")} width="200px" height="200px" />
                        </Link>
                    </div>
                    {/* <div className="box right">
                        <h1>欢迎使用</h1>
                        <img id="target" src={require("../style/images/FILE - MOVIE.png")} />
                        <img id="coffee" src={require("../style/images/INTERNET EXPLORER - ALT.png")} />
                    </div> */}
                    <div className="box slideright">
                        <Link to="/violating" text="违章处理业务" key={3}>
                            {/* <div className="boxgrid" style={{ background: "rgb(57, 171, 62)", left: "0px" }}>
                                <h3>违章处理业务</h3>
                                <div className="content" style={{ background: "#39AB3E" }}>
                                    <p>Violating the business<br />
                                        <a href="#" target="_BLANK">More Info</a>
                                    </p>
                                    <img id="target" style={{ margin: "0 50px" }} src={require("../style/images/TOOLS.png")} />
                                    <img id="me" src={require("../style/images/me.gif")} />
                            <img src={require("../style/images/BLUETOOTH.png")} style={{
                                margin: "-10px 90px"
                            }} />
                                </div>
                            </div> */}
                             <img src={require("../style/images/违法处理.png")} width="200px" height="200px" />
                        
                        </Link>
                    </div>


                </div>
                <div className="clear"></div>
            </div>


        )
    }
}

export default Home;