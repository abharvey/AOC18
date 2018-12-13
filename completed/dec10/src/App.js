import React, { Component } from "react";
import styled from "styled-components";

import Pixel from "./Pixel";

const Container = styled.div`
  width: 1000px;
  height: 1000px;
  max-width: 1000px;
  max-height: 1000px;
`;

const MessageContainer = styled.div`
  position: absolute;
  background-color: blanchedalmond;
  top: 100px;
  left: 100px;
  width: 800px;
  height: 800px;
  max-width: 800px;
  max-height: 800px;
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
    getInput().then(pixels => {
      this.setState({ pixels });
    });
  }

  renderPixel = i => pixel => {
    const key = `${i}-${pixel.xStart}`;

    return <Pixel {...pixel} key={key} />;
  };

  renderPixels() {
    return this.state.pixels.map((p, i) => this.renderPixel(i)(p));
  }

  render() {
    console.log(this.state.pixels);
    return (
      <Container>
        Advent of code Dec 10th Calendar 2018
        <MessageContainer>{this.renderPixels()}</MessageContainer>
      </Container>
    );
  }
}

export default App;
