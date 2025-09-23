import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Typed from "typed.js";
import { Intro } from "../components/IntroBrush/Intro";
import Angel from "../public/icons/AngleDuble.svg";
import Logo from "../public/logo2.png";

import "../components/BrushContainer/brushContainer.css";
import "../components/IntroBrush/intro.css";
import "../components/Flower/flower.css";

export default function BrushContainer() {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [displayRestart, setDisplayRestart] = useState(false);

  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        // "А жінка буває на осінь так схожа<br> То тиха й привітна, а то непогожа,<br> То скропить сльозою, то сонцем засвітить,<br> То прагне зими, то вертається в літо.",
        "Hi, my name is Alla,<br> I love to create art<br> for myself and people ",
      ],
      typeSpeed: 70,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="card">
      <Link to="/">
        <button className="return-anim-cont">
          <img
            src={Angel}
            alt="Angel Icon"
            width="24"
            height="24"
            className="return-icon"
          />
          <i className="return-anim-icon"></i>
        </button>
      </Link>
      <button
        className="restart-anim-cont"
        onClick={() => {
          setAnimationPlayed(false);
          setDisplayRestart(!displayRestart);
        }}
      >
        <img
       
          src={Logo}
          alt="Angel Icon"
          width="24"
          height="24"
          className="bar-icon"
        />
        <i className="restart-anim-icon"></i>
      </button>
      <div className="content-container">
        <div className="flower-text-wrapper">
          <Intro
            animationPlayed={animationPlayed}
            setAnimationPlayed={setAnimationPlayed}
            displayRestart={displayRestart}
          />

          <div className="text-container">
            <span className="text-wrapper" ref={el} />
          </div>
        </div>
      </div>
    </div>
  );
}
