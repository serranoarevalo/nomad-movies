import React from "react";
import Axios from "axios";
import { Dimensions, View } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import LoadingContainer from "../components/LoadingContainer";
import apiCall from "../apiCall";
import SliderPoster from "../components/SliderPoster";
import ScrollingSection from "../components/ScrollingSection";
import Movie from "../components/Movie";
import SectionTitle from "../components/SectionTitle";
import MovieDetailed from "../components/MovieDetailed";

const { width, height } = Dimensions.get("screen");

const SLIDE_HEIGHT = height / 3;

const Container = styled.ScrollView`
  background-color: black;
`;

const RowContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default class MoviesScreen extends React.Component {
  state = {
    loading: true,
    nowPlaying: [],
    popularMovies: [],
    upcoming: []
  };
  componentDidMount = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await Axios.get(apiCall("movie/popular", "language=en-US&page=1"));
      const {
        data: { results: popularMovies }
      } = await Axios.get(
        apiCall("movie/now_playing", "language=ko&page=2&region=kr")
      );
      const {
        data: { results: upcoming }
      } = await Axios.get(apiCall("movie/upcoming", "page=2"));
      this.setState({
        nowPlaying,
        popularMovies,
        upcoming,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading, nowPlaying, popularMovies, upcoming } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return (
        <Container>
          <Swiper
            height={SLIDE_HEIGHT}
            showsPagination={false}
            autoplay={true}
            autoplayTimeout={5}
          >
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
                    id={movie.id}
                  />
                </View>
              ))}
          </Swiper>
          <RowContainer>
            <ScrollingSection
              title={"Popular Movies"}
              items={popularMovies
                .filter(movie => movie.poster_path)
                .map(movie => (
                  <Movie
                    key={movie.id}
                    coverUrl={movie.poster_path}
                    rating={movie.vote_average}
                    title={movie.title}
                    id={movie.id}
                  />
                ))}
            />
          </RowContainer>
          <RowContainer>
            <SectionTitle title={"Coming Soon"} />
            {upcoming.filter(movie => movie.poster_path).map(movie => (
              <MovieDetailed
                key={movie.id}
                coverUrl={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                overview={movie.overview}
                id={movie.id}
              />
            ))}
          </RowContainer>
        </Container>
      );
    }
  }
}
