const Discord = require("discord.js")
require("dotenv").config();
const generateImage = require('./generateImage');

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

let bot = {
    client,
    prefix: "n.",
    owners: ["715064307309871104"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadEvents(bot, false);

client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);
client.loadCommands(bot, false);

client.on("messageCreate", (message) => {
    if (message.content === "hey") {
        message.reply("Hello User!");
    }
});

const welcomeChannelId = "989519691951267857";
client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})
client.login(process.env.TOKEN); 

module.exports = bot;
