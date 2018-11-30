import React, { Component } from 'react'
import { message, Table, Divider, Tag, Pagination,Menu,Dropdown,Button,Icon } from 'antd';
import { Link } from 'react-router-dom';
import {HttpClient, HttpClientget, HttpClientpost} from '../util/AxiosUtils';
import moment from 'moment';
class Violating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealHandle: "home",
            ret:'',
            name:'',
            img1:'',
            takePhoto:true,
            msg:'',
            carNumber:"",
            disposDriveNumber:'5002320194984547234',
            serialNumber:'',
            carNumber2:'',
            abbreviation:"渝",
            hpzlName:"点击此处选取车辆类型"
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
            certNumber:ret.resultContent.certNumber,
        },()=>{
            //发送身份证号
            // HttpClientpost("http://39.106.102.99/86005",{"jszh":"500230199408200451"})
            // ).then((result1) => {
            //     console.log('result1',result1)
            //     
                    //result1.map((item, index)=>{
                        // HttpClientpost("http://39.106.102.99/86003",{hpzl:item.hpzl,hphm:item.hphm})
                        // .then((result2)=>{
                        //     console.log('result2',result2)
                                // result2 = result2 === null ? [] : result2;
                                // result2.map((item, index) => {
                                //     item["key"] = index + 1;
                                // })
                        //     _that.setState({
                        //         data:result2
                        //     })
                        // }).catch((err) => {
                        //     console.log(err)
                        // })
                    //})
                    

            // }).catch((err) => {
            //     console.log(err)
            // });
            this.select()
        })
    }
}
//读处理人
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
            img1:ret.resultContent.identityPic,
            disposName:ret.resultContent.partyName,
            clrsfzh:ret.resultContent.certNumber,
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
//处理人身份证/交款
    dealHandle2(record) {
        // this.connect()
        if(record.clbj==1){
            this.setState({
                dealHandle: "card2",
                wfjfs:record.wfjfs,
                hphm:record.hphm,
                fkje:record.fkje,
            }, () => {
                this.time = setInterval(() => {
                    this.readCert2(record)                
                }, 3000)
            })

        }else{
            this.setState({
                    dealHandle: "confirmInfo",
                    wfjfs:record.wfjfs,
                    hphm:record.hphm,
                    fkje:record.fkje,
                   
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
            console.log("车牌号码",this.state.carNumber2)
        })
    }

         
//调用摄像头
camera=(record)=>{
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
                                dealHandle: "dispose"
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
    //消息确认
    CompleteHandle() {
        console.log("serialNumber",this.state.serialNumber)
        this.setState({
            dealHandle: "confirmInfo"
        }, () => {
           
        })
    }
    //打印凭条
    myPrint=()=> {		       
		this.CreatePrintPage();       
		LODOP.PRINT();		       
    };
    CreatePrintPage=()=> {      
        const {name,hphm,fkje} = this.state;
        const Time = new Date();
        const fksj = moment(Time).format("YYYYMMDD hh:mm:ss")
        LODOP=getLodop();
		LODOP.SET_PRINT_STYLE("FontSize",9);       
		LODOP.ADD_PRINT_TEXT(0,100,100,25,"缴凭证据");       
		LODOP.SET_PRINT_STYLEA(2,"FontName","隶书");       
		LODOP.SET_PRINT_STYLEA(2,"FontSize",9);		       
		LODOP.ADD_PRINT_TEXT(30,10,300,20,"处罚决定书编号：5002301940820451");       
		LODOP.ADD_PRINT_TEXT(50,10,300,20,"当事人："+name);       
        LODOP.ADD_PRINT_TEXT(70,10,300,20,"车牌号："+hphm);
        LODOP.ADD_PRINT_TEXT(90,10,300,10,"----------------------------------");
        LODOP.ADD_PRINT_TEXT(110,10,300,20,"缴款卡号：664684803486456");
        LODOP.ADD_PRINT_TEXT(130,10,300,20,"缴款金额："+fkje);
        LODOP.ADD_PRINT_TEXT(150,10,300,20,"缴款时间："+fksj);
        LODOP.ADD_PRINT_TEXT(170,10,300,10,"----------------------------------");
        LODOP.ADD_PRINT_TEXT(190,10,300,20,"终端号:00000027");
        LODOP.ADD_PRINT_TEXT(210,100,300,20,"此凭证不作报销依据");
        LODOP.SET_PRINT_PAGESIZE(3,700,50,"")	       
    }; 
    //打印条形码/二维码
    myPrint2=()=> {		       
		this.CreatePrintPage2();       
		LODOP.PRINT();		       
    };
    CreatePrintPage2=()=>{
        LODOP=getLodop();
        LODOP.ADD_PRINT_TEXT(0,100,100,25,"违章编号二维码");
        LODOP.ADD_PRINT_BARCODE(30,80,120,120,"QRCode",564615657537186);
        LODOP.ADD_PRINT_TEXT(200,10,300,20,"");
        LODOP.ADD_PRINT_TEXT(220,10,300,10,"");
        LODOP.SET_PRINT_PAGESIZE(3,700,50,"")	       
    }
    //缴费
    onMoney=()=>{
        this.setState({
            dealHandle: "money"
        },()=>{
            
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
    //输入违章编号
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
    //分类选择
    classify=()=>{
        this.setState({
            dealHandle: "classify"
        })
    }
    //输入车辆信息
    readCar=()=>{
        this.setState({
            dealHandle: "carInfo"
        })
    }
    //手动输入编号
    pay1=()=>{
        this.setState({
            dealHandle: "pay1"
        })
    }
    //扫码输入编号
    pay2=()=>{
        
        this.setState({
            dealHandle: "pay2"
        },()=>{
            this.textInput.focus();
        })
    }
    //回主页
    onClick(){
        //window.location.href = "dist/index.html"
        window.location.href = "/"
    }
    //打印条形码并且返回表单页
    backViolating(){
        this.myPrint2()
        this.setState({
            dealHandle:"table",
            img1:"",
            takePhoto:true,
        })

        // location.reload()
    }
    //选择车辆类型
    selectCar(data,name){
        console.log(data)
        this.setState({
            hpzlName:name,
            hpzl:data
        })
    }
    //违法照片查询
    wfpic=()=>{
        this.setState({
            dealHandle:"wfpic",
        })
    }
    seletHandle = () => {
        const columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '违法内容',
            dataIndex: 'wfnr',
            key: 'wfnr',
        }, {
            title: '车牌号',
            dataIndex: 'hphm',
            key: 'hphm',
        }, {
            title: '违法地址',
            dataIndex: 'wfdz',
            key: 'wfdz',
        },{
            title: '违法照片',
            dataIndex: 'pic',
            key: 'pic',
            render:(text, record)=>(
                <span onClick={()=>this.wfpic()}><Tag color="blue">照片查询</Tag></span>
            )
        },{
            title: '记分',
            dataIndex: 'wfjfs',
            key: 'wfjfs',
        }, {
            title: '罚款金额',
            dataIndex: 'fkje',
            key: 'fkje',
        }, {
            title: '违法时间',
            dataIndex: 'wfsj',
            key: 'wfsj',
        },  {
            title: '处理标记',
            dataIndex: 'clbj',
            key: 'clbj',
            render:(text, record)=>(
                <span>{parseInt(record.clbj)==1 ? "未处理":"已处理"}</span>
            )
        },  {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span onClick={()=>this.dealHandle2(record)}>
              {parseInt(record.clbj)==1 ? <Tag color="blue">处理</Tag>:<Tag color="blue">交款</Tag>}
              </span>
            ),
          }];

        const data = [{
            key: '1',
            wfnr: '闯红灯',
            hphm:'渝A123456',
            num: 32,
            wfsj: '2018/9/30 12:00:00',
            fkje:200,
            wfjfs:'3',
            wfdz:'桃源路路口',
            clbj:'0'
        }, {
            key: '2',
            wfnr: '违章停车',
            hphm:'渝A123456',
            num: 42,
            wfsj: '2018/9/30 12:00:00',
            fkje:300,
            wfjfs:'3',
            wfdz:'直港大道',
            clbj:'1'
        }, {
            key: '3',
            wfnr: '违规变道',
            hphm:'渝A123456',
            num: 52,
            wfsj: '2018/9/30 12:00:00',
            fkje:400,
            wfjfs:'3',
            wfdz:'嘉华大桥',
            clbj:'1'
        }, {
            key: '4',
            wfnr: '违规变道',
            hphm:'渝A123456',
            num: 65,
            wfsj: '2018/9/30 12:00:00',
            fkje:400,
            wfjfs:'3',
            wfdz:'桃源路路口',
            clbj:'1'
        }];


        const child = [];
        const { dealHandle } = this.state;
        const menu = (
            <Menu>
              <Menu.Item key="1" onClick={()=> this.selectCar("02","小型汽车")}>小型汽车</Menu.Item>
              <Menu.Item key="2" onClick={()=> this.selectCar("01","大型汽车")}>大型汽车</Menu.Item>
              <Menu.Item key="3" onClick={()=> this.selectCar("13","农用运输车类")}>农用运输车类</Menu.Item>
            </Menu>
          );
        switch (dealHandle) {
            case "card1":
                child.push(<div key={1} className="re-face-card">
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>请放入车主身份证</span>
                </div>);
                break;
            case "card2":
                child.push(<div key={1} className="re-face-card">
                    <img style={{width:"300px",height:"300px",opacity:'0',position:'absolute'}} src={"data:image/jpeg;base64," + this.state.img1} alt="" id="img1"/>
                    <canvas id="myCanvas" width="300px" height="300px" style={{opacity:'0',position:'absolute'}}></canvas>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000" }}>请放入处理人身份证</span>
                </div>);
                break;
            case "table":
                child.push(<div key={1} className="re-face-card">
                    <Table columns={columns} dataSource={data} pagination={false} 
                    //onRow={(record) => {
                        //return {
                          //onClick: () => {this.dealHandle2(record)}// 点击行
                        //};
                      //}}
                    />
                      <Pagination defaultCurrent={1} defaultPageSize={5} total={5} style={{marginTop:'10px'}}/>
                </div>);
                break;
            case "pay1":
                child.push(<div key={1} className="re-face-card">
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:'5px',color:"black" }}>请输入违章编号</span>
                    {/* <div style={{width:"300px",height:"60px",background:"white",fontSize:'24px',fontWeight:'600',lineHeight:'40px'}}>{this.state.serialNumber}</div> */}
                    <input type="text" onChange={this.onChange} value={this.state.serialNumber}/>
                    <div className="keyboard">
                        <p onClick={()=>{this.onInput(1)}}>1</p><p onClick={()=>{this.onInput(2)}}>2</p><p onClick={()=>{this.onInput(3)}}>3</p>
                        <p onClick={()=>{this.onInput(4)}}>4</p><p onClick={()=>{this.onInput(5)}}>5</p><p onClick={()=>{this.onInput(6)}}>6</p>
                        <p onClick={()=>{this.onInput(7)}}>7</p><p onClick={()=>{this.onInput(8)}}>8</p><p onClick={()=>{this.onInput(9)}}>9</p>
                        <p onClick={()=>{this.onInput("X")}}>X</p><p onClick={()=>{this.onInput(0)}}>0</p><p onClick={()=>{this.onInput(-1)}}>退格</p>
                    </div>
                                   
                    <span onClick={() => this.CompleteHandle()} style={{ fontSize: "16px", fontWeight: 600, color: "#000000", marginTop: "10px", borderRadius: "10px", padding: "12px 40px", backgroundColor: "gainsboro",cursor:'pointer' }}>完成</span>
                </div>);
                break;
            case "pay2":
                child.push(<div key={1} className="re-face-card">
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:'5px',color:"black"  }}>请在右下方扫描输入</span>
                    {/* <div style={{width:"300px",height:"60px",background:"white",fontSize:'24px',fontWeight:'600',lineHeight:'40px'}}>{this.state.serialNumber}</div> */}
                    <input type="text" onChange={this.onChange} value={this.state.serialNumber} autoFocus="autofocus" ref={(input) => { this.textInput = input; }}/>
                    <span onClick={() => this.CompleteHandle()} style={{ fontSize: "16px", fontWeight: 600, color: "#000000", marginTop: "10px", borderRadius: "10px", padding: "12px 40px", backgroundColor: "white",cursor:'pointer' }}>完成</span>
                </div>);
                break;
            case "pay":
                child.push(<div key={1} className="re-face">
                <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" ,display:"flex"}}>
                    <div onClick={() => this.pay1()} style={{marginRight:"200px"}} className="card">
                    <img src={require("../style/images/手动输入违章编号.png")} width="430px" height="250px"/>
                    </div>
                    <div onClick={() => this.pay2()} className="card">
                    <img src={require("../style/images/扫码输入违章编号.png")} width="430px" height="250px"/>
                    </div>
                    </span>
                </div>);
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
            case "payVio":
                child.push(<div key={1} className="re-face-card">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"50px",color:"black"  }}>完成缴费.</span>
                    <button onClick={this.myPrint} style={{fontSize:"24px"}}>打印凭证</button>
                </div>);
                break;
            case "confirmInfo":
                child.push(<div key={1} className="re-face-card">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "#000000",marginTop:'5px',color:"black" }}>违法信息确认</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px',color:"black" }}>处理决定书编号：564615657537186</p>
                        <p style={{marginTop:'5px',color:"black" }}>当事人：{this.state.name}</p>
                        <p style={{marginTop:'5px',color:"black" }}>车牌号码：{this.state.hphm}</p>
                        <p style={{marginTop:'5px',color:"black" }}>罚款金额（元）：{this.state.fkje}</p>
                        <p style={{marginTop:'5px',color:"black" }}>滞纳金（元）：0</p>
                    </span>
                    <button onClick={()=>this.onMoney()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "dispose":
                child.push(<div key={1} className="re-face-card">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "#000000",marginTop:'5px',color:"black" }}>违法信息确认</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px',color:"black" }}>处理人驾驶证号：{this.state.clrsfzh}</p>
                        <p style={{marginTop:'5px',color:"black" }}>处理人：{this.state.disposName}</p>
                        <p style={{marginTop:'5px',color:"black" }}>车牌号码：{this.state.hphm}</p>
                        <p style={{marginTop:'5px',color:"black" }}>违章记分：{this.state.wfjfs}</p>
                        <p style={{marginTop:'5px',color:"black" }}>罚款金额：{this.state.fkje}</p>
                   </span>
                    <button onClick={()=>this.dispose()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "serialNumber":
                child.push(<div key={1} className="re-face-card">
                    <p style={{fontSize: "24px", fontWeight: 600, color: "red",marginTop:'5px'}}>违法处理成功</p>
                    <span style={{ fontSize: "24px", fontWeight: 600, color: "#000000",marginBottom:"px",textAlign:"left"}}>
                        <p style={{marginTop:'5px',color:"black" }}>处理决定书编号：564615657537186</p>
                   </span>
                    <button onClick={()=>this.backViolating()} style={{fontSize:"24px",marginTop:"20px"}}>确认信息</button>
                </div>);
                break;
            case "money":
                child.push(<div key={1} className="re-face-card">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" ,color:"black" }}>
                      请输入密码
                    </span>
                    <input type="password"/>
                    <button onClick={()=>this.onpayVio()} style={{fontSize:"24px",marginTop:"20px"}}>确认</button>
                </div>);
                break;
            case "classify":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" ,display:"flex"}}>
                      <div onClick={() => this.dealHandle1()} style={{marginRight:"200px"}} className="card">
                      <img src={require("../style/images/读取车主身份证.png")} width="430px" height="250px"/>
                      </div>
                      <div onClick={() => this.readCar()} className="card">
                      <img src={require("../style/images/读取机动车信息.png")} width="430px" height="250px"/>
                      </div>
                    </span>
                </div>);
                break;
            case "carInfo": 
                child.push(<div key={1} className="re-face-card" style={{}}>
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" }}>
                      <div  style={{color:"black"}}>请输入车辆信息</div>
                    </span>
                    <div><span style={{fontSize:"24px",fontWeight:600}} style={{fontSize:"18px",color:"black"}}>车牌号码：
                    
                    </span><span style={{color:"red",fontSize:"24px",fontWeight:600}}>
                    {/* <Dropdown overlay={menu} trigger={["click"]}>
                        <Button style={{height:"50px",fontSize:"20px"}}>
                            {this.state.abbreviation}<Icon type="down" />
                        </Button>
                    </Dropdown> */}
                    渝
                    </span>
                    <input type="text" style={{marginLeft:"5px",color:"red"}} onChange={this.onCarChange} value={this.state.carNumber2}/></div>
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
                    <div className="keyboard2">
                        <p onClick={()=>{this.onCarNumber(0)}}>0</p><p onClick={()=>{this.onCarNumber(1)}}>1</p><p onClick={()=>{this.onCarNumber(2)}}>2</p><p onClick={()=>{this.onCarNumber(3)}}>3</p><p onClick={()=>{this.onCarNumber(4)}}>4</p><p onClick={()=>{this.onCarNumber(5)}}>5</p><p onClick={()=>{this.onCarNumber(6)}}>6</p><p onClick={()=>{this.onCarNumber(7)}}>7</p><p onClick={()=>{this.onCarNumber(8)}}>8</p><p onClick={()=>{this.onCarNumber(9)}}>9</p>
                        <p onClick={()=>{this.onCarNumber("A")}}>A</p><p onClick={()=>{this.onCarNumber("B")}}>B</p><p onClick={()=>{this.onCarNumber("C")}}>C</p><p onClick={()=>{this.onCarNumber("D")}}>D</p><p onClick={()=>{this.onCarNumber("E")}}>E</p><p onClick={()=>{this.onCarNumber("F")}}>F</p><p onClick={()=>{this.onCarNumber("G")}}>G</p><p onClick={()=>{this.onCarNumber("H")}}>H</p><p onClick={()=>{this.onCarNumber("I")}}>I</p><p onClick={()=>{this.onCarNumber("J")}}>J</p>
                        <p onClick={()=>{this.onCarNumber("K")}}>K</p><p onClick={()=>{this.onCarNumber("L")}}>L</p><p onClick={()=>{this.onCarNumber("M")}}>M</p><p onClick={()=>{this.onCarNumber("N")}}>N</p><p onClick={()=>{this.onCarNumber("O")}}>O</p><p onClick={()=>{this.onCarNumber("P")}}>P</p><p onClick={()=>{this.onCarNumber("Q")}}>Q</p><p onClick={()=>{this.onCarNumber("R")}}>R</p><p onClick={()=>{this.onCarNumber("S")}}>S</p><p onClick={()=>{this.onCarNumber("T")}}>T</p>
                        <p onClick={()=>{this.onCarNumber("U")}}>U</p><p onClick={()=>{this.onCarNumber("V")}}>V</p><p onClick={()=>{this.onCarNumber("W")}}>W</p><p onClick={()=>{this.onCarNumber("Y")}}>Y</p><p onClick={()=>{this.onCarNumber("Z")}}>Z</p>
                        <p onClick={()=>{this.onCarNumber(-1)}}>退格</p>
                    </div>
                    <button onClick={()=>this.select()} style={{fontSize:"24px",marginTop:"20px"}}>确认</button>
                </div>);
                break;
            case "wfpic":
                child.push(<div key={1} className="re-face">
                    <span style={{ fontSize: "37px", fontWeight: 600, color: "#000000",marginBottom:"px" ,display:"flex"}}>
                      违法照片
                    </span>
                </div>);
                break;
            default:
                child.push(
                    <div key={1} className="sc">
                        <div className="item" onClick={() => this.classify()}>
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
                
                    <div className="btn" onClick={this.onClick}>返回</div>
                
                    {/* <Link to="/" text="首页" key={1}>
                    <div className="btn">返回</div>
                </Link> */}
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
        const Time = new Date();
        const fksj = moment(Time).format("YYYYMMDD hh:mm:ss")
        console.log(fksj)
    }
    componentWillUnmount(){
        clearInterval(this.time)
    }
}

export default Violating;