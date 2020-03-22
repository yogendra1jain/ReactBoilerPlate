/* Main Route Imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
/* Redux Imports*/
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleWare from './Redux/axiosMiddleware';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Redux/RootReducer';
import { Provider } from 'react-redux';
/* Stylesheet */
import './assets/stylesheets/main.less'
/* Material Date Picker */
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
/*Material UI Imports*/
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
//import { createGenerateClassName } from '@material-ui/core/styles';
import theme from './MaterialUiSettings/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
/*Redux Persist Import */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';

/*Layout imports*/
import EmptyLayout from './Layout/EmptyLayout';
import RouteWithLayout from './Layout/RouteWithLayout';

/* Main Route Imports */
import LoginContainer from './Containers/LoginContainer';

import * as serviceWorker from './serviceWorker';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

const middleware = [thunk, axiosMiddleWare];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
};
const persistConfig = {
  key: 'POS',
  storage,
  stateReconciler: hardSet,
  blacklist: ['form', 'ShowToast', 'PaymentDetails', 'RefundPaymentDetails', 'resetProduct', 'resetCategory']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
else {
  store = createStore(persistedReducer, applyMiddleware(...middleware));
}

const persistor = persistStore(store);


// @todo: drive url routes from a config file for central control
ReactDOM.render(
  //   <div>
  //     <Favicon url="/src/assets/images/favicon.ico" />

  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={8} autoHideDuration={4000} style={{ width: '100%' }}>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <Router>
              <Switch>
                <RouteWithLayout Layout={EmptyLayout} exact path="/" Component={LoginContainer} />
              </Switch>
            </Router>
            {/* </PersistGate> */}
          </Provider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </StylesProvider>,
  //   </div>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();