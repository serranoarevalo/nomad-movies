import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components";
import LoadingContainer from "../components/LoadingContainer";
import { apiImage } from "../apiCall";
import MovieCover from "../components/MovieCover";
import { LinearGradient } from "expo";
import { GREY_COLOR } from "../colors";

const { width, height } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: black;
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
`;

const Title = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Score = styled.Text`
  font-size: 12px;
  color: ${GREY_COLOR};
`;

const Section = styled.View`
  padding: 0 20px;
`;

const SectionTitle = styled.Text`
  color: ${GREY_COLOR};
  font-weight: 600;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: ${GREY_COLOR};
  width: 90%;
`;

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { coverUrl, overview, posterUrl, rating, title }
        }
      }
    } = props;
    this.state = {
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
  render() {
    const {
      loading,
      coverUrl,
      overview,
      posterUrl,
      rating,
      title
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
                <Score>
                  ⭐️ {rating}
                  /10
                </Score>
              </CoverColumn>
            </CoverContainer>
          </LinearGradient>
        </Cover>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <Text>{overview}</Text>
        </Section>
      </Container>
    );
  }
}
