import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { apiImage } from "../apiCall";
import { LinearGradient } from "expo";
import { GREY_COLOR } from "../colors";

const { width, height } = Dimensions.get("window");

const SLIDE_HEIGHT = height / 3;

const Slide = styled.View`
  background-color: black;
  flex: 1;
  overflow: hidden;
  height: ${SLIDE_HEIGHT};
`;

const SlidePoster = styled.Image`
  height: ${SLIDE_HEIGHT};
  width: ${width};
  z-index: 2;
`;

const PosterContent = styled.View`
  padding: 20px;
  position: absolute;
  z-index: 3;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Subtitle = styled.Text`
  color: white;
  color: ${GREY_COLOR};
  font-size: 14px;
  margin-bottom: 10px;
`;

const Cover = styled.Image`
  height: 70%;
  width: 30%;
`;

const Content = styled.View`
  width: 80%;
  margin-left: 50px;
  flex: 1;
  align-items: flex-start;
`;

const Rating = styled.Text`
  color: white;
  margin-bottom: 10px;
  font-size: 12px;
`;

const Overlay = styled.View`
  z-index: 2;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: ${SLIDE_HEIGHT};
  background-color: rgba(0, 0, 0, 0.7);
`;

const Button = styled.TouchableOpacity`
  background-color: #e74c3c;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

export default ({ posterUrl, title, overview = "", coverUrl, rating }) => (
  <Slide>
    <SlidePoster
      source={{
        uri: apiImage(posterUrl, 500)
      }}
      resizeMode={"cover"}
    />
    <Overlay />
    <PosterContent>
      <Cover
        source={{
          uri: apiImage(coverUrl, 500)
        }}
        resizeMode={"contain"}
      />
      <Content>
        <Title>{title}</Title>
        <Rating>⭐️ {rating} / 10</Rating>
        <Subtitle>
          {overview && overview.substring(0, 140)}
          ...
        </Subtitle>
        <Button>
          <ButtonText>View details</ButtonText>
        </Button>
      </Content>
    </PosterContent>
  </Slide>
);
