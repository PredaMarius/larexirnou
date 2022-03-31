/* eslint-disable linebreak-style */
import React from 'react'
import {Redirect  } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCurrentUserSuccess, setDeliveryAddressesSuccess} from '../../redux/user/user.actions'
import {loadCuloriSuccess,loadInformariSuccess, loadPreturiTabelareSuccess, loadFirmaSuccess, loadIndicatoriSuccess, loadProduseSuccess, loadMaterialeSuccess, loadOptionaleSuccess} from '../../redux/lookup/lookup.actions'
import {clearToken} from '../../strapi/strapi.utils.js';

class SignOut extends React.Component{
  
  renderRedirect = () => {
    const {setCurrentUserSuccess, setDeliveryAddressesSuccess, loadCuloriSuccess,loadInformariSuccess, loadPreturiTabelareSuccess, loadFirmaSuccess, loadIndicatoriSuccess, loadProduseSuccess, loadMaterialeSuccess, loadOptionaleSuccess}=this.props;
    clearToken();
    setCurrentUserSuccess(null)
    setDeliveryAddressesSuccess([])
    loadCuloriSuccess(null)
    loadInformariSuccess(null)
    loadPreturiTabelareSuccess(null)
    loadFirmaSuccess(null)
    loadIndicatoriSuccess(null)
    loadProduseSuccess(null)
    loadMaterialeSuccess(null)
    loadOptionaleSuccess(null)
    return(<Redirect to="/" />)
  
  }
      
  render () {
    return (
      <div>
        {this.renderRedirect()}
      </div>
    )
  }
}

SignOut.propTypes = {
  setCurrentUserSuccess: PropTypes.func,
  setDeliveryAddressesSuccess:PropTypes.func
};

const mapDispatchToProps=dispatch=>({
  setCurrentUserSuccess:user=>dispatch(setCurrentUserSuccess(user)),
  loadIndicatoriSuccess:(indicatori)=>dispatch(loadIndicatoriSuccess(indicatori)),
  loadInformariSuccess:(informari)=>dispatch(loadInformariSuccess(informari)),
  loadCuloriSuccess:(culori)=>dispatch(loadCuloriSuccess(culori)),
  loadOptionaleSuccess:(optionale)=>dispatch(loadOptionaleSuccess(optionale)),
  loadFirmaSuccess:(firma)=>dispatch(loadFirmaSuccess(firma)),
  loadPreturiTabelareSuccess:(preturitabelare)=>dispatch(loadPreturiTabelareSuccess(preturitabelare)),
  loadMaterialeSuccess:(materiale)=>dispatch(loadMaterialeSuccess(materiale)),
  loadProduseSuccess:(produse)=>dispatch(loadProduseSuccess(produse)),
  setDeliveryAddressesSuccess:addresses=>dispatch(setDeliveryAddressesSuccess(addresses))
})
export default connect(null,mapDispatchToProps)(SignOut);
