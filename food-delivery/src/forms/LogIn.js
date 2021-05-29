import React from "react";
import styles from "styled-components";

const LoginForm = styles.form`
    width: 80%;
    height: 235px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const InputDiv = styles.div`
    display: flex;
    justify-content: space-around;
`;
const Input = styles.input`
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    margin-top: 50px;
    margin-left: 10px;
    padding-left: 10px;

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

function Login() {
  return (
    <LoginForm>
      <InputDiv>
        <label htmlFor="">
          USERNAME<Input type="text"></Input>
        </label>
        <label htmlFor="">
          PASSWORD<Input type="text"></Input>
        </label>
      </InputDiv>
      <Button>SUBMIT</Button>
    </LoginForm>
  );
}

export default Login;
