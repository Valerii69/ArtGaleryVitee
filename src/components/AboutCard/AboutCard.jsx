import "./aboutCard.css";

import firstImage from "../../public/Images/yellow-pink.png";
import secondImage from "../../public/Images/blue.png";
import thirdImage from "../../public/Images/gold.png";

export function AboutCard() {
  return (
    <div className="brush-container">
      <img id="first" className="brush-about" src={firstImage} alt="first" />
      <img id="second" className="brush-about" src={secondImage} alt="second" />
      <img id="third" className="brush-about" src={thirdImage} alt="third" />
    </div>
  );
}
