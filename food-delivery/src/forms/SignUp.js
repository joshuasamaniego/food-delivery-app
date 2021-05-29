import React, { useState } from "react";
import styles from "styled-components";
import firebase from "../firebase.js";
import "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

import { useHistory } from "react-router-dom";

function SignUp() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        dispatch(setUser(userCredential.user.email));
        localStorage.setItem("user", userCredential.user.email);
        history.push("/order");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    });
  };

  return (
    <SignUpForm
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSignUp(form.email, form.password);
      }}
    >
      <InputDiv>
        <label htmlFor="email">
          EMAIL<Input type="text" name="email" onChange={handleChange}></Input>
        </label>
        <label htmlFor="username">
          USERNAME
          <Input type="text" name="username" onChange={handleChange}></Input>
        </label>
        <label htmlFor="password">
          PASSWORD
          <Input type="text" name="password" onChange={handleChange}></Input>
        </label>
      </InputDiv>
      <Button>SUBMIT</Button>
    </SignUpForm>
  );
}

const SignUpForm = styles.form`
    width: 80%;
    height: 235px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const InputDiv = styles.div`
    display: flex;
    margin-top: 40px;
    padding-top; 40px;
`;
const Input = styles.input`
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    margin-top: 10px;
    margin-left: 10px;
    padding-left: 10px;

    font-family: "Barlow Condensed", sans-serif;
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 16px;

    &:focus {
        outline: none;
    }
`;

const Button = styles.button`
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 12px;
    background: #bff0cf;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    font-family: "Barlow Condensed", sans-serif;
    font-size: 20px;
    padding-bottom: 2px;
    margin: 40px auto;

    &:hover {
        transform: scale(1.03);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
    transition: all 0.3s ease-in-out;
`;

export default SignUp;
