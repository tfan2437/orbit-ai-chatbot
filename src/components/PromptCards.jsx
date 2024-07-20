import { assets } from "../assets/assets";

const PromptCards = () => {
  return (
    <>
      <div className="greet">
        <p>
          <span>Hello, Developer</span>
        </p>
        <p>How can I help you today?</p>
      </div>
      <div className="cards">
        <div className="card">
          <p>Suggest beautiful places to see on an upcomming road trip</p>
          <img src={assets.compass_icon} alt="" />
        </div>
        <div className="card">
          <p>Briefly summarize this concept: urban planning</p>
          <img src={assets.bulb_icon} alt="" />
        </div>
        <div className="card">
          <p>Brainstorm team bonding activities for our work retreat</p>
          <img src={assets.message_icon} alt="" />
        </div>
        <div className="card">
          <p>Improve the readability of the following code</p>
          <img src={assets.code_icon} alt="" />
        </div>
      </div>
    </>
  );
};

export default PromptCards;
