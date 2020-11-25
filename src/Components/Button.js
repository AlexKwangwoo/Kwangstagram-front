import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const ContainerSmall = styled.button`
  width: 25%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const ContainerVerySmall = styled.button`
  width: 12%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 400;
  background-color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  cursor: pointer;
  &: focus {
    outline: 0;
  }
`;

const Button = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

export const ButtonVerySmall = ({ text, onClick }) => (
  <ContainerVerySmall onClick={onClick}>{text}</ContainerVerySmall>
);

export const ButtonSmall = ({ text, onClick }) => (
  <ContainerSmall onClick={onClick}>{text}</ContainerSmall>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
