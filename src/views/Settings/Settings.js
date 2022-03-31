import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Notifications, Password } from './components';
import {selectCurrentUser } from '../../redux/user/user.selectors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    background:'#CFD8DC', 
    height:'100%',
    overflow: 'auto'
  }
}));

const Settings = (props) => {
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
      <h5 style={{color:'red', textAlign:'center'}}> Nu aveti drepturi de acces pentru modulul: Setari!</h5>

      :<div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={7}
            xs={12}
          >
            <Notifications />
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <Password />
          </Grid>
        </Grid>
      </div>
  );
};


const mapStateToProps=state=>({
  currentUser:selectCurrentUser(state),
})
export default connect(mapStateToProps)(Settings);



