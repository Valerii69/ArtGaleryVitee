import { useState } from "react";

import IconChat from "../../../public/icons/icon-chat.svg";
import Telegram from "../../../public/Images/telegram.png";
import Viber from "../../../public/Images/viber.png";
import Whatsapp from "../../../public/Images/whatsapp.png";
import Angel from "../../../public/icons/AngleDuble.svg";
import "./contactButton.css";

export function ContactButton() {
  const [active, setActive] = useState(false);
  // console.log(active);

  return (
    <div className={`buttonSticky ${active ? "active" : ""}`}>
      <button
        className="buttonStickyChat"
        onClick={() => setActive((prev) => !prev)}
      >
        <img src={IconChat} alt="chat" width={32} height={32} />
      </button>

      <div className="contactWidgetButtons">
        <a
          href="https://t.me/+38672455518"
          id="contactWidgetTelegram"
          title="Telegram"
          target="_blank"
          aria-label="To telegram"
        >
          <img
            src={Telegram}
            alt="telegram"
            loading="lazy"
            width={23}
            height={23}
          />
        </a>
        <a
          href="#"
          id="contactWidgetViber"
          title="Viber"
          target="_blank"
          aria-label="To viber"
        >
          <img src={Viber} alt="viber" loading="lazy" width={23} height={23} />
        </a>
        <a
          href="#"
          id="contactWidgetWhatsapp"
          title="WhatsApp"
          target="_blank"
          aria-label="To whatsapp"
        >
          <img
            src={Whatsapp}
            alt="whatsapp"
            loading="lazy"
            width={23}
            height={23}
          />
        </a>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="returnScroll"
      >
        <img
          src={Angel}
          alt="Angel Icon"
          width="24"
          height="24"
          className="return-icon"
        />
        {/* <i className="return-anim-icon"></i> */}
      </button>
    </div>
  );
}
