import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }

  return {
    value: "",
    isValid: null
  }
}

const passwordReduser = (state, action) => {


  if (action.type === 'USER_PASSWORD') {
    return {
      value: action.val,
      isValid: action.val.trim().length>6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length>6
    }
  }
  return {
    value: '',
    isValid: null
  }
}

const Login = (props) => {
  //   const [enteredEmail, setEnteredEmail] = useState('');
  //   const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {
    value: '',
    isValid: false
  })

  //   useEffect(()=>{
  // //debouncing
  //     const identifier = setTimeout(()=>{
  //       console.log('Check validation')
  //       setFormIsValid(
  //         enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 6
  //       );
  //     },500)

  //     return (()=>{
  //       console.log('cleaner')
  //       clearTimeout(identifier)
  //     })

  //   },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    })

    setFormIsValid(
      // event.target.value.includes('@') && enteredPassword.trim().length > 6
      emailState.isValid && passwordState.isValid

    )
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: 'USER_PASSWORD',
      val: event.target.value
    })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
      // emailState.isValid && event.target.value.trim().length>0
    )
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value)
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type: 'INPUT_BLUR',
    })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: 'INPUT_BLUR',
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">College Name</label>
          <input
            type="text"
            id="password"
            value={enteredCollege}
            onChange={collegeChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
