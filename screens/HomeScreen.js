import React from "react";
import Axios from "axios";
import { Text } from "react-native";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";
import apiCall from "../apiCall";

const Container = styled.View`
  background-color: black;
  flex: 1;
`;

export default class MoviesScreen extends React.Component {
  state = {
    loading: true,
    nowPlaying: [],
    latestMovies: [],
    upcoming: []
  };
  componentDidMount = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await Axios.get(
        apiCall("movie/now_playing", "language=en-US&page=1&region=kr")
      );
      const {
        data: { results: latestMovies }
      } = await Axios.get(apiCall("movie/latest", "language=en-US"));
      const {
        data: { results: upcoming }
      } = await Axios.get(apiCall("movie/upcoming", "language=en-US&page=2"));
      this.setState({
        nowPlaying,
        latestMovies,
        upcoming,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
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
