/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, colors } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background:colors.blueGrey[500]
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1) 
  },
  title:{
    marginLeft: theme.spacing(1)
  },  
}));

const Topbar = props => {
  const { className, onSidebarOpen } = props;
 
  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
    
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/" />
       
        <div className={classes.flexGrow} >
          <h2 className={classes.title}>L<span style={{color:'#cc0000'}}>a</span>rexir <span style={{color:'#cc0000'}}>W</span>ebSt<span style={{color:'#cc0000'}}>o</span>re </h2>
        </div>
        
        <Hidden mdDown>          
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/*<IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
          */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};


export default Topbar;
