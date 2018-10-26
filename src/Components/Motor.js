import React, { Component } from 'react'

import { Link } from 'react-router-dom';
class Motor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container violating">
                <div className="sc">
                <div className="item">
                <img src={require("../style/images/补换领行驶证.png")} width="160px" height="160px"/>
                    {/* 补换领行驶证 */}
                </div>
                <div className="item">
                <img src={require("../style/images/补换领机动车号牌.png")} width="160px" height="160px"/>
                    {/* 补换领机动车号牌 */}
                </div><div className="item">
                <img src={require("../style/images/补领检验合格标志.png")} width="160px" height="160px"/>
                    {/* 补换领检验合格标志 */}
                </div>
                <div className="item">
                <img src={require("../style/images/变更机动车联系方式.png")} width="160px" height="160px"/>
                    {/* 变更机动车联系方式 */}
                </div>
                </div>

               <Link to="/" text="首页" key={1}>
                    <div className="btn">返回</div>
                </Link>
            </div>
        )
    }
}

export default Motor;