import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Driver extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container violating">
                <div className="sc">
                    <div className="item">
                    <img src={require("../style/images/期满换领驾驶证.png")} width="160px" height="160px"/>
                        {/* 期满换领驾驶证 */}
                    </div>
                    <div className="item">
                    <img src={require("../style/images/遗失补领驾驶证.png")} width="160px" height="160px"/>
                        {/* 遗失补领驾驶证 */}
                    </div>
                    <div className="item">
                    <img src={require("../style/images/超龄换领驾驶证.png")} width="160px" height="160px"/>
                        {/* 超龄换领驾驶证 */}
                    </div>
                    <div className="item">
                    <img src={require("../style/images/损毁换领驾驶证.png")} width="160px" height="160px"/>
                        {/* 损毁换领驾驶证 */}
                    </div>
                    <div className="item">
                    <img src={require("../style/images/延期换领驾驶证.png")} width="160px" height="160px"/>
                        {/* 延期换领驾驶证 */}
                    </div>
                    <div className="item">
                    <img src={require("../style/images/变更驾驶证联系方式.png")} width="160px" height="160px"/>
                        {/* 变更驾驶证联系方式 */}
                    </div>
                </div>

               <Link to="/" text="首页" key={1}>
                    <div className="btn">返回</div>
                </Link>
            </div>
        )
    }
}

export default Driver;