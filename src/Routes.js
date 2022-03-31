/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import {getCookie} from './strapi/strapi.utils'
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SignOut as SignOutView,
  Contact as ContactView,
  OrdersList as OrdersListView,
  Order as OrderView,
  ClientOffer as ClientOfferView
} from './views';

const Routes = ({currentUser}) => {
  
  if(currentUser && getCookie('jwt')){
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Redirect
          exact
          from="/index.html"
          to="/dashboard"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={OrdersListView}
          exact
          layout={MainLayout}
          path="/orders"
        />
        <RouteWithLayout
          component={OrderView}
          exact
          layout={MinimalLayout}
          path="/order"
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/sign-in"
        />
        <RouteWithLayout
          component={ContactView}
          exact
          layout={MainLayout}
          path="/contact"
        />
        <RouteWithLayout
          component={SignOutView}
          exact
          layout={MinimalLayout}
          path="/sign-out"
        />
        <RouteWithLayout
          component={ClientOfferView}
          exact
          layout={MinimalLayout}
          path="/oferta-client"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }else{
    return(
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Redirect
          exact
          from="/index.html"
          to="/dashboard"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/orders"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/order"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/sign-in"
        />
        
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MainLayout}
          path="/contact"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-out"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        
        <Redirect to="/not-found" />
        
      </Switch> 
    );
  }
 
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(Routes);
