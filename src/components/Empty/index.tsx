import React from "react";
import { Container } from "@mui/material";

const Empty: React.FC = () => {
  return <Container sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '500px'
  }}>NO DATA</Container>;
};

export default Empty;
