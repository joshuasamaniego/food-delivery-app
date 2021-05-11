import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    border: '0',
}

function Confirmation() {
    const history = useHistory()

    const backToOrder = () => {
        history.push('/order');
    }

    const logOut = () => {
        localStorage.removeItem('user');
        history.push('/');
    }

    return (
        <Container>
            <ConfirmationTop>
                <img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo"/>
                <Main>
                    <h1>Thank You For Your Order!</h1>
                    <h3>Confirmation #001</h3>
                    <Hero>
                        <h2 onClick={backToOrder}>Back To Order Page</h2>
                        <h2 onClick={logOut}>Log Out</h2>
                    </Hero>
                    <p>Use the map to see tracking information on your delivery driver!</p>
                </Main>
                <Contact><ContactH2>Contact Us</ContactH2></Contact>
            </ConfirmationTop>
            <ConfirmationBottom>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23056.177284102647!2d-105.23550495867879!3d39.98776950717182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620769486555!5m2!1sen!2sus" style={mapStyles} allowFullScreen="" loading="lazy" title='google'></iframe>
            </ConfirmationBottom>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

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
`

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
    
` 
const Hero = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100px;
    margin: 30px 0px 60px;

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
`

const Contact = styled.div`
    text-align: center;
    width: 175px;
    height: 50px;
    margin: 20px 50px;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

    &:hover {
        transform: scale(1.03);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    transition: all 0.2s ease-in-out;
`

const ContactH2 = styled.h2`
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: 400;
`

const ConfirmationBottom = styled.div`
    width: 100%;
    height: 55vh;
`

export default Confirmation;
