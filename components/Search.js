import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components";
import { GREY_COLOR, INACTIVE_COLOR } from "../colors";

const { width, height } = Dimensions.get("window");

const Input = styled.TextInput`
  background-color: ${Platform.OS === "ios" ? INACTIVE_COLOR : "black"};
  width: ${Platform.OS === "ios" ? width - 100 : width - 10};
  padding: 5px;
  font-size: 16px;
  margin-left: ${Platform.OS === "ios" ? 0 : "10px"};
  border-radius: 5px;
  color: white;
`;

export default ({ value, onChange, onSubmitEditing }) => (
  <Input
    value={value}
    onChangeText={onChange}
    placeholder="Search"
    underlineColorAndroid={"black"}
    returnKeyType={"search"}
    onSubmitEditing={onSubmitEditing}
  />
);
