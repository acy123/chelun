import React from 'react';
import { Switch, Route } from 'react-router-dom';

const MyRoute=(route)=>(
    <Switch>
         {route.children}
         {route.route?route.route.map(Routes=>(
             <Route key={Routes.path} path={Routes.path} render={(props)=><Routes.component {...props} route={Routes.route} />} />
         )):null}
    </Switch>     
   
)
   
export default MyRoute;


