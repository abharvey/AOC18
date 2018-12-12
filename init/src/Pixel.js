import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const pixel = keyframes`
    0% { left: 800px; top: 500px; }
    100% { left: -100px; top: 200px;}
`;

const Pixel = styled.div`
  position: absolute;
  top: 70px;
  width: 10px;
  height: 10px;
  background: purple;
  animation: ${pixel} 3s linear infinite;
`;

export default Pixel;

/**
 * Position: [x, y]
 * Velocity: [x. y]
 */
