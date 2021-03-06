import React, { Component } from 'react'
import { message, Table, Divider, Tag, Pagination,Menu,Dropdown,Button,Icon } from 'antd';
import { Link } from 'react-router-dom';
import {HttpClient, HttpClientget, HttpClientpost} from '../util/AxiosUtils';
class Motor extends Component {
    constructor(props) {
        super(props);
        this.state={
            takePhoto:true,
            dealHandle: "",
            select:"",
            carNumber2:'',
            carName:"渝",
            hpzlName:"点击此处选取车辆类型",
            ywlxName:"选择业务类型",
            sqyyName:"选择申请原因"
        }
    }
    //回主页
    onClick(){
        //window.location.href = "dist/index.html"
        window.location.href = "/"
    }
    connect=()=> {	
        var ret = CertCtl.connect();
        ret = this.JStrToObj(ret);	
        return;
    }
    JStrToObj=(str)=>{
        return eval("(" + str + ")");
    }
    //读车主
    readCert1=()=> {
        const _that = this;
        var ret = CertCtl.readCert();
        ret = this.JStrToObj(ret);
        console.log("info",ret)
        if(ret.resultFlag == -1){
            message.success("识别不到身份证");
        }else{
            clearInterval(this.time)
            message.success("识别成功");
            this.setState({
                name:ret.resultContent.partyName,
                gender:ret.resultContent.gender == 1?"男":"女",
                nation:ret.resultContent.nation,
                bornDay:ret.resultContent.bornDay,
                certNumber:ret.resultContent.certNumber,
                img1:ret.resultContent.identityPic,

            },()=>{
                document.getElementById("img1").onload=()=>{
                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    var img=document.getElementById("img1");
                    
                    ctx.drawImage(img,0,0,300,300);
                    var base64 = canvas.toDataURL('image/jpeg',4);
                    _that.setState({
                        img3:base64.replace("data:image/jpeg;base64,","")
                    },()=>{
                        this.camera()
                    })
                }
            })
        }
    }
    //补换领机动车行驶证
bhlxsz=()=>{
        this.setState({
            dealHandle:"card",
            select:"bhljdcxsz"
        },()=>{
            this.time = setInterval(() => {
                this.readCert1()                
            }, 3000)
        })
    }
    //补换领机动车行驶证是否满足
bhlxszsfmz=()=>{
        //发送身份证号
        // HttpClientpost("http://39.106.29.113:6789",{"code":"31C01","token":"0fa16a943ab6679ccd052814a6ada0d6","param":{"sfzmhm":this.state.certNumber,"hpzl":this.state.hpzlName,"hphm":this.state.carNumber2}}
        // ).then((result) => {
        //     console.log('result',result)
        // }).catch((err) => {
        //     console.log(err)
        // });
        this.setState({
            dealHandle:"info"
        },()=>{
            
        })
    }
    //补换领机动车号牌
bhljdchp=()=>{
    this.setState({
        dealHandle:"card",
        select:"bhljdchp"
    },()=>{
        this.time = setInterval(() => {
            this.readCert1()                
        }, 3000)
    })
}
    //补换领机动车号牌是否满足
bhljdchpsfmz=()=>{
        //发送身份证号
        // HttpClientpost("http://39.106.29.113:6789",{"code":"31C01","token":"0fa16a943ab6679ccd052814a6ada0d6","param":{"sfzmhm":this.state.certNumber,"hpzl":this.state.hpzlName,"hphm":this.state.carNumber2}}
        // ).then((result) => {
        //     console.log('result',result)
        // }).catch((err) => {
        //     console.log(err)
        // });
        this.setState({
            dealHandle:"info"
        },()=>{
            
        })
    }
    //补换领机动车检验合格标志
bhljdcjyhgbz=()=>{
        this.setState({
            dealHandle:"card",
            select:"bhljdcjyhgbz"
        },()=>{
            this.time = setInterval(() => {
                this.readCert1()                
            }, 3000)
        })
    }
    //补换领机动车检验合格标志是否满足
bhljdcjyhgbzsfmz=()=>{
        //发送身份证号
        // HttpClientpost("http://39.106.29.113:6789",{"code":"31C01","token":"0fa16a943ab6679ccd052814a6ada0d6","param":{"sfzmhm":this.state.certNumber,"hpzl":this.state.hpzlName,"hphm":this.state.carNumber2}}
        // ).then((result) => {
        //     console.log('result',result)
        // }).catch((err) => {
        //     console.log(err)
        // });
        this.setState({
            dealHandle:"info"
        },()=>{
            
        })
    }
    //修改机动车联系方式
xgjdclxfs=()=>{
        this.setState({
            dealHandle:"card",
            select:"xgjdclxfs"
        },()=>{
            this.time = setInterval(() => {
                this.readCert1()                
            }, 3000)
        })
    }
    //修改机动车联系方式是否满足
xgjdclxfssfmz=()=>{
    //发送身份证号
    // HttpClientpost("http://39.106.29.113:6789",{"code":"31C01","token":"0fa16a943ab6679ccd052814a6ada0d6","param":{"sfzmhm":this.state.certNumber,"hpzl":this.state.hpzlName,"hphm":this.state.carNumber2}}
    // ).then((result) => {
    //     console.log('result',result)
    // }).catch((err) => {
    //     console.log(err)
    // });
    this.setState({
        dealHandle:"info"
    },()=>{
        
    })
}   
    //调用摄像头
camera=()=>{
    const _that =this
    this.setState({
        dealHandle: "face",
    }, () => {
    var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      const trackerTask = tracking.track('#video', tracker, { camera: true });
      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video,0,0,500,400);
        event.data.forEach(function(rect) {

          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
        if(_that.state.takePhoto){
            if(rect.x>40&&rect.x<220&&rect.y>40&&rect.y<200){
                // console.log(canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,",""))
                const faceImg = canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,","");
                _that.setState({
                    takePhoto:false
                },()=>{
                    HttpClientpost("http://192.168.0.71:90/faceVerify/",{img1:_that.state.img3,img2:faceImg}).
                    then((result) => {
                        console.log('result',result)
                        if(result.score > 60){
                            message.success("人脸识别成功.");
                            trackerTask.stop();
                            console.log("识别成功.")
                            setTimeout(()=>{ 
                                _that.setState({
                                takePhoto:false,
                                dealHandle: "carInfo"
                            })},1000)
                           
                        }else{
                            message.success("人脸识别失败.");
                            console.log("识别失败.")
                            setTimeout(()=>{
                                _that.setState({
                                    takePhoto:true
                                })
                            },2500)
                           
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                })
            }
        }
        
        });
      });
    }
    )

}

 //输入车牌号码
 onCarNumber(data){
    if(data == -1){
        const carNumber2 = this.state.carNumber2.substring(0, this.state.carNumber2.length - 1);  
        this.setState({
             carNumber2:carNumber2
         })
         
     }else{
         const carNumber2 = this.state.carNumber2+data
         this.setState({
             carNumber2:carNumber2
         })
     }
     return false;
}
onCarChange=(e)=>{
    this.setState({
        carNumber2:e.target.value
    },()=>{
       
    })
}
//选择车辆类型
selectCar(data,name){
    console.log(data)
    this.setState({
        hpzlName:name,
        hpzl:data
    })
}
//信息确认后请求对应业务接口
confirm=()=>{
    if(this.state.select == "bhljdcxsz"){
        function openSoftkey(argument) {
            VirtualKeyboard.open(this.id, 'softkey');

        }
        this.setState({
            dealHandle:"bhljdcxsz"
        },()=>{
            if(document.getElementById('Number')){
                document.getElementById('Number').onclick = openSoftkey;
            }
            if(document.getElementById('sjrName')){
                document.getElementById('sjrName').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrAddress')){
                document.getElementById('sjrAddress').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrNumber')){
                document.getElementById('sjrNumber').onclick = openSoftkey;
    
            }
        })
    }
    if(this.state.select == "bhljdchp"){
        function openSoftkey(argument) {
            VirtualKeyboard.open(this.id, 'softkey');

        }
        this.setState({
            dealHandle:"bhljdchp"
        },()=>{
            if(document.getElementById('Number')){
                document.getElementById('Number').onclick = openSoftkey;
            }
            if(document.getElementById('sjrName')){
                document.getElementById('sjrName').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrAddress')){
                document.getElementById('sjrAddress').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrNumber')){
                document.getElementById('sjrNumber').onclick = openSoftkey;
    
            }
        })
    }
    if(this.state.select == "bhljdcjyhgbz"){
        function openSoftkey(argument) {
            VirtualKeyboard.open(this.id, 'softkey');

        }
        this.setState({
            dealHandle:"bhljdcjyhgbz"
        },()=>{
            if(document.getElementById('Number')){
                document.getElementById('Number').onclick = openSoftkey;
            }
            if(document.getElementById('sjrName')){
                document.getElementById('sjrName').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrAddress')){
                document.getElementById('sjrAddress').onclick = openSoftkey;
    
            }
            if(document.getElementById('sjrNumber')){
                document.getElementById('sjrNumber').onclick = openSoftkey;
    
            }
        })
    }
    if(this.state.select == "xgjdclxfs"){
        function openSoftkey(argument) {
            VirtualKeyboard.open(this.id, 'softkey');

        }
        this.setState({
            dealHandle:"xgjdclxfs"
        },()=>{
            if(document.getElementById('xgNumber')){
                document.getElementById('xgNumber').onclick = openSoftkey;
    
            }
        })
    }
}
//业务类型
ywlx=(data,name)=>{
    this.setState({
        ywlx:data,
        ywlxName:name
    },()=>{
        console.log(this.state.ywlx)
    })
}
//申请原因
sqyy=(data,name)=>{
    this.setState({
        sqyy:data,
        sqyyName:name
    },()=>{
        console.log(this.state.sqyy)
    })
}
//是否满足办理业务
sfmz=()=>{
    if(this.state.select == "bhljdcxsz"){
       {this.bhlxszsfmz()}
    }
    if(this.state.select == "bhljdchp"){
        {this.bhljdchpsfmz()}
    }
    if(this.state.select == "bhljdcjyhgbz"){
        {this.bhljdcjyhgbzsfmz()}
    }
    if(this.state.select == "xgjdclxfs"){
        {this.xgjdclxfssfmz()}
    }
}
//去签字页面
goSign=()=>{
    this.setState({
        dealHandle:"sign"
    },()=>{
        $(function(){
            //初始化插件
            $(".js-signature").jqSignature();//初始化调整手写屏大小
        })
    })
}
//生成签字
jSignatureTest=()=>{ 
    $('#signature').empty();
    var dataUrl = $('.js-signature').jqSignature('getDataURL');
    var img = $('<img>').attr('src', dataUrl);
    $('#signature').append(img);
}
//清楚签字
reset=()=>{
    $('.js-signature').jqSignature('clearCanvas');
    $('#signature').empty();
}
    seletHandle=()=>{
        const child = [];
        const { dealHandle } = this.state;
        const menu = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.selectCar("02","小型汽车")}>小型汽车</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.selectCar("01","大型汽车")}>大型汽车</Menu.Item>
              <Menu.Item key="3" onClick={()=> this.selectCar("13","农用运输车类")}>农用运输车类</Menu.Item>
            </Menu>
          );
        const menu1 = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.ywlx("1","补领行驶证")}>补领行驶证</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.ywlx("2","换领行驶证")}>换领行驶证</Menu.Item>
            </Menu>
          );
        const menu2 = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.sqyy("A","灭失")}>灭失</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.sqyy("B","丢失")}>丢失</Menu.Item>
              <Menu.Item key="3" onClick={()=> this.sqyy("C","换领")}>换领</Menu.Item>
              <Menu.Item key="4" onClick={()=> this.sqyy("D","损坏")}>损坏</Menu.Item>
              <Menu.Item key="5" onClick={()=> this.sqyy("E","服兵役")}>服兵役</Menu.Item>
              <Menu.Item key="6" onClick={()=> this.sqyy("F","出国")}>出国</Menu.Item>
              <Menu.Item key="7" onClick={()=> this.sqyy("G","其他")}>其他</Menu.Item>
            </Menu>
          );
        const menu3 = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.ywlx("3","补领机动车号牌")}>补领机动车号牌</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.ywlx("4","换领机动车号牌")}>换领机动车号牌</Menu.Item>
            </Menu>
          );
        const menu4 = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.ywlx("5","补领机动车检验合格标志")}>补领机动车检验合格标志</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.ywlx("12","换领机动车检验合格标志")}>换领机动车检验合格标志</Menu.Item>
            </Menu>
          );
        switch (dealHandle) {
            case "info":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" }}>
                    <div  style={{color:"black"}}>请确认信息</div>
                    </span>
                    <div style={{textAlign:"left"}}>
                        <p>姓名：{this.state.name}</p>
                        <p>性别：{this.state.gender}</p>
                        <p>民族：{this.state.nation}</p>
                        <p>出身年月：{this.state.bornDay}</p>
                        <p>身份证号：{this.state.certNumber}</p>
                    </div>
                    <button onClick={()=>this.confirm()} style={{fontSize:"24px",marginTop:"20px",color:"black"}}>确认</button>
                    </div>
                    
                );
                break;
            case "card":
                child.push(
                    <div key={1} className="re-face-card">
                        <img style={{width:"300px",height:"300px",opacity:'0',position:'absolute'}} src={"data:image/jpeg;base64," + this.state.img1} alt="" id="img1"/>
                        <canvas id="myCanvas" width="300px" height="300px" style={{opacity:'0',position:'absolute'}}></canvas>
                        <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>请放入车主身份证</span>
                    </div>
                );
                break;
            case "face":
                child.push(<div key={1} className="re-face-card">
                    <p style={{ fontSize: "24px", fontWeight: 600, color: "#000000" ,color:"black" }}>正在进行人脸识别.</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>
                        <img src={require("../style/images/bg0.png")} style={{width:"500px",height:"400px",position:'absolute',zIndex:10}}/>
                        <video id="video" width="500px" height="400px" style={{opacity:0,position:'absolute'}} ></video>
                        <canvas id="canvas" width="500px" height="400px" ></canvas>
                    </span>
                </div>);
                break;
            case "carInfo": 
                child.push(<div key={1} className="re-face-card" style={{}}>
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" }}>
                    <div  style={{color:"black"}}>请输入车辆信息</div>
                    </span>
                    <div style={{textAlign:"left"}}>
                        <div>
                            <span style={{fontSize:"24px",fontWeight:600}} style={{fontSize:"18px",color:"black"}}>
                                车牌号码：
                            </span>
                            <span style={{color:"red",fontSize:"24px",fontWeight:600}}>
                                {this.state.carName}
                            </span>
                            <input type="text" style={{marginLeft:"5px",color:"red"}} onChange={this.onCarChange} value={this.state.carNumber2}/>
                        </div>
                    
                        <div>
                            <span style={{fontSize:"24px",fontWeight:600}} style={{fontSize:"18px",color:"black"}}>
                                车辆类型：
                            </span>
                            <span style={{color:"red",fontSize:"24px",fontWeight:600}}>
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"308px",height:"50px",fontSize:"20px"}}>
                                    {this.state.hpzlName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                            </span>
                        </div>
                    </div>
                    <div className="keyboard2">
                        <p onClick={()=>{this.onCarNumber(0)}}>0</p><p onClick={()=>{this.onCarNumber(1)}}>1</p><p onClick={()=>{this.onCarNumber(2)}}>2</p><p onClick={()=>{this.onCarNumber(3)}}>3</p><p onClick={()=>{this.onCarNumber(4)}}>4</p><p onClick={()=>{this.onCarNumber(5)}}>5</p><p onClick={()=>{this.onCarNumber(6)}}>6</p><p onClick={()=>{this.onCarNumber(7)}}>7</p><p onClick={()=>{this.onCarNumber(8)}}>8</p><p onClick={()=>{this.onCarNumber(9)}}>9</p>
                        <p onClick={()=>{this.onCarNumber("A")}}>A</p><p onClick={()=>{this.onCarNumber("B")}}>B</p><p onClick={()=>{this.onCarNumber("C")}}>C</p><p onClick={()=>{this.onCarNumber("D")}}>D</p><p onClick={()=>{this.onCarNumber("E")}}>E</p><p onClick={()=>{this.onCarNumber("F")}}>F</p><p onClick={()=>{this.onCarNumber("G")}}>G</p><p onClick={()=>{this.onCarNumber("H")}}>H</p><p onClick={()=>{this.onCarNumber("I")}}>I</p><p onClick={()=>{this.onCarNumber("J")}}>J</p>
                        <p onClick={()=>{this.onCarNumber("K")}}>K</p><p onClick={()=>{this.onCarNumber("L")}}>L</p><p onClick={()=>{this.onCarNumber("M")}}>M</p><p onClick={()=>{this.onCarNumber("N")}}>N</p><p onClick={()=>{this.onCarNumber("O")}}>O</p><p onClick={()=>{this.onCarNumber("P")}}>P</p><p onClick={()=>{this.onCarNumber("Q")}}>Q</p><p onClick={()=>{this.onCarNumber("R")}}>R</p><p onClick={()=>{this.onCarNumber("S")}}>S</p><p onClick={()=>{this.onCarNumber("T")}}>T</p>
                        <p onClick={()=>{this.onCarNumber("U")}}>U</p><p onClick={()=>{this.onCarNumber("V")}}>V</p><p onClick={()=>{this.onCarNumber("W")}}>W</p><p onClick={()=>{this.onCarNumber("Y")}}>Y</p><p onClick={()=>{this.onCarNumber("Z")}}>Z</p>
                        <p onClick={()=>{this.onCarNumber(-1)}}>退格</p>
                    </div>
                    <button onClick={()=>this.sfmz()} style={{fontSize:"24px",marginTop:"20px"}}>确认</button>
                </div>);
                break;
            case "bhljdcxsz":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                    <div style={{textAlign:"left"}}>
                        <p>
                            业务类型：
                            <Dropdown overlay={menu1} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.ywlxName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>
                            申请原因：
                            <Dropdown overlay={menu2} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.sqyyName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>提取方式：委托邮政寄递方式</p>
                        <p>联系电话：                            
                        <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="Number" className="softinput"/>
                        </p>
                        <p>收件人名：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrName" className="softinput"/>
                        </p>
                        <p>收件地址：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrAddress" className="softinput"/>
                        </p>
                        <p>收件人联系电话：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrNumber" className="softinput"/>
                        </p>
                    </div>
                    <div>
                        <button onClick={()=>this.goSign()}>确定</button>
                    </div>
                    </div>
                );
                break;
            case "bhljdchp":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                    <div style={{textAlign:"left"}}>
                        <p>
                            业务类型：
                            <Dropdown overlay={menu3} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.ywlxName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>
                            申请原因：
                            <Dropdown overlay={menu2} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.sqyyName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>提取方式：委托邮政寄递方式</p>
                        <p>联系电话：                            
                        <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="Number" className="softinput"/>
                        </p>
                        <p>收件人名：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrName" className="softinput"/>
                        </p>
                        <p>收件地址：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrAddress" className="softinput"/>
                        </p>
                        <p>收件人联系电话：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrNumber" className="softinput"/>
                        </p>
                    </div>
                    <div>
                        <button onClick={()=>this.goSign()}>确定</button>
                    </div>
                    </div>
                );
                break;
            case "bhljdcjyhgbz":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                    <div style={{textAlign:"left"}}>
                        <p>
                            业务类型：
                            <Dropdown overlay={menu4} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.ywlxName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>
                            申请原因：
                            <Dropdown overlay={menu2} trigger={["click"]}>
                                <Button style={{ marginLeft: 8 ,marginTop: 10 ,width:"300px",height:"30px",fontSize:"20px"}}>
                                    {this.state.sqyyName}<Icon type="down" />
                                </Button>
                            </Dropdown>
                        </p>
                        <p>提取方式：委托邮政寄递方式</p>
                        <p>联系电话：                            
                        <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="Number" className="softinput"/>
                        </p>
                        <p>收件人名：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrName" className="softinput"/>
                        </p>
                        <p>收件地址：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrAddress" className="softinput"/>
                        </p>
                        <p>收件人联系电话：
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="sjrNumber" className="softinput"/>
                        </p>
                    </div>
                    <div>
                        <button onClick={()=>this.goSign()}>确定</button>
                    </div>
                    </div>
                );
                break;
            case "xgjdclxfs":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                    <div style={{textAlign:"left"}}>                
                        <p>更改之后的电话：                            
                            <input type="text" style={{marginLeft:"5px",color:"black",height:"30px"}} id="xgNumber" className="softinput"/>
                        </p>
                    </div>
                    <div>
                    <button onClick={()=>this.goSign()}>确定</button>
                    </div>
                    </div>
                );
                break;
            case "sign":
                child.push(
                    <div key={1} className="re-face-card" style={{fontSize:"24px",fontWeight:600,color:"black"}}>
                             请用正楷在下方签字
                             <div className="js-signature" data-width="500" data-height="300" data-border="1px solid black" data-line-color="#bc0000" data-auto-fit="true"></div>                        <div style={{display:"flex",width:"400px",justifyContent:"space-between"}}>
                            <button id="saveBtn" type="button" onClick={()=>this.jSignatureTest()}>生成签名</button>
                            <button id="clearBtn" type="button" onClick={()=>this.reset()}>清除签名</button>
                        </div>
                        <div id="signature" style={{position:"absolute",opacity:0}}></div>
                    </div>
                );
                break;  
            default:
                child.push(
                    <div key={1}  className="sc">
                    <div className="item" onClick={this.bhlxsz}>
                    <img src={require("../style/images/补换领行驶证.png")} width="160px" height="160px"/>
                        {/* 补换领行驶证 */}
                    </div>
                    <div className="item" onClick={this.bhljdchp}>
                    <img src={require("../style/images/补换领机动车号牌.png")} width="160px" height="160px"/>
                        {/* 补换领机动车号牌 */}
                    </div>
                    <div className="item" onClick={this.bhljdcjyhgbz}>
                    <img src={require("../style/images/补领检验合格标志.png")} width="160px" height="160px"/>
                        {/* 补换领检验合格标志 */}
                    </div>
                    <div className="item" onClick={this.xgjdclxfs}>
                    <img src={require("../style/images/变更机动车联系方式.png")} width="160px" height="160px"/>
                        {/* 变更机动车联系方式 */}
                    </div>
                    </div>
                );
                break;
        }
        return child;
    }

    render() {
        return (
            <div className="container violating">
            <object type="application/cert-reader"  id="CertCtl" width='0' height='0'> </object>  
                {this.seletHandle()}
               
                    <div className="btn" onClick={this.onClick}>返回</div>
                
            </div>
        )
    }
    componentDidMount() {
        
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
}

export default Motor;