// import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const pixel = props => keyframes`
    0% { left: 800px; top: 500px; }
    100% { 
        left: -100px; top: 200px;
    }
`;

const computeDist = (pos, vel) => {};

const pixelTemp = props => keyframes`
    0% { left: ${props.xPos}px; top: ${props.yPos}px; }
    100% { 
        left: ${computeDist(props.xPos, props.xVel)}px; 
        top: ${computeDist(props.xPos, props.xVel)}px;
    }
`;

const Pixel = styled.div`
  position: absolute;
  top: 70px;
  width: 10px;
  height: 10px;
  background: purple;
  animation: ${props => pixel(props)} 3s linear infinite;
`;

export default Pixel;

/**
 * Position: [x, y]
 * Velocity: [x. y]
 */
