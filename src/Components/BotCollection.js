import React, { useState, useEffect } from "react";
import "./BotCollection.css";
import BotArmy from "./YourBotArmy";

export default function BotCollection() {
  const [bots, setBots] = useState([]);
  const [botArmy, setBotArmy] = useState([]);

  function getBots() {
    fetch(`http://localhost:8001/bots`)
      .then((res) => res.json())
      .then((json) => {
        setBots(json);
      });
  }

  function deletebot(botId) {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBots((prevBots) => prevBots.filter((bot) => bot.id !== botId));

        setBotArmy((prevArmy) => prevArmy.filter((bot) => bot.id !== botId));
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getBots();
    const botArmyFromStorage =
      JSON.parse(localStorage.getItem("botArmy")) || [];
    setBotArmy(botArmyFromStorage);
  }, []);

  function enlistBot(bot) {
    if (botArmy.find((addedbot) => addedbot.id === bot.id)) {
      return;
    }
    setBotArmy([...botArmy, bot]);
    localStorage.setItem("botArmy", JSON.stringify([...botArmy, bot]));
  }

  function removeBot(bot) {
    setBotArmy(botArmy.filter((b) => b.id !== bot.id));
    localStorage.setItem(
      "botArmy",
      JSON.stringify(botArmy.filter((b) => b.id !== bot.id))
    );
  }

  return (
    <div>
      <BotArmy botArmy={botArmy} removeBot={removeBot} />
      <h1>Available Bots</h1>
      <div className="bot-grid">
        {bots.map((bot) => (
          <div className="bot-card" key={bot.id} onClick={() => enlistBot(bot)}>
            <img src={bot.avatar_url} alt="Bot Avatar" />
            <h3>{bot.name}</h3>
            <h4 style={{fontSize:"xx-small"}}> {bot.catchphrase}</h4>
            <h4> Class: {bot.bot_class}</h4>
              <div style={{display:"flex",gap:"10px"}}>

             <p> <img src="https://img.icons8.com/ios/50/null/heart-with-pulse--v1.png"style={{width:"22px"}}/>{bot.health}</p>            
              <p><img src="https://img.icons8.com/ios-filled/50/null/assault-rifle.png"style={{width:"22px"}}/> {bot.damage}</p>              
              <p><img src="https://img.icons8.com/pastel-glyph/64/null/security-shield.png"style={{width:"22px"}}/>{bot.armor}</p>            
           </div>
            <button onClick={() => deletebot(bot.id)} className="delete-button">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
