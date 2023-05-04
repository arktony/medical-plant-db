import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PlantGrid from "./PlantGrid";

const Home = () => {
  return (
    <>
      <Navbar />
      <PlantGrid />
      {/* <Link to="/admin">Admin</Link> */}
    </>
  );
};

export default Home;
