import React from "react";
import styled from "styled-components";

const Title = styled.Text`
  padding: 0px 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export default ({ title }) => <Title>{title}</Title>;
