import React from 'react';
import styled from 'styled-components';

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Contact = styled.div`
  width: 175px;
  height: 50px;
  margin: 50px 0px;
  margin-right: -500px;
  border-radius: 18px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
`

const HeroBackground = styled.div`
  width: 650px;
  height: 450px;
  margin-top: 50px;
  border-radius: 38px;
  background: #f2f2f2;
  box-shadow: 7px 7px 9px #d7d7d7, -7px -7px 9px #ffffff;
`

function App() {
  return (
    <AppDiv>
      <Contact>

      </Contact>
      <HeroBackground>

      </HeroBackground>
    </AppDiv>
  );
}

export default App;
