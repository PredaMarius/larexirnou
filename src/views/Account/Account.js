/* eslint-disable linebreak-style */
import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { AccountDetails } from './components';
import { AccountAdrese } from './components';
import {selectCurrentUser } from '../../redux/user/user.selectors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background:'#CFD8DC', 
    height:'100%',
    overflow: 'auto'
  }
}));

const Account = (props) => {
  const classes = useStyles();
  const {currentUser}=props;

  const vanzatorVizibilitate=()=>{
    if(currentUser.role.name==='Vanzator'){
      return true;
    }else{
      return false;
    }
  }

  return (
    vanzatorVizibilitate()?
      <h5 style={{color:'red', textAlign:'center'}}> Nu aveti drepturi de acces pentru modulul: Contul meu!</h5>

      :<div className={classes.root} style={{background:'#CFD8DC', height:'99.90%'}}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountDetails />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountAdrese />
          </Grid>
        </Grid>
      </div>
  );
};

const mapStateToProps=state=>({
  currentUser:selectCurrentUser(state),
})
export default connect(mapStateToProps)(Account)
