import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { apiImage } from "../apiCall";
import { LinearGradient } from "expo";

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
  bottom: 0;
`;

const Title = styled.Text`
  font-size: 28px;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Subtitle = styled.Text`
  color: white;
  font-size: 15px;
`;

export default ({ posterUrl, title, overview = "" }) => (
  <Slide>
    <SlidePoster
      source={{
        uri: apiImage(posterUrl, 500)
      }}
      resizeMode={"cover"}
    />

    <LinearGradient
      colors={["rgba(0, 0, 0, 0.1)", "black"]}
      start={[0, 0]}
      end={[0, 0.8]}
      style={{
        zIndex: 2,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: SLIDE_HEIGHT
      }}
    />

    <PosterContent>
      <Title>{title}</Title>
      <Subtitle>
        {overview && overview.substring(0, 140)}
        ...
      </Subtitle>
    </PosterContent>
  </Slide>
);
