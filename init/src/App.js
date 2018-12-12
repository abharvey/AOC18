import React, { Component } from "react";
import styled from "styled-components";

import Pixel from "./Pixel";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1000px;
  height: 1000px;
`;

const getInput = () => {
  return fetch("/input").then(res => res.json());
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixels: []
    };
  }

  componentDidMount() {
    getInput().then(input => {
      this.setState({ pixels: input.pixels });
    });
  }

  renderPixel = pixel => {
    return <Pixel />;
  };

  renderPixels() {
    return this.state.pixels.map(this.renderPixel);
  }

  render() {
    console.log(this.state.pixels);
    return (
      <Container>
        Advent of code Dec 10th Calendar 2018
        <MessageContainer>
          <Pixel />
        </MessageContainer>
      </Container>
    );
  }
}

export default App;
