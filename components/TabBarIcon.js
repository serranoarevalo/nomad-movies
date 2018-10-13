import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { INACTIVE_COLOR, TINT_COLOR } from "../colors";

export default ({ name, focused }) => (
  <Ionicons
    name={name}
    size={26}
    color={focused ? TINT_COLOR : INACTIVE_COLOR}
  />
);
