const Discord = require("discord.js");
const client = new Discord.Client();

const secrets = require("./secrets.json");
const config = {
  username: { florian: "ShockN745" },
  userId: { toni: "354642636277284864" },
  guildId: { awesomeTeam: "354642389866119178" },
  channelId: { gameNotifications: "711923905710915664" },
};

let gameNotificationsChannel;
const initGameNotificationsChannel = () => {
  const awesomeTeamGuild = client.guilds.resolve(config.guildId.awesomeTeam);
  gameNotificationsChannel = awesomeTeamGuild.channels.resolve(
    config.channelId.gameNotifications
  );
};

client.on("ready", initGameNotificationsChannel);

client.on("presenceUpdate", (_oldPresence, newPresence) => {
  const isFlorian = newPresence.user.username === config.username.florian;
  const isPlaying =
    newPresence.activities.length !== 0 &&
    newPresence.activities[0].type === "PLAYING";

  if (isFlorian && isPlaying) {
    const gameTitle = newPresence.activities[0].name;
    const msg = `Hey <@${config.userId.toni}>, I'm playing **${gameTitle}**. Ping me on discord if you want to join 😊`;
    gameNotificationsChannel.send(msg);
    console.log("Msg sent: " + msg);
  }
});

client.login(secrets.botToken).then(() => {
  console.log("Logged in");
});
