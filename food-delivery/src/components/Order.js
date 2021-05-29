import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants } from "../slices/restaurantsSlice";
import { setCart, updateCart, clearCart } from "../slices/cartSlice";
import { useHistory } from "react-router-dom";

function Order() {
  // component state
  const [current, setCurrent] = useState();
  const [menuItems, setMenuItems] = useState();
  // global utilities
  const dispatch = useDispatch();
  const history = useHistory();

  const restaurants = useSelector((state) => state.restaurants);
  const cart = useSelector((state) => state.cart);
  const total = useSelector((state) => {
    let runningTotal = 0;
    if (state.cart.length >= 1) {
      state.cart.forEach((item) => {
        runningTotal += item.price * item.quantity;
      });
      return Math.round(100 * runningTotal) / 100;
    } else {
      return Math.round(100 * runningTotal) / 100;
    }
  });

  // useEffect(() => {
  //   fetch(
  //     "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBIY2p0W20AYqFY9vEzAHiB-lf9uJx4rF0",
  //     { method: "POST" }
  //   )
  //     .then((response) => response.json())
  //     .then((result) =>
  //       fetch(
  //         `https://api.documenu.com/v2/restaurants/search/geo?lat=${result.location.lat}&lon=${result.location.lng}&distance=5&key=83f2b023d3c913637c5ec321c4047a0e&fullmenu&size=10`
  //       )
  //     )
  //     .then((response) => response.json())
  //     .then((res) => dispatch(setRestaurants(res.data)))
  //     .catch((err) => console.log(err));
  // }, []); //eslint-disable-line

  const pickRestaurant = (restaurant) => {
    if (current === restaurant) {
      return;
    } else {
      setCurrent(restaurant);
      setMenuItems();
      dispatch(clearCart());
    }
  };

  const addToCart = (item) => {
    const newItem = {
      ...item,
      quantity: 1,
    };
    dispatch(setCart(newItem));
  };

  const removeFromCart = (item) => {
    dispatch(updateCart(item));
  };

  const placeOrder = () => {
    setMenuItems();
    dispatch(clearCart());
    history.push("/confirmation");
  };

  return (
    <OrderDiv>
      <RestColumn>
        <img src="/assets/FoodDeliveryApp.png" alt="Food Delivery App Logo" />
        <input type="text" placeholder="Search Restaurants Near Me" />
        {restaurants &&
          restaurants.restaurants.map((restaurant) => (
            <RestCard
              key={restaurant.restaurant_id}
              onClick={() => pickRestaurant(restaurant)}
            >
              <h3>{restaurant.restaurant_name}</h3>
              <p>{restaurant.address.formatted}</p>
              <p>{restaurant.restaurant_phone}</p>
            </RestCard>
          ))}
      </RestColumn>
      <MenuColumn>
        <h1>{current && `${current.restaurant_name} Menu`}</h1>
        <MenuNav>
          {current &&
            current.menus[0].menu_sections.map((section) => (
              <h3
                onClick={() => setMenuItems(section.menu_items)}
                key={section.section_name}
              >
                {section.section_name}
              </h3>
            ))}
        </MenuNav>
        <MenuItems>
          {menuItems &&
            menuItems.map((item) => {
              return (
                <div key={item.name} onClick={() => addToCart(item)}>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                </div>
              );
            })}
        </MenuItems>
      </MenuColumn>
      <TotalColumn>
        <h2>
          {current
            ? `Your Order From ${current.restaurant_name}`
            : "Your Order"}
        </h2>
        <div>
          {cart &&
            cart.map((item) => {
              return (
                <CartDiv key={item.name}>
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price}</p>
                  <Exit onClick={() => removeFromCart(item)}>
                    <img
                      src="/assets/icon-close.svg"
                      alt="remove item from cart"
                    />
                  </Exit>
                </CartDiv>
              );
            })}
        </div>
        <Total>
          <h2>{`Total: $${total}`}</h2>
        </Total>
        <Checkout onClick={() => placeOrder()}>Place Order</Checkout>
      </TotalColumn>
    </OrderDiv>
  );
}

const OrderDiv = styled.div`
  display: flex;
  width: 100vw;
`;

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
    filter: drop-shadow(-3px -3px 8px #6fd6ff);
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
`;

const RestCard = styled.div`
  display: flex;
  width: 80%;
  height: auto;
  border: 2px solid #6fd6ff;
  border-radius: 12px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  margin: 5px 0px;
  padding: 0px 5px;

  &:hover {
    transform: scale(1.03);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border: 2px solid #bff0cf;
  }

  transition: all 0.3s ease-in-out;

  h3 {
    text-transform: uppercase;
  }
`;

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
`;

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
    border: 2px solid #6fd6ff;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

    &:hover {
      transform: scale(1.03);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      border: 2px solid #bff0cf;
    }
    transition: all 0.2s ease-in-out;
  }
`;

const MenuItems = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    height: auto;
    padding: 5px 0px;
    margin: 10px auto;
    border: 2px solid #bff0cf;
    border-radius: 12px;
    background: #f2f2f2;
    box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;

    &:hover {
      transform: scale(1.01);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      border: 2px solid #6fd6ff;
    }
    transition: all 0.2s ease-in-out;
  }
`;

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
    height: 100px;
    width: 90%;
  }
`;

const CartDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  height: auto;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  border: 2px solid #bff0cf;
  border-radius: 12px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.01);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: 2px solid #6fd6ff;
  }

  transition: all 0.2s ease-in-out;
`;

const Total = styled.div`
  display: flex;
  height: 75px;
`;

const Checkout = styled.div`
  width: 80%;
  height: 50px;
  border: none;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  background: #bff0cf;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
  text-transform: uppercase;
  font-size: 20px;
  padding-top: 2px;
  margin: 30px auto;

  &:hover {
    transform: scale(1.03);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  transition: all 0.3s ease-in-out;
`;

const Exit = styled.div`
  width: 20px;
  height: 15px;
  padding: 5px 5px 0px 0px;
`;

export default Order;
