import React from 'react';
import {IndexRoute,Route,Link,IndexRedirect,Redirect} from 'react-router';
import App from '../Container/App'
import {Motor} from '../Components'
const baseUrl = "/"
const router = (
    <Route path={baseUrl} component={App}>
        
        <Route path={baseUrl+"/motor"} breadcrumbName="机动车业务" component={Motor}/>
        {/* <Route path={baseUrl+"deviceBs/proxy"} breadcrumbName="代理商管理" component={Proxys}/>
        <Route path={baseUrl+"deviceBs/launch"} breadcrumbName="发射源管理" component={Launch}/>
        <Route path={baseUrl+"deviceBs/total"} breadcrumbName="代理商收益统计" component={TotalData}/> */}

    </Route>
)

export default router;