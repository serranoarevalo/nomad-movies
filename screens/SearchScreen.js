import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";

const Container = styled.View`
  background-color: black;
`;

export default class SearchScreen extends React.Component {
  state = {
    loading: true
  };
  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return <Container />;
    }
  }
}
