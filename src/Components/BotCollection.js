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
            <p style={{fontWeight:"bold"}}>
              {/* {bot.catchphrase} */}
              Class: {bot.bot_class}
              <br />
              Health: {bot.health}
              <br />
              Damage: {bot.damage}
              <br />
              Armor: {bot.armor}
            </p>
            <button onClick={() => deletebot(bot.id)} className="delete-button">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
