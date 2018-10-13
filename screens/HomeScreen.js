import React from "react";
import Axios from "axios";
import { Dimensions, View } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import LoadingContainer from "../components/LoadingContainer";
import apiCall from "../apiCall";
import SliderPoster from "../components/SliderPoster";

const { width, height } = Dimensions.get("window");

const SLIDE_HEIGHT = height / 3;

const Container = styled.ScrollView`
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
        apiCall("movie/now_playing", "language=en-US&page=1")
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
    const { loading, nowPlaying } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return (
        <Container>
          <Swiper height={SLIDE_HEIGHT} showsPagination={false} autoplay={true}>
            {nowPlaying
              .filter(movie => movie.backdrop_path && movie.poster_path)
              .map(movie => (
                <View style={{ flex: 1 }} key={movie.id}>
                  <SliderPoster
                    posterUrl={movie.backdrop_path}
                    title={movie.original_title}
                    overview={movie.overview}
                    coverUrl={movie.poster_path}
                    rating={movie.vote_average}
                  />
                </View>
              ))}
          </Swiper>
        </Container>
      );
    }
  }
}
