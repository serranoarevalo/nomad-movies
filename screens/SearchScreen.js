import Axios from "axios";
import { Alert } from "react-native";
import React from "react";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";
import Search from "../components/Search";
import Movie from "../components/Movie";
import apiCall from "../apiCall";
import ScrollingSection from "../components/ScrollingSection";

const Container = styled.ScrollView`
  background-color: black;
`;

const RowContainer = styled.View`
  margin-top: 40px;
`;

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Search
          value={navigation.getParam("value", "")}
          onChange={navigation.getParam("onChange", null)}
          onSubmitEditing={navigation.getParam("onSubmitEditing", null)}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    props.navigation.setParams({
      onChange: this._onChange,
      value: this.state.searching,
      onSubmitEditing: this._onSubmitEditing
    });
  }
  state = {
    loading: false,
    searching: "",
    movieResults: [],
    tvResults: []
  };
  render() {
    const { loading, searching, movieResults, tvResults } = this.state;
    if (loading) {
      return <LoadingContainer />;
    } else {
      return (
        <Container>
          {movieResults.length > 0 ? (
            <RowContainer>
              <ScrollingSection
                title={"Movies"}
                items={movieResults
                  .filter(movie => movie.poster_path)
                  .map(movie => (
                    <Movie
                      key={movie.id}
                      coverUrl={movie.poster_path}
                      rating={movie.vote_average}
                      title={movie.title}
                    />
                  ))}
              />
            </RowContainer>
          ) : null}
          {tvResults.length > 0 ? (
            <RowContainer>
              <ScrollingSection
                title={"TV Shows"}
                items={tvResults.filter(show => show.poster_path).map(show => (
                  <Movie
                    key={show.id}
                    coverUrl={show.poster_path}
                    rating={show.vote_average}
                    title={show.original_name}
                  />
                ))}
              />
            </RowContainer>
          ) : null}
        </Container>
      );
    }
  }
  _onChange = text => {
    const { navigation } = this.props;
    this.setState({
      searching: text
    });
    navigation.setParams({ value: text });
  };
  _onSubmitEditing = async () => {
    const { searching } = this.state;
    if (searching !== null && searching !== "") {
      this.setState({ loading: true, movieResults: [], tvResults: [] });
      try {
        const encodedSearching = encodeURIComponent(searching);
        const {
          data: { results: movieResults }
        } = await Axios.get(
          apiCall(
            "search/movie",
            `language=en-US&query=${encodedSearching}&page=1&include_adult=false`
          )
        );
        const {
          data: { results: tvResults }
        } = await Axios.get(
          apiCall(
            "search/tv",
            `language=en-US&query=${encodedSearching}&page=1`
          )
        );

        this.setState({
          loading: false,
          movieResults,
          tvResults
        });
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
    } else {
      Alert.alert("Can't search", "The search has to be longer...");
    }
  };
}
