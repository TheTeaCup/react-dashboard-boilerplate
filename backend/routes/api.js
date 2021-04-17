var express = require('express');
var router = express.Router();
const Discord = require("discord.js");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: process.env.ID,
  clientSecret: process.env.secret
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    api: "is online and running"
  })
});

router.get(
    "/callback",

    async (req, res) => {
      try {
        let code = req.query.code;
        if (!code) return res.json({error: true, message: "no code"});

        let redirect = req.query.redirect;
        if (!redirect) return res.json({error: true, message: "no redirect"});

        let info = await oauth.tokenRequest({
          clientId: process.env.ID,
          clientSecret: process.env.secret,
          redirectUri: redirect + "/callback",

          code: code,
          scope: "identify",
          grantType: "authorization_code"
        });

        let data = {
          user: null
        };

        await oauth.getUser(info.access_token).then(async userInfo => {

          data.user = userInfo;

          res.send(data);

        });
      } catch (e) {
        console.log(e)
        return res.json({error: true, message: e});
      }
    }
);

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
