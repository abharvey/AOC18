// import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const pixel = props => keyframes`
    0% { left: ${props.xStart}px; top: ${props.yStart}px; }
    100% { 
        left: ${props.xEnd}px; top: ${props.yEnd}px;
    }
`;

const Pixel = styled.div`
  position: absolute;
  top: ${props => props.yStart}px;
  left: ${props => props.xStart}px;
  width: 1px;
  height: 1px;
  background: purple;
  animation: ${props => pixel(props)} 60s linear infinite;
`;

export default Pixel;

/**
 * Position: [x, y]
 * Velocity: [x. y]
 */
