const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.content === "hey") {
        message.reply("Hello User!");
    }
});

const welcomeChannelId = "989519691951267857";
client.on("guildMemberAdd", (member) => {
    console.log(member);
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`)
})
client.login(process.env.TOKEN); 