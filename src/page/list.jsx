import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewMovie from "../new/NewMovie 2";
import Suggestion from "../o0chu/Suggestion";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";
// import { auth } from "../_actions/user_action";
import { useDispatch } from "react-redux";
import Auth from "../hoc/auth";
import ScrollToTopButton from "../scrolltop/ScrolltoptoButton";

// import OcheMovie from "./OchuMovie";

function List() {
  return (
    <div>
      <Header />
      <div className="listWrap webSize">
        <h5 className="cateTitle">New</h5>
        <NewMovie></NewMovie>
        <h5 className="cateTitle marT_20">오영추</h5>
        <Suggestion />
        <ScrollToTopButton />
      </div>
      <Footer />
    </div>
  );
}

export default Auth(List, true);
