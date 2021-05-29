import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Login from "../forms/LogIn";
import SignUp from "../forms/SignUp";
import firebase from "../firebase.js";
import "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useHistory } from "react-router-dom";

function Home() {
  const [form, setForm] = useState("login");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const login = await firebase
      .auth()
      .signInWithPopup(provider)
      .catch((err) => console.log(err));

    dispatch(setUser(login.user.displayName));
    localStorage.setItem("user", login.user.displayName);
    history.push("/order");
  };

  const openModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    let modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <HomeDiv>
      <Contact>
        <ContactH2 id="button" onClick={openModal}>
          Contact Us
        </ContactH2>
        <ModalContainer id="modal">
          <ModalContent>
            <Top>
              <h3>Let Us Know How We're Doing!</h3>
              <Close
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                id="close"
                onClick={closeModal}
              >
                <path
                  fill="#1E213F"
                  fillRule="evenodd"
                  d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
                  opacity=".5"
                />
              </Close>
            </Top>
            <Bottom>
              <MessageContainer>
                <NameEmail>
                  <label htmlFor="name">
                    NAME<Input type="text"></Input>
                  </label>
                  <label htmlFor="email">
                    EMAIL<Input type="text"></Input>
                  </label>
                </NameEmail>
                <label htmlFor="textarea">
                  MESSAGE<TextArea type="textarea"></TextArea>
                </label>
              </MessageContainer>
              <Button onClick={closeModal}>SUBMIT</Button>
              <hr />
              <ContactInfo>
                <h4>Or Give Us Call Today: (222) 555-1234</h4>
              </ContactInfo>
            </Bottom>
          </ModalContent>
        </ModalContainer>
      </Contact>
      <Logo>
        <img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo" />
      </Logo>
      <HeroBackground>
        <LoginSignUp>
          <LogInH2 onClick={() => setForm("login")} form={form}>
            Log In
          </LogInH2>
          <SignUpH2 onClick={() => setForm("signup")} form={form}>
            Sign Up
          </SignUpH2>
        </LoginSignUp>
        {form === "login" ? <Login /> : <SignUp />}
        <hr />
        <GoogleSignIn
          src="/assets/GoogleSignin.png"
          alt="Google user sign in button"
          onClick={() => handleLogin()}
        ></GoogleSignIn>
      </HeroBackground>
    </HomeDiv>
  );
}

const kf = keyframes`
  100% {
    opacity: 1;
  }
`;

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Contact = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  margin-top: 45px;
`;

const ContactH2 = styled.h2`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 175px;
  height: 40px;
  margin: 50px 0px;
  text-align: center;
  padding-top: 10px;
  margin-right: -550px;
  border-radius: 18px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  font-weight: 400;
`;

const ModalContainer = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  user-select: none;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  algin-items: center;
  margin: 10% auto;
  padding: 20px;
  border: none;
  border-radius: 38px;
  background: #f2f2f2;
  width: 50vw;
  height: auto;

  hr {
    height: 1px;
    width: 100%;
    margin: 0 auto;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 50px;
  margin: 20px auto;

  h3 {
    text-transform: uppercase;
    letter-spacing: 3px;
    width: 1000%;
  }
`;

const Close = styled.svg`
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
`;

const Bottom = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`;

const NameEmail = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
`;

const Input = styled.input`
  width: 60%;
  height: 30px;
  border: none;
  border-radius: 12px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  margin-left: 10px;
  margin-bottom: 10px;
  padding-left: 10px;

  font-family: "Barlow Condensed", sans-serif;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px;
  font-family: "Barlow Condensed", sans-serif;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 12px;
  background: #bff0cf;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 20px;
  padding-bottom: 2px;
  margin: 35px auto;

  &:hover {
    transform: scale(1.03);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
`;

const ContactInfo = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 25px;

  h4 {
    text-align: center;
    letter-spacing: 1px;
  }
`;

const Logo = styled.div`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: 1;
  margin-top: 50px;
  filter: drop-shadow(5px 5px 10px #bff0cf);
`;

const HeroBackground = styled.div`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 650px;
  margin-bottom: 160px;
  border-radius: 38px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  display: flex;
  flex-direction: column;

  hr {
    height: 1px;
    width: 80%;
  }
`;

const LoginSignUp = styled.div`
  display: flex;
  text-align: center;
  height: 100%;
  padding-top: 20px;
`;

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
  text-decoration: ${(props) =>
    props.form === "signup" ? "underline" : "none"};
`;
const LogInH2 = styled.h2`
  text-transform: uppercase;
  font-weight: 400;
  &:hover {
    transform: scale(1.04);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
  text-decoration: ${(props) =>
    props.form === "login" ? "underline" : "none"};
`;

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
`;

export default Home;
