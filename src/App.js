/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component, Fragment  } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

import {connect} from 'react-redux';
import {setLoading} from './redux/other/other.actions'
import './App.css'


import {getUser, clearToken} from './strapi/strapi.utils.js';
import { withSnackbar } from 'notistack';

import Notifier from './components/Notifier/Notifier';

import {loadProduseStart,loadMaterialeStart, loadOptionaleStart, loadCuloriStart, loadPreturiTabelareStart, loadInformariStart, loadIndicatoriStart, loadFirmaStart, loadCursStart} from './redux/lookup/lookup.actions';
import {setCurrentUserSuccess, setDeliveryAddressesStart} from './redux/user/user.actions';

import {strapi} from 'strapi/strapi.config';


import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import 'bootstrap/dist/css/bootstrap.css';

import * as legoData from './views/Loading/legoloader.json';
import * as doneData from './views/Loading/doneloading.json';


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}


const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


const browserHistory = createBrowserHistory();



validate.validators = {
  ...validate.validators,
  ...validators
};


class App extends Component {
  componentDidMount(){
    const {currentUser, setCurrentUserSuccess, loadProduseStart, loadMaterialeStart,loadOptionaleStart, loadCuloriStart, loadPreturiTabelareStart, loadInformariStart, loadIndicatoriStart, loadFirmaStart, loadCursStart }=this.props 
    
    if(this.verificareLocalStorage()<10){  
      localStorage.removeItem('indicatori');
    }


    setCurrentUserSuccess(getUser())
    
    if (currentUser && this.verificareUtilizator()){
      loadFirmaStart(currentUser?currentUser.idFirma.id:0)
      loadProduseStart()
      loadMaterialeStart()
      loadOptionaleStart()
      loadCuloriStart()
      loadInformariStart()
      loadPreturiTabelareStart()
      loadCursStart() 
      setDeliveryAddressesStart(currentUser?currentUser.idFirma.id:0)
      if (this.verificareLocalStorage()>=11){
        loadIndicatoriStart()
      }else{
        setTimeout(function() {
          loadIndicatoriStart() 
        }, 2000);
      }
    } 
  }
  async verificareUtilizator(){
    await strapi.getEntries('indicators',{indicator:'InregistrariNoi'})
      .then(()=>true)
      .catch(()=> {
        clearToken()
        setCurrentUserSuccess(null)
        setTimeout(()=>window.location.reload(),500)
        return false
      })
    
  }
  
  verificareLocalStorage(){
    var nrNomenclatoare=Object.keys(localStorage)
    return nrNomenclatoare.length
  }


  render() {
    const {loading, done}=this.props
    if (loading===false){
      return (
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Fragment>
              <Routes/>
              <Notifier />
            </Fragment>
          </Router>
        </ThemeProvider>

      // <h1>Aplicatie in mentenanta in intervalul 16:00-24:00</h1>

      );
    }else{
      return (
        <div className= "d-flex justify-content-center align-items-center" style={{background:'#CFD8DC', height:'100%'}}>
          <FadeIn>
            <div className="d-flex justify-content-center align-items-center ">loading...</div>
            <div className="d-flex justify-content-center align-items-center " >
              {done ? (
                <Lottie options={defaultOptions} height={300} width={300} />
              ) : (
                <Lottie options={defaultOptions2} height={300} width={300} />
              )}
            </div>
          </FadeIn>
          <Notifier />
        </div>
      );
    }
  }
}

const mapStateToProps=state=>({
  loading:state.other.loading,
  done:state.other.done,
  currentUser:state.user.currentUser,
 
})

const mapDispatchToProps=dispatch=>({
  setCurrentUserSuccess:user=>dispatch(setCurrentUserSuccess(user)),
  loadProduseStart:()=>dispatch(loadProduseStart()),
  loadMaterialeStart:()=>dispatch(loadMaterialeStart()),
  loadOptionaleStart:()=>dispatch(loadOptionaleStart()),
  loadCuloriStart:()=>dispatch(loadCuloriStart()),
  loadPreturiTabelareStart:()=>dispatch(loadPreturiTabelareStart()),
  loadInformariStart:()=>dispatch(loadInformariStart()),
  loadIndicatoriStart:()=>dispatch(loadIndicatoriStart()),
  loadFirmaStart:(id)=>dispatch(loadFirmaStart(id)),
  loadCursStart:()=>dispatch(loadCursStart()),
  setLoading:boll=>dispatch(setLoading(boll)),
  setDeliveryAddressesStart:idFirma=>dispatch(setDeliveryAddressesStart(idFirma)),
})
export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(App));