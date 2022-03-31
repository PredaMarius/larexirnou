/* eslint-disable linebreak-style */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Informatii, Email } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background:'#CFD8DC', 
    height:'100%',
    overflow: 'auto'
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={5}
          xs={12}
        >
          <Informatii />
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <Email />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
