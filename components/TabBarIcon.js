import React from "react";
import { Icon } from "expo";

export default ({ name, focused }) => (
  <Icon.Ionicons name={name} size={26} color={focused ? "white" : "#7f8c8d"} />
);
