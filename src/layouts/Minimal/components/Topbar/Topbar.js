/* eslint-disable linebreak-style */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, colors } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    background:colors.blueGrey[500]
  },
  flexGrow: {
    flexGrow: 1
  },
  title:{
    color:'white'
  }
  
}));

const Topbar = props => {
  const { className} = props;
  
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <div className={classes.flexGrow} >
            <h2 className={classes.title}>L<span style={{color:'#cc0000'}}>a</span>rexir <span style={{color:'#cc0000'}}>W</span>ebSt<span style={{color:'#cc0000'}}>o</span>re</h2>
          </div>
        </RouterLink>
        
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
