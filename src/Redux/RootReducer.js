import {combineReducers} from 'redux';
import ShowToast from './Reducers/toastReducer';
/* COMMON Reducer*/ 
import commonReducer from './Reducers/commonReducer';

/* COMMON Static Reducer */
import commonStaticReducer from './Reducers/commonStaticReducer';

let zipCodeData = commonReducer('ZIPCODE_DATA');

let lockTerminal = commonStaticReducer('LOCK_TERMINAL');


let rootRducer = combineReducers({
    zipCodeData,
    lockTerminal,
    ShowToast,
})

export default rootRducer;