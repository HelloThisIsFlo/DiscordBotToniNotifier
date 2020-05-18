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

client.on("presenceUpdate", (oldPresence, newPresence) => {
  const isFlorian = newPresence.user.username === config.username.florian;
  if (!isFlorian) return;

  const hasPlayingActivity = (presence) =>
    presence.activities.length !== 0 &&
    presence.activities[0].type === "PLAYING";

  const isPlaying = hasPlayingActivity(newPresence);
  const wasPlaying = hasPlayingActivity(oldPresence);

  if (isPlaying) {
    const gameTitle = newPresence.activities[0].name;
    notifyStartedGame(gameTitle);
  } else if (wasPlaying) {
    const gameTitle = oldPresence.activities[0].name;
    notifyStoppedGame(gameTitle);
  }
});

client.login(secrets.botToken).then(() => {
  console.log("Logged in");
});

function notifyStartedGame(gameTitle) {
  sendMessageToToni(
    `I'm playing **${gameTitle}**. Ping me on discord if you want to join 😊`
  );
}

function notifyStoppedGame(gameTitle) {
  sendMessageToToni(`I stopped playing **${gameTitle}**. Another time 🙂`, false);
}

function sendMessageToToni(msg, notify=true) {
  const toniTag = notify ? `<@${config.userId.toni}>` : `toni`
  const msgWithMention = `Hey ${toniTag}, ${msg}`;
  gameNotificationsChannel.send(msgWithMention);
  console.log("Msg sent: " + msgWithMention);
}
