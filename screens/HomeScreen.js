import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

export default class MoviesScreen extends React.Component {
  state = {
    loading: true
  };
  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return (
        <Container>
          <Text>Movies</Text>
        </Container>
      );
    }
  }
}
