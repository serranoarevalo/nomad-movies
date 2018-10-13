import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default ({ name, focused }) => (
  <Ionicons name={name} size={26} color={focused ? "white" : "#7f8c8d"} />
);
