import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewMovie from "./NewMovie";
import OcheMovie from "./OchuMovie";

function List() {
  return (
    <div className="listWrap webSize">
      <h5 className="cateTitle">New</h5>
      {/* <NewMovie></NewMovie> */}
      <h5 className="cateTitle marT_20">오영추</h5>
      {/* <OcheMovie></OcheMovie> */}
    </div>
  );
}

export default List;
