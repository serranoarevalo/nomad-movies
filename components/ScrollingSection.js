import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";

const Container = styled.View``;

export default ({ title, items }) => {
  return (
    <Container>
      <SectionTitle title={title} />
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
