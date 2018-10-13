import React from "react";
import styled from "styled-components";

const Image = styled.Image`
  width: 120px;
  height: 160px;
  margin-bottom: 10px;
  border-radius: 2.5px;
`;

export default ({ imageUrl }) => (
  <Image source={{ uri: imageUrl }} resizeMode={"contain"} />
);
