import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { apiImage } from "../apiCall";
import { GREY_COLOR } from "../colors";

const Touchable = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  margin-right: 25px;
  width: 80px;
  align-items: center;
`;

const Cover = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  color: white;
  text-align: center;
  margin-bottom: 10px;
  height: 20px;
`;

const Score = styled.Text`
  color: ${GREY_COLOR};
  font-size: 10px;
`;

export default ({ coverUrl, title, rating }) => (
  <Touchable>
    <Container>
      <TouchableOpacity>
        <Cover source={{ uri: apiImage(coverUrl) }} />
      </TouchableOpacity>
      <Title>{title.length > 8 ? `${title.substring(0, 8)}...` : title}</Title>
      <Score>
        ⭐️ {rating}
        /10
      </Score>
    </Container>
  </Touchable>
);
