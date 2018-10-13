import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  margin-top: 50px;
`;

const Title = styled.Text`
  padding: 0px 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export default ({ title, items }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {items}
      </ScrollView>
    </Container>
  );
};
