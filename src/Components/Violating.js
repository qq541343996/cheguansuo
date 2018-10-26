import React, { Component } from 'react'
import { message, Button, Table, Divider, Tag, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import {HttpClient, HttpClientget, HttpClientpost} from '../util/AxiosUtils';

class Violating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealHandle: "home",
            ret:'',
            name:'',
            img1:'',
            takePhoto:true,
            money:'',
            msg:'',
            score:'',
            carNumber:"",
            driveNumber:'5002320194984547234',
            serialNumber:''
        };
    }
    
connect=()=> {	
	var ret = CertCtl.connect();
    ret = this.JStrToObj(ret);	
	return;
}
//读车主
readCert1=()=> {
    // clearInterval(this.time)
    // this.select()
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
            // gender:ret.resultContent.gender == 1?"男":"女",
            // nation:ret.resultContent.nation,
            // bornDay:ret.resultContent.bornDay,
            certNumber:ret.resultContent.certNumber,
            // img1:ret.resultContent.identityPic
        },()=>{
            this.select()
        })
    }
}
//读交款人
readCert2=(record)=> {
    // clearInterval(this.time)
    // this.select()
    const _that  = this;
	var ret = CertCtl.readCert();
    ret = this.JStrToObj(ret);
    console.log("info",ret)
    if(ret.resultFlag == -1){
        message.success("识别不到身份证");
    }else{
        clearInterval(this.time)
        message.success("识别成功");
        _that.setState({
            img1:ret.resultContent.identityPic
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
                    this.camera(record)
                })
            }
        })
        

        // this.setState({
        //     name:ret.resultContent.partyName,
        //     gender:ret.resultContent.gender == 1?"男":"女",
        //     nation:ret.resultContent.nation,
        //     bornDay:ret.resultContent.bornDay,
        //     certNumber:ret.resultContent.certNumber,
        //     img1:ret.resultContent.identityPic
        // },()=>{
        //     this.camera()
        // })
    }
}

JStrToObj=(str)=>{
	return eval("(" + str + ")");
}
//车主身份证
    dealHandle1() {
        // this.connect()
        this.setState({
            dealHandle: "card1"
        }, () => {
            this.time = setInterval(() => {
                this.readCert1()                
            }, 3000)
        })
    }
//处理/交款人身份证
    dealHandle2(record) {
        // this.connect()
        if(record.status==1){
            this.setState({
                dealHandle: "dispose",
                score:record.score,
                carNumber:record.carNumber
            })
        }else{
            this.setState({
                dealHandle: "card2"
            }, () => {
                this.time = setInterval(() => {
                    this.readCert2(record)                
                }, 3000)
            })
        }
       
}
//输入决定书编号
    payHandle() {
        this.setState({
            dealHandle: "pay"
        },()=>{
            
        })
    }
//违章表
    select=()=> {
        const _that=this
        this.setState({
            dealHandle: "table",
        },()=>{
            
            // document.getElementById("img1").onload=()=>{
            //     var canvas = document.getElementById("myCanvas");
            //     var ctx = canvas.getContext("2d");
            //     var img=document.getElementById("img1");
                
            //     ctx.drawImage(img,0,0,300,300);
            //     var base64 = canvas.toDataURL('image/jpeg',4);
            //     _that.setState({
            //         img3:base64.replace("data:image/jpeg;base64,","")
            //     })
            // }
            
        })
         
        
        
    }

         
//调用摄像头
camera(record){
    console.log(record)
    const _that =this
    this.setState({
        dealHandle: "face",
        money:record.money,
        score:record.score,
        carNumber:record.carNumber
    }, () => {
    //     var video = document.getElementById('video'),
    //     canvas = document.getElementById('canvas'),
    //     snap = document.getElementById('tack'),
    //     img = document.getElementById('img'),
    //     context = canvas.getContext('2d');
    //     vendorUrl = window.URL || window.webkitURL;
         

    // //媒体对象
    // navigator.getMedia = navigator.getUserMedia ||
    //                      navigator.webkitGetUserMedia ||
    //                      navigator.mozGetUserMedia ||
    //                      navigator.msGetUserMedia;
    // navigator.getMedia({
    //     video: true, //使用摄像头对象
    //     audio: false  //不适用音频
    // }, function(strem){
    //     console.log("strem",strem);
    //     video.src = vendorUrl.createObjectURL(strem);
    //     video.play();
    // }, function(error) {
    //     //error.code
    //     console.log(error);
    // });
    // snap.addEventListener('click', function(){
    
    //         //绘制canvas图形
    //         canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);   
    //         //把canvas图像转为img图片
    //         console.log(canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,",""))
    //         const faceImg = canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,","");
    //         HttpClientpost("http://192.168.0.151:8000",{img1:"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",img2:faceImg}).
    //         then((result) => {
    //             console.log('result',result)
    //             if(result.error == 0){
    //                 message.success("识别成功.");
    //                 console.log("识别成功.")
    //             }else{
    //                 message.success("识别失败.");
    //                 console.log("识别失败.")
    //             }
    //         }).catch((err) => {
    //             console.log(err)
    //         });
            
    //     })
    
    var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      tracking.track('#video', tracker, { camera: true });


      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video,0,0,500,400);
        event.data.forEach(function(rect) {

          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
        if(_that.state.takePhoto){
            if(rect.x>60&&rect.x<200&&rect.y>50&&rect.y<170){
                // console.log(canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,",""))
                const faceImg = canvas.toDataURL("image/jpeg").replace("data:image/jpeg;base64,","");
                _that.setState({
                    takePhoto:false
                },()=>{
                    HttpClientpost("http://192.168.0.71:90/faceVerify/",{img1:_that.state.img3,img2:faceImg}).
                    then((result) => {
                        console.log('result',result)
                        if(result.score > 60){
                            message.success("识别成功.");
                            console.log("识别成功.")
                            setTimeout(()=>{ 
                                _that.setState({
                                takePhoto:false,
                                dealHandle: "confirmInfo"
                            })},2000)
                           
                        }else{
                            message.success("识别失败.");
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
    //消息确认
    CompleteHandle() {
        console.log("serialNumber",this.state.serialNumber)
        this.setState({
            dealHandle: "confirmInfo"
        }, () => {
          
        })
        // setTimeout(() => {
        //     message.success("识别成功.");
        //      this.setState({
        //          dealHandle: "payVio"
        //      })
        //  }, 2300)
        
    }
    //打印
    myPrint=()=> {		       
		this.CreatePrintPage();       
		LODOP.PRINT();		       
    };
    CreatePrintPage=()=> {       
        LODOP=getLodop();
		LODOP.SET_PRINT_STYLE("FontSize",11);       
		LODOP.ADD_PRINT_TEXT(0,100,100,25,"缴凭证据");       
		LODOP.SET_PRINT_STYLEA(2,"FontName","隶书");       
		LODOP.SET_PRINT_STYLEA(2,"FontSize",9);		       
		LODOP.ADD_PRINT_TEXT(30,10,300,20,"处罚决定书编号：5002301940820451");       
		LODOP.ADD_PRINT_TEXT(50,10,300,20,"当事人：陈龙");       
        LODOP.ADD_PRINT_TEXT(70,10,300,20,"车牌号：渝A-123456");
        LODOP.ADD_PRINT_TEXT(90,10,300,10,"----------------------------------");
        LODOP.ADD_PRINT_TEXT(110,10,300,20,"缴款卡号：664684803486456");
        LODOP.ADD_PRINT_TEXT(130,10,300,20,"缴款金额：1000000");
        LODOP.ADD_PRINT_TEXT(150,10,300,20,"缴款时间：20181022 9:56:53");
        LODOP.ADD_PRINT_TEXT(170,10,300,10,"----------------------------------");
        LODOP.ADD_PRINT_TEXT(190,10,300,20,"终端号:00000027");
        LODOP.ADD_PRINT_TEXT(210,100,300,20,"此凭证不作报销依据");
        LODOP.SET_PRINT_PAGESIZE(3,700,30,"")	       
	}; 
    //缴费
    onMoney=()=>{
        this.setState({
            dealHandle: "money"
        })
    }
    //完成缴费
    onpayVio=()=>{
        this.setState({
            dealHandle: "payVio"
        })
    }
    //处理
    dispose=()=>{
        this.setState({
            dealHandle: "serialNumber"
        })
    }
    //违章编号
    onInput(data){
       
        if(data == -1){
           const serialNumber2 = this.state.serialNumber.substring(0, this.state.serialNumber.length - 1);  
           this.setState({
                serialNumber:serialNumber2
            })
            
        }else{
            const serialNumber = this.state.serialNumber+data
            this.setState({
                serialNumber:serialNumber
            })
        }
        return false;
    }
    onChange=(e)=>{
        this.setState({
            serialNumber:e.target.value
        },()=>{
           
        })

       
    }
    seletHandle = () => {
        const columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '违章信息',
            dataIndex: 'msg',
            key: 'msg',
        }, {
            title: '车牌号',
            dataIndex: 'carNumber',
            key: 'carNumber',
        }, {
            title: '违章地点',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '记分',
            dataIndex: 'score',
            key: 'score',
        }, {
            title: '罚款',
            dataIndex: 'money',
            key: 'money',
        }, {
            title: '违章时间',
            dataIndex: 'time',
            key: 'time',
        },  {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render:(text, record)=>(
                <span>{parseInt(record.status)==1 ? "未处理":"已处理"}</span>
            )
        },  {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
              {parseInt(record.status)==1 ? <Tag color="blue">处理</Tag>:<Tag color="blue">交款</Tag>}
              </span>
            ),
          }];

        const data = [{
            key: '1',
            msg: '闯红灯',
            carNumber:'渝A123456',
            num: 32,
            time: '2018/9/30 12:00:00',
            money:200,
            score:'3',
            address:'桃源路路口',
            status:'0'
        }, {
            key: '2',
            msg: '违章停车',
            carNumber:'渝A123456',
            num: 42,
            time: '2018/9/30 12:00:00',
            money:300,
            score:'3',
            address:'直港大道',
            status:'1'
        }, {
            key: '3',
            msg: '违规变道',
            carNumber:'渝A123456',
            num: 52,
            time: '2018/9/30 12:00:00',
            money:400,
            score:'3',
            address:'嘉华大桥',
            status:'1'
        }, {
            key: '4',
            msg: '违规变道',
            carNumber:'渝A123456',
            num: 65,
            time: '2018/9/30 12:00:00',
            money:400,
            score:'3',
            address:'桃源路路口',
            status:'1'
        }, {
            key: '5',
            msg: '违规变道',
            carNumber:'渝A123456',
            num: 79,
            time: '2018/9/30 12:00:00',
            money:400,
            score:'3',
            address:'桃源路路口',
            status:'1'
        }];


        const child = [];
        const { dealHandle } = this.state;
        switch (dealHandle) {
            case "card1":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>请放入车主身份证</span>
                </div>);
                break;
            case "card2":
                child.push(<div key={1} className="re-face">
                    <img style={{width:"300px",height:"300px",opacity:'0',position:'absolute'}} src={"data:image/jpeg;base64," + this.state.img1} alt="" id="img1"/>
                    <canvas id="myCanvas" width="300px" height="300px" style={{opacity:'0',position:'absolute'}}></canvas>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>请放入交款人身份证</span>
                </div>);
                break;
            case "table":
                child.push(<div key={1} className="re-face">
                    <Table columns={columns} dataSource={data} pagination={false} 
                    onRow={(record) => {
                        return {
                          onClick: () => {this.dealHandle2(record)}// 点击行
                        };
                      }}/>
                      <Pagination defaultCurrent={1} defaultPageSize={5} total={5} style={{marginTop:'10px'}}/>
                </div>);
                break;
            case "pay":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:'5px' }}>请输入违章编号</span>
                    {/* <div style={{width:"300px",height:"60px",background:"white",fontSize:'24px',fontWeight:'600',lineHeight:'40px'}}>{this.state.serialNumber}</div> */}
                    <input type="text" onChange={this.onChange} placeholder={"扫码时请先点击该框"} value={this.state.serialNumber}/>
                    <div className="keyboard">
                        <p onClick={()=>{this.onInput(1)}}>1</p><p onClick={()=>{this.onInput(2)}}>2</p><p onClick={()=>{this.onInput(3)}}>3</p>
                        <p onClick={()=>{this.onInput(4)}}>4</p><p onClick={()=>{this.onInput(5)}}>5</p><p onClick={()=>{this.onInput(6)}}>6</p>
                        <p onClick={()=>{this.onInput(7)}}>7</p><p onClick={()=>{this.onInput(8)}}>8</p><p onClick={()=>{this.onInput(9)}}>9</p>
                        <p>.</p><p onClick={()=>{this.onInput(0)}}>0</p><p onClick={()=>{this.onInput(-1)}}>退格</p>
                    </div>
                    <div ref='digitalKeyboard'></div>                    
                    <span onClick={() => this.CompleteHandle()} style={{ fontSize: "16px", fontWeight: 600, color: "#000000", marginTop: "10px", borderRadius: "10px", padding: "12px 40px", backgroundColor: "gainsboro",cursor:'pointer' }}>完成</span>
                </div>);
                break;
            case "face":
                child.push(<div key={1} className="re-face">
                    <p style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>正在进行人脸识别.</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>
                        <img src={require("../style/images/bg0.png")} style={{width:"500px",height:"400px",position:'absolute',zIndex:10}}/>
                        <video id="video" width="500px" height="400px" style={{opacity:0,position:'absolute'}} ></video>
                        <canvas id="canvas" width="500px" height="400px" ></canvas>
                        
                    </span>
                </div>);
                break;
            case "payVio":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"50px" }}>完成缴费.</span>
                    <button onClick={this.myPrint} style={{fontSize:"24px"}}>打印凭证</button>
                </div>);
                break;
            case "confirmInfo":
                child.push(<div key={1} className="re-face">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "#000000",marginTop:'5px'}}>违法信息确认</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px'}}>处理人驾驶证号：{this.state.driveNumber}</p>
                        <p style={{marginTop:'5px'}}>当事人：{this.state.name}</p>
                        <p style={{marginTop:'5px'}}>车牌号码：{this.state.carNumber}</p>
                        <p style={{marginTop:'5px'}}>罚款金额：{this.state.money}</p>
                        <p style={{marginTop:'5px'}}>滞纳金：0</p>
                    </span>
                    <button onClick={()=>this.onMoney()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "dispose":
                child.push(<div key={1} className="re-face">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "#000000",marginTop:'5px'}}>违法信息确认</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px'}}>处理人驾驶证号：{this.state.driveNumber}</p>
                        <p style={{marginTop:'5px'}}>处理人：{this.state.name}</p>
                        <p style={{marginTop:'5px'}}>车牌号码：{this.state.carNumber}</p>
                        <p style={{marginTop:'5px'}}>违章记分：{this.state.score}</p>
                   </span>
                    <button onClick={()=>this.dispose()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "serialNumber":
                child.push(<div key={1} className="re-face">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "red",marginTop:'5px'}}>违法处理成功</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px'}}>处理决定书编号：564615657537186</p>
                   </span>
                    <button onClick={()=>this.select()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "money":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" }}>
                      请输入密码
                    </span>
                    <input type="password"/>
                    <button onClick={()=>this.onpayVio()} style={{fontSize:"24px",marginTop:"20px"}}>确认</button>
                </div>);
                break;
            default:
                child.push(
                    <div key={1} className="sc">
                        <div className="item" onClick={() => this.dealHandle1()}>
                        <img src={require("../style/images/违法处理.png")} width="160px" height="160px"/>
                            {/* 违章处理 */}
                    </div>
                        <div className="item" onClick={() => this.payHandle()}>
                        <img src={require("../style/images/罚款缴纳.png")} width="160px" height="160px"/>
                            {/* 缴纳罚款 */}
                    </div>
                    </div>);
                break;
        }
        return child;
    }
    render() {
        const { dealHandle } = this.state;

        return (
            <div className="container violating">
                <object type="application/cert-reader"  id="CertCtl" width='0' height='0'> </object>  
                {this.seletHandle()}
                <Link to="/" text="首页" key={1}>
                    <div className="btn">返回</div>
                </Link>
                
            </div>
        )
    }
    componentDidMount() {
        // HttpClientpost("http://39.106.29.113:6789",{"code":"31C01","token":"0fa16a943ab6679ccd052814a6ada0d6","param":{"sfzmhm":"500223198112110730","hpzl":"02","hphm":"99999999"}}
        // ).then((result) => {
        //     console.log('result',result)
        // }).catch((err) => {
        //     console.log(err)
        // });
        
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
}

export default Violating;