import React from "react";
import Axios from "axios";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";
import apiCall from "../apiCall";

const Container = styled.View`
  background-color: black;
  flex: 1;
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
      } = await Axios.get(apiCall("tv/on_the_air", "language=en-US&page=1"));
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
      return <Container />;
    }
  }
}
