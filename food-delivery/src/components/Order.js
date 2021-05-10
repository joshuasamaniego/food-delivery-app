import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurants } from '../slices/restaurantsSlice';
import { setCart, updateCart } from '../slices/cartSlice';

function Order() {
    const [current, setCurrent] = useState();
    const [menuItems, setMenuItems] = useState();

    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurants);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBIY2p0W20AYqFY9vEzAHiB-lf9uJx4rF0', { method: 'POST' })
            .then(response => response.json())
            .then(result => fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${result.location.lat}&lon=${result.location.lng}&distance=5&key=83f2b023d3c913637c5ec321c4047a0e&fullmenu&size=10`))
            .then(response => response.json())
            .then(res => dispatch(setRestaurants(res.data)))
            .catch(err => console.log(err))
    }, [])//eslint-disable-line


    const addToCart = (item) => {
        dispatch(setCart(item))
    }

    const removeFromCart = (item) => {
        dispatch(updateCart(item))
    }

    return (
        <OrderDiv>
            <RestColumn>
                <img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo"/>
                <input type="text" placeholder="Search Restaurants Near Me"/>
                {restaurants && restaurants.restaurants.map(restaurant => 
                    <RestCard key={restaurant.address.formatted} onClick={() => setCurrent(restaurant)}>
                        <h3>{restaurant.restaurant_name}</h3>
                        <p>{restaurant.address.formatted}</p>
                        <p>{restaurant.restaurant_phone}</p>
                    </RestCard>
                )}
            </RestColumn>
            <MenuColumn>
                <h1>{current && `${current.restaurant_name} Menu`}</h1>
                <MenuNav>
                    {current && current.menus[0].menu_sections.map(section => 
                        <h3 
                            onClick={() => setMenuItems(section.menu_items)}
                            key={section.section_name}
                        >{section.section_name}</h3>
                    )}
                </MenuNav>
                <MenuItems>
                    {menuItems && menuItems.map(item => {
                        return (
                            <div key={item.name} onClick={() => addToCart(item)}>
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                                <p>{item.price}</p>
                            </div>
                        )
                    })}
                </MenuItems>
            </MenuColumn>
            <TotalColumn>
                <h2>{current ? `Your Order From ${current.restaurant_name}` : 'Your Order'}</h2>
                <Cart>
                    {cart && cart.map(item => {
                        return (
                            <div key={item.name} onClick={() => removeFromCart(item)}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                        )
                    })}
                </Cart>
                <Total>
                    <h2>Total: $0.00</h2>
                </Total>
            </TotalColumn>
        </OrderDiv>
    )
}

const OrderDiv = styled.div`
    display: flex;
    width: 100vw;
`

const RestColumn = styled.div`
    width: 25%;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    img {
        width: 100px;
        height: 100px;
        margin-top: 10px;
        filter: drop-shadow(-3px -3px 8px #6FD6FF);
    }

    input {
        width: 80%;
        height: 40px;
        margin-top: 15px;
        margin-bottom: 15px;
        border: none;
        border-radius: 12px;
        background: #f2f2f2;
        box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
        padding-left: 10px;

        &:focus {
            outline: none;
        }

        &::placeholder {
            font-family: "Barlow Condensed", sans-serif;
            text-transform: uppercase;
            font-weight: 400;
            letter-spacing: 1.5px;
        }
    }
`

const RestCard = styled.div`
    display: flex;
    width: 80%;
    height: auto;
    border: 2px solid #6FD6FF;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
    margin: 5px 0px;
    padding: 0px 5px;

    &:hover {
        transform: scale(1.03);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        border: 2px solid #BFF0CF;
      }

    transition: all 0.3s ease-in-out;

    h3 {
        text-transform: uppercase;
    }

`

const MenuColumn = styled.div`
    width: 60%;
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    text-align: center;

    h1 {
        margin: 15px 0px;
        height: 20px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
`

const MenuNav = styled.nav`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 95%;
    height: auto;
    margin: 10px;

    h3 {
        width: 18%;
        height: auto;
        padding: 5px 0px;
        border: 2px solid #6FD6FF;
        border-radius: 12px;
        background: #f2f2f2;
        box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

        &:hover {
            transform: scale(1.03);
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            border: 2px solid #BFF0CF;
          }
        transition: all 0.2s ease-in-out;
    }
`

const MenuItems = styled.div`
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 90%;
        height: auto;
        padding: 5px 0px;
        margin: 10px auto;
        border: 2px solid #BFF0CF;
        border-radius: 12px;
        background: #f2f2f2;
        box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

        &:hover {
            transform: scale(1.01);
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            border: 2px solid #6FD6FF;
          }
        transition: all 0.2s ease-in-out;

    }
    
`

const TotalColumn = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 15%;
    height: 100vh;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

    h2 {
        text-transform: uppercase;
    }
`

const Cart = styled.div`
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: auto;
        height: 20px;
    }
`

const Total = styled.div`
    display: flex;
`

export default Order;
