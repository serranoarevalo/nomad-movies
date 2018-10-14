import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components";
import Axios from "axios";
import LoadingContainer from "../components/LoadingContainer";
import { apiImage } from "../apiCall";
import MovieCover from "../components/MovieCover";
import { LinearGradient } from "expo";
import { GREY_COLOR } from "../colors";
import apiCall from "../apiCall";
import { formatDate } from "../config";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: black;
  padding-bottom: 50px;
`;

const Backdrop = styled.Image`
  height: ${height / 3};
  width: ${width};
`;

const Cover = styled.View`
  margin-top: -150px;
  margin-bottom: 25px;
`;

const CoverContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const CoverColumn = styled.View`
  margin-left: 20px;
  margin-bottom: 10px;
  width: 90%;
`;

const Title = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-right: 20px;
  width: 80%;
`;

const Small = styled.Text`
  font-size: 12px;
  color: ${GREY_COLOR};
  margin-bottom: 10px;
`;

const Section = styled.View`
  padding: 0 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  color: ${GREY_COLOR};
  font-weight: 600;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: ${GREY_COLOR};
  width: 90%;
`;

const Genres = styled.View`
  flex-direction: row;
  width: 90%;
`;

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { coverUrl, overview, posterUrl, rating, title, id, isMovie }
        }
      }
    } = props;
    this.state = {
      id,
      isMovie,
      loading: true,
      coverUrl,
      overview,
      posterUrl,
      rating,
      title
    };
  }
  static navigationOptions = ({ navigation }) => {
    const {
      state: {
        params: { title }
      }
    } = navigation;
    return {
      title
    };
  };
  componentDidMount = async () => {
    const { id, isMovie } = this.state;
    if (isMovie) {
      try {
        const {
          data: {
            backdrop_path,
            original_title,
            overview,
            vote_average,
            genres,
            poster_path,
            spoken_languages,
            release_date,
            runtime,
            status
          }
        } = await Axios.get(
          apiCall(`movie/${id}`, "append_to_response=videos")
        );
        this.setState({
          posterUrl: backdrop_path,
          coverUrl: poster_path,
          title: original_title,
          overview,
          rating: vote_average,
          genres,
          loading: false,
          spokenLanguages: spoken_languages,
          releaseDate: release_date,
          runtime,
          status
        });
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
    } else {
      try {
        const {
          data: {
            backdrop_path,
            genres,
            original_name,
            poster_path,
            overview,
            vote_average,
            first_air_date,
            last_air_date,
            number_of_episodes,
            number_of_seasons,
            status
          }
        } = await Axios.get(apiCall(`tv/${id}`, "append_to_response=videos"));
        this.setState({
          posterUrl: backdrop_path,
          coverUrl: poster_path,
          genres,
          overview,
          rating: vote_average,
          title: original_name,
          firstAirDate: first_air_date,
          lastEpisode: last_air_date,
          episodeNumber: number_of_episodes,
          seasonNumber: number_of_seasons,
          status,
          loading: false
        });
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
    }
  };
  render() {
    const {
      loading,
      coverUrl,
      overview,
      posterUrl,
      rating,
      title,
      genres,
      spokenLanguages,
      releaseDate,
      isMovie,
      runtime,
      firstAirDate,
      lastEpisode,
      episodeNumber,
      seasonNumber,
      status
    } = this.state;
    return (
      <Container>
        <Backdrop source={{ uri: apiImage(posterUrl, 500) }} />
        <Cover>
          <LinearGradient
            colors={["transparent", "black"]}
            start={Platform.select({
              ios: [0, 0]
            })}
            end={Platform.select({
              ios: [0, 0.5],
              android: [0, 0.9]
            })}
            style={{ paddingHorizontal: 20 }}
          >
            <CoverContainer>
              <MovieCover imageUrl={apiImage(coverUrl)} />
              <CoverColumn>
                <Title>{title}</Title>
                <Small>
                  ⭐️ {rating}
                  /10
                </Small>
                {genres ? (
                  <Genres>
                    {genres.map((genre, index) => (
                      <Small key={genre.id}>
                        {index === genres.length - 1
                          ? genre.name
                          : `${genre.name}, `}
                      </Small>
                    ))}
                  </Genres>
                ) : null}
              </CoverColumn>
            </CoverContainer>
          </LinearGradient>
        </Cover>
        {overview ? (
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <Text>{overview}</Text>
          </Section>
        ) : null}
        {isMovie ? (
          <React.Fragment>
            {spokenLanguages ? (
              <Section>
                <SectionTitle>Languages</SectionTitle>
                {spokenLanguages.map(lang => (
                  <Text key={lang.iso_639_1}>{lang.name}</Text>
                ))}
              </Section>
            ) : null}
            {releaseDate ? (
              <Section>
                <SectionTitle>Release Date</SectionTitle>
                <Text>{formatDate(releaseDate)}</Text>
              </Section>
            ) : null}
            {runtime ? (
              <Section>
                <SectionTitle>Runtime</SectionTitle>
                <Text>{runtime} minutes</Text>
              </Section>
            ) : null}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {firstAirDate ? (
              <Section>
                <SectionTitle>First Aired Episode</SectionTitle>
                <Text>{formatDate(firstAirDate)}</Text>
              </Section>
            ) : null}
            {lastEpisode ? (
              <Section>
                <SectionTitle>Latest Aired Episode</SectionTitle>
                <Text>{formatDate(lastEpisode)}</Text>
              </Section>
            ) : null}
            {episodeNumber ? (
              <Section>
                <SectionTitle>Total Episodes</SectionTitle>
                <Text>{episodeNumber}</Text>
              </Section>
            ) : null}
            {seasonNumber ? (
              <Section>
                <SectionTitle>Total Seasons</SectionTitle>
                <Text>{seasonNumber}</Text>
              </Section>
            ) : null}
          </React.Fragment>
        )}
        {status ? (
          <Section>
            <SectionTitle>Status</SectionTitle>
            <Text>{status}</Text>
          </Section>
        ) : null}
        {loading ? <LoadingContainer /> : null}
      </Container>
    );
  }
}
