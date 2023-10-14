import React from "react";
import Header from "../nav/Header";
import { useParams } from "react-router-dom";
import Genresitem from "./Genresitem";
import Footer from "../footer/Footer";
import Auth from "../hoc/auth";
const Genreslist = () => {
  const { genres } = useParams();
  console.log(genres);
  return (
    <div>
      <Header />
      <Genresitem gen={genres} />
      <Footer />
    </div>
  );
};

export default Genreslist;
