import { commonActionCreater } from '../Redux/Actions/commonAction';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import LoginComponent from '../Components/LoginComponents/login';;

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1
        }
    }

    componentDidMount(){
        if(this.props.sessionRedirectToLogin){
            this.setState({currentStep:3});
            this.props.dispatch(commonActionCreater(false,'SESSION_START_REDIRECT_TO_LOGIN'));
        }
    }
    
    handleStepChange = (currentStep) => {
        if(currentStep==4){
          this.props.history.push('/');
        }
        this.setState({ currentStep })
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {this.state.currentStep == 1 ? 'Sign in' :
                            <div>{this.state.currentStep == 2 ?
                                'Choose terminal' :
                                'Synchronizing'}
                            </div>
                        }
                    </Typography>
                    <form className={classes.form}>
                        {this.state.currentStep == 1 ? <LoginComponent
                            handleStepChange={this.handleStepChange}
                            dispatch={this.props.dispatch}
                            classes={classes}
                        /> : null}
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
let sessionRedirectToLogin = _get(state,'sessionRedirectToLogin.lookUpData');
return {sessionRedirectToLogin}
}
export default connect(mapStateToProps)(withStyles(styles)(SignIn));