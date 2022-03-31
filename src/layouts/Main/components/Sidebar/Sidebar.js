/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, colors } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Iframe from 'react-iframe'

import { Profile,SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: colors.blueGrey[500],
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    paddingTop:0
  
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2),
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className,currentUser, handleClick } = props;

  const classes = useStyles();

  const pagesConectat = [
    {
      title: 'Home',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Produse',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Contul meu',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Contact',
      href: '/contact',
      icon: <EmailIcon />
    },
    {
      title: 'Setari',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      title: 'Deconectare',
      href: '/sign-out',
      icon: <ExitToAppIcon />
    }
  ];

  const pagesDeconectat = [
    {
      title: 'Home',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
   
    {
      title: 'Autentificare',
      href: '/sign-in',
      icon: <LockOpenIcon />
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClick={handleClick}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={currentUser?pagesConectat:pagesDeconectat}
        />
        
        <Divider className={classes.divider} />
        <h6 style={{color:'#EEEEEE', textAlign:'center', fontWeight:'bold', marginBottom:'15px' }}>CURS BNR</h6>
        
        <Iframe 
          frameborder="0"
          marginWidth='0'
          marginHeight='0'
          scrolling='no'
          height= "175px"
          styles={{width: '200px',  maxWidth: '100%', height: '151px' }}
          url="https://www.cursvalutar.ro/widget/?w=200&cft=607D8B&ctt=EEEEEE&cc=000000&cfb=607D8B&ct=EEEEEE&val=EUR&font=12&logo=off&bold=bold&var=off&ct_b=normal&con=on&undefined=undefined"
        />
        
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})
export default connect(mapStateToProps)(Sidebar);
