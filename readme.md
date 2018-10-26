# 介绍

------

项目使用antd(https://ant.design/docs/react/introduce-cn)框架.登录与主页两个入口页面
地图模块使用 百度地图,地图引入方式为
>* 页面中引入地图文件 http://api.map.baidu.com/api?v=2.0&ak=yourkey
>* 使用生命周期函数 在节点渲染完毕开始生成地图  componentDidMount方法
>* 使用生命周期函数 componentDidUpdate 当更新地图所在组件的state或props时 重新渲染组件

------
项目使用原生localStorage 保存用户登录信息
保存方法localStorage.setItem(key,JSON.stringify(value));
获取方法localStorage.getItem(key)
------

//页面逻辑
入口界面
---登录
---主页
路由
    根据localStorage的user属性来路由页面




# 使用

npm install 

npm run dev (webpack.config.js)开发模式

npm run build (webpack.production.config)生成模式

# 注意事项

IE内核下的兼容性.目前已经兼容一部分