import PropTypes from "prop-types";
import "./intro.css";

import { Flower } from "../Flower/Flower";

export function Intro(props) {

  return (
    <div className="intro-cont">
      <Flower
        setAnimationPlayed={props.setAnimationPlayed}
        animationPlayed={props.animationPlayed}
        displayRestart={props.displayRestart} // Передаємо стан далі
      />
    </div>
  );
}
Intro.propTypes = {
  setAnimationPlayed: PropTypes.func.isRequired,
  animationPlayed: PropTypes.bool.isRequired,
  displayRestart: PropTypes.bool.isRequired,
};