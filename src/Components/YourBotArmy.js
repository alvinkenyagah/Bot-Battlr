//DISPLAY ENLISTED BOTS

import React from "react";


export default function BotArmy({ botArmy, removeBot }) {
    
    return (
        <div>
          <h1>My Bot Army</h1>
          <div className="bot-grid">
            
            {botArmy.map((bot) => (
              <div className="bot-card" key={bot.id} onClick={() => removeBot(bot)}>
                <img src={bot.avatar_url} alt="Avatar" style={{width:'240px'}} />
                <h3>{bot.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }
