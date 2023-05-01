
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
                <h4 style={{fontSize:"xx-small"}}> {bot.catchphrase}</h4>
                <h4> Class: {bot.bot_class}</h4>
              <div style={{display:"flex",gap:"10px"}}>

              <p> <img src="https://img.icons8.com/ios/50/null/heart-with-pulse--v1.png"style={{width:"22px"}}/>{bot.health}</p>            
              <p><img src="https://img.icons8.com/ios-filled/50/null/assault-rifle.png"style={{width:"22px"}}/> {bot.damage}</p>              
              <p><img src="https://img.icons8.com/pastel-glyph/64/null/security-shield.png"style={{width:"22px"}}/>{bot.armor}</p>         
           </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
