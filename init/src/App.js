import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const pixel = keyframes`
    0% { left: 800px; }
    100% { left: -100px; }
`;

const Pixel = styled.div`
  position: absolute;
  top: 70px;
  width: 10px;
  height: 10px;
  background: purple;
  animation: ${pixel} 3s linear infinite;
`;

const MessageContainer = styled.div``;

class App extends Component {
  renderPixels() {
    return <Pixel />;
  }
  render() {
    return (
      <Container>
        Advent of code Dec 10th Calendar 2018
        <Pixel />
      </Container>
    );
  }
}

export default App;
