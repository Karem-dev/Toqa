import React from "react";
import Spline from "@splinetool/react-spline";
import Nav from './../components/Nav';

const Game = () => {
  return (
    <>
    <Nav/>
    <div style={{ width: "100%", height: "100vh", }}>
     <Spline
        scene="https://prod.spline.design/bHGidkfvV1yuLGLu/scene.splinecode" 
      />
    </div>
    </>
  );
};

export default Game;
