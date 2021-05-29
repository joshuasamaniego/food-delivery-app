import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";

// import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  border: "0",
};

function Confirmation() {
  const history = useHistory();

  const backToOrder = () => {
    history.push("/order");
  };

  const logOut = () => {
    localStorage.removeItem("user");
    history.push("/");
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
    <Container>
      <ConfirmationTop>
        <Logo>
          <img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo" />
        </Logo>
        <Main>
          <h1>Thank You For Your Order!</h1>
          <h3>Confirmation #001</h3>
          <Hero>
            <h2 onClick={backToOrder}>Back To Order Page</h2>
            <h2 onClick={logOut}>Log Out</h2>
          </Hero>
          <p>
            Use the map to see tracking information on your delivery driver!
          </p>
        </Main>
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
      </ConfirmationTop>
      <ConfirmationBottom>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23056.177284102647!2d-105.23550495867879!3d39.98776950717182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620769486555!5m2!1sen!2sus"
          style={mapStyles}
          allowFullScreen=""
          loading="lazy"
          title="google"
        ></iframe>
      </ConfirmationBottom>
    </Container>
  );
}

const kf = keyframes`
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ConfirmationTop = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  margin: 20px 0px;
  height: 40vh;

  img {
    width: 150px;
    height: 150px;
    margin: 0px 50px;
  }
`;

const Logo = styled.div`
  width: 25%;
  img {
    width: 150px;
    height: 150px;
    margin: 0px 50px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h1 {
    height: 20px;
  }
  h3 {
    height: 20px;
  }
`;

const Contact = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
`;

const ContactH2 = styled.h2`
  opacity: 0;
  animation: ${kf} 0.5s ease-in-out forwards;
  width: 175px;
  height: 40px;
  margin: 50px 0px;
  text-align: center;
  padding-top: 10px;
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
  height: 50vh;

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
  margin: 10px auto;
`;

const Hero = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100px;
  margin: 30px 0px 50px;

  h2 {
    text-transform: uppercase;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    transition: all 0.2s ease-in-out;
    width: 250px;
    height: auto;
    padding: 10px 0px;
    text-align: center;
    border-radius: 12px;

    &:hover {
      transform: scale(1.03);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
  }
`;

const ConfirmationBottom = styled.div`
  width: 100%;
  height: 55vh;
`;

export default Confirmation;
