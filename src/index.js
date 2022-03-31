import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { SnackbarProvider } from 'notistack';

const notistackRef = React.createRef();
const onClickDismiss = key => () => { 
  notistackRef.current.closeSnackbar(key);
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <SnackbarProvider 
          action={(key) => (
            <HighlightOffIcon onClick={onClickDismiss(key)}/>
          )}
          maxSnack={1}
          ref={notistackRef}        
        >
          <App/>
        </SnackbarProvider>
      </PersistGate>   
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
