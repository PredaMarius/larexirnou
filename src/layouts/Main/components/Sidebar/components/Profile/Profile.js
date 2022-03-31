import React from 'react';
import {connect} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography,  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    
  },
  avatar: {
    width: 150,
    height: 150
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className,currentUser } = props;

  const classes = useStyles();

  const user = {
    name: '',
    avatar: '/images/logos/logoMediu.ico',
    bio: ''
  };

  return (
    <div
      
      className={clsx(classes.root, className)}
    >
      <img
        alt="Logo"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/"
      />
      <Typography
        className={classes.name}
        variant="h6"
        style={{color:'white'}}
      >
        {currentUser?currentUser.idFirma.denumire:''}
      </Typography>
      
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapStateToProps=state=>({
  currentUser:state.user.currentUser,
  
})

export default connect(mapStateToProps)(Profile);
