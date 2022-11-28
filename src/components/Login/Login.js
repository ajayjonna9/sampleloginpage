import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const emailReducer = (state, action) => {
  if (action.type === "ADD_EMAILVAL") {
    return { val: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "VALID_INPUT") {
    return { val: state.val, isValid: state.val.includes("@") };
  }
  return state;
};
const passwordReducer = (state, action) => {
  if (action.type === "SETPASSWORD") {
    return { passVal: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "VALIDPASSWORD") {
    return { passVal: state.passVal, isValid: state.passVal.trim().length > 6 };
  }
  return state;
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [collegeName, setCollegeName] = useState("");
  useEffect(() => {
    console.log("hii");
  }, []);
  // useEffect(() => {
  //   setFormIsValid(
  //     enteredPassword.trim().length > 6 &&
  //       enteredEmail.includes("@") &&
  //       collegeName.trim().length > 0
  //   );
  // }, [enteredEmail, enteredPassword, collegeName]);

  const [email, dispatchEmail] = useReducer(emailReducer, {
    val: "",
    isValid: false,
  });
  const [passeword, dispatchPassword] = useReducer(passwordReducer, {
    passVal: "",
    isValid: false,
  });
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "ADD_EMAILVAL", val: event.target.value });
    setFormIsValid(passeword.isValid && email.isValid);
    console.log(email.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "SETPASSWORD", val: event.target.value });
    setFormIsValid(passeword.isValid && email.isValid);
    console.log(passeword.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(email.isValid);
    dispatchEmail({ type: "VALID_INPUT" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "VALIDPASSWORD" });
  };
  // const collegeChangeHandler = (e) => {
  //   setCollegeName(e.target.value);
  // };
  // const validateCollegeHandler = () => {
  //   collegeName.length>0
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(email.val, passeword.passVal);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passeword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passeword.passval}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* <div
          className={`${classes.control} ${
            passeword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="Text"
            id="college"
            value={collegeName}
            onChange={collegeChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
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
