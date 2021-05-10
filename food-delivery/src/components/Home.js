import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Login from '../forms/LogIn';
import SignUp from '../forms/SignUp';
import firebase from '../firebase.js';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useHistory } from 'react-router-dom';

function Home() {
    const [form, setForm] = useState('login');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const login = await firebase
            .auth()
            .signInWithPopup(provider)
            .catch(err => console.log(err));
        
        dispatch(setUser(login.user.displayName));
        localStorage.setItem('user', login.user.displayName);
        history.push('/order');
    }

    return (
        <HomeDiv>
            <Contact><ContactH2>Contact Us</ContactH2></Contact>
            <Logo><img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo"/></Logo>
            <HeroBackground>
                <LoginSignUp>
                    <LogInH2 onClick={() => setForm('login')} form={form}>Log In</LogInH2>
                    <SignUpH2 onClick={() => setForm('signup')} form={form}>Sign Up</SignUpH2>
                </LoginSignUp>
                {form === 'login' ? <Login/> : <SignUp/>}
                <hr/>
                <GoogleSignIn src="/assets/GoogleSignin.png" alt="Google user sign in button" onClick={() => handleLogin()}></GoogleSignIn>
            </HeroBackground>
        </HomeDiv>
    )
}

const kf = keyframes`
  100% {
    opacity: 1;
  }
`

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Contact = styled.div`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  display: flex;
  align-items: center;
  text-align: center;
  width: 175px;
  height: 50px;
  margin: 50px 0px;
  margin-right: -500px;
  border-radius: 18px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
`

const ContactH2 = styled.h2`
  padding-top: 15px;
  text-transform: uppercase;
  font-weight: 400;
`
const Logo = styled.div`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: 1;
  margin-top: 50px;
  filter: drop-shadow(5px 5px 10px #BFF0CF);
`

const HeroBackground = styled.div`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 650px;
  position: relative;
  height: 450px;
  margin-top: 50px;
  border-radius: 38px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  display: flex;
  flex-direction: column;

  hr {
    height: 1px;
    width: 80%;
    margin-top: 50px;
  }
`

const LoginSignUp = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  height: 100px;
  padding-top: 20px;
`

const SignUpH2 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
  padding-left: 200px;
  &:hover {
    transform: scale(1.03);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  text-decoration: ${props => props.form === 'signup' ? 'underline' : 'none'}
`
const LogInH2 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
  &:hover {
    transform: scale(1.04);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  text-decoration: ${props => props.form === 'login' ? 'underline' : 'none'}
`

const GoogleSignIn = styled.img`
  width: 180px;
  height: 45px;
  margin: 25px auto;

  &:hover {
    transform: scale(1.04);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
`

export default Home
