import React from "react";
import Axios from "axios";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";
import apiCall from "../apiCall";
import ScrollingSection from "../components/ScrollingSection";
import Movie from "../components/Movie";
import SectionTitle from "../components/SectionTitle";
import MovieDetailed from "../components/MovieDetailed";

const Container = styled.ScrollView`
  background-color: black;
  flex: 1;
`;

const RowContainer = styled.View`
  margin-top: 30px;
`;

export default class SearchScreen extends React.Component {
  state = {
    loading: true,
    airingToday: [],
    topRated: [],
    airingThisWeek: []
  };
  componentDidMount = async () => {
    try {
      const {
        data: { results: airingToday }
      } = await Axios.get(apiCall("tv/airing_today", "language=en-US&page=1"));
      const {
        data: { results: topRated }
      } = await Axios.get(apiCall("tv/top_rated", "language=en-US&page=1"));
      const {
        data: { results: airingThisWeek }
      } = await Axios.get(apiCall("tv/on_the_air", "language=en-US&page=2"));
      this.setState({
        airingThisWeek,
        airingToday,
        topRated,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading, airingThisWeek, airingToday, topRated } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return (
        <Container>
          <RowContainer>
            <ScrollingSection
              title={"Airing Today"}
              items={airingToday.filter(show => show.poster_path).map(show => (
                <Movie
                  key={show.id}
                  coverUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                />
              ))}
            />
          </RowContainer>
          <RowContainer>
            <ScrollingSection
              title={"Airing this Week"}
              items={airingThisWeek
                .filter(show => show.poster_path)
                .map(show => (
                  <Movie
                    key={show.id}
                    coverUrl={show.poster_path}
                    title={show.original_name}
                    rating={show.vote_average}
                  />
                ))}
            />
          </RowContainer>
          <RowContainer>
            <SectionTitle title={"Top Rated"} />
            {topRated.filter(show => show.poster_path).map(show => (
              <MovieDetailed
                key={show.id}
                coverUrl={show.poster_path}
                title={show.original_name}
                overview={show.overview}
              />
            ))}
          </RowContainer>
        </Container>
      );
    }
  }
}
