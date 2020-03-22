import React from 'react';
import jwtDecode from 'jwt-decode';
import _get from 'lodash/get';
/* Global Import */
import LoaderButton from '../../Global/UIComponents/LoaderButton';
import genericPostData from '../../Redux/Actions/genericPostData';
/* Material Imports */
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
/* Redux Imports */
import { connect } from 'react-redux';
import { commonActionCreater } from '../../Redux/Actions/commonAction'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmitLogin = (event) => {
        event.preventDefault();
        this.setState({ isFetching: true });
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: { email: this.state.email, password: this.state.password },
            url: 'login/pos-login',
            constants: {
                init: 'POST_LOGIN_DATA_INIT',
                success: 'POST_LOGIN_DATA_SUCCESS',
                error: 'POST_LOGIN_DATA_ERROR'
            },
            identifier: 'POST_LOGIN_DATA',
            successCb: this.afterLoginSuccess,
            errorCb: this.handleLoginError,
            successText:'Login Successful'
        })
    }

    afterLoginSuccess = (data) => {
        this.setState({ isFetching: false });
        let decodeToken = jwtDecode(_get(data, 'token'));
        this.props.dispatch(commonActionCreater(decodeToken, 'LOGIN_CREDS_DECODE'));
        this.props.dispatch(commonActionCreater(decodeToken.Store, 'GET_STORE_DATA_FOR_CART'))
        //todo encryption to be 
        localStorage.setItem('Token', _get(data, 'token'));
        localStorage.setItem('userPin', _get(decodeToken, 'Operator.loginPin', ''));
        localStorage.setItem('userName', _get(decodeToken, 'Operator.person.firstName', '') + " " + _get(decodeToken, 'Operator.person.lastName', ''));
        localStorage.setItem('email', _get(decodeToken, 'Operator.email', ''));
        localStorage.setItem('storeId', _get(decodeToken, 'Operator.storeId'));
        localStorage.setItem('userId', _get(decodeToken, 'Operator.id'));
        localStorage.setItem('role', _get(decodeToken, 'Operator.role'));
        localStorage.setItem('retailerId', _get(decodeToken, 'Retailer.id'));
        localStorage.setItem('storeLogo', _get(decodeToken, 'Store.image','') || '');
        localStorage.setItem("showOutOfStock","false");
        localStorage.setItem('cannabisStore', (_get(decodeToken,'Retailer.type', false)==1))
        // this.props.history.push('/store');
        this.props.handleStepChange(2)
    }

   handleLoginError =  (error) =>{
    console.log(error,"error is here");
    this.setState({ isFetching: false });
   }
    render() {
        let { classes } = this.props
        return (
            <React.Fragment>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        id="email"
                        onChange={(event) => this.setState({ email: event.target.value })}
                        name="email"
                        autoComplete="email"
                        autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        onChange={(event) => this.setState({ password: event.target.value })}
                        type="password"
                        id="password"
                        autoComplete="current-password" />
                </FormControl>
                <LoaderButton
                    onClick={this.handleSubmitLogin}
                    fullWidth
                    type="submit"
                    isFetching={this.state.isFetching}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign in
                </LoaderButton>
            </React.Fragment>)
    }
}

export default Login;