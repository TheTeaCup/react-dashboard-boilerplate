var express = require('express');
const passport = require("passport");
var router = express.Router();
const Discord = require("discord.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    api: "is online and running"
  })
});

router.post("/callback", passport.authenticate("discord", { failureRedirect: "/404" }), async (req, res) => {
   // console.log(req.user)
   await res.send(req.user);
});

// gets the servers a user has authorization to make changes in
router.post("/servers", async (req, res) => {
  let user = req.body;
  const perms = Discord.Permissions;
  let servers = [];
  if(!user) return res.send("unauthorized");

  if(user.guilds) {

    user.guilds.forEach(guild => { 
      const permsOnGuild = new perms(guild.permissions);
      if(!permsOnGuild.has("MANAGE_GUILD")) return; // not authorized to edit/invite to guild
      servers.push(guild)
    });

    await res.send({ servers: servers })

  } else {
    res.send({ servers: null })
  }

});

module.exports = router;
