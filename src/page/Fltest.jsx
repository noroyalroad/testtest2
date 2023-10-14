import axios from "axios";
import React, { useEffect, useState } from "react";

function Fltest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api2/hello")
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Fltest;
