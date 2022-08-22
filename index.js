require("dotenv").config()
const Discord = require("discord.js")
const { GCommands } = require("gcommands")
const colors = require("colors")
const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "GUILD_MEMBER"],
})
const config = require("./config.json")
prefix = config.prefix
logo = config.logo
credit = config.credit
defcolor = config.default
client.tickets = {
  category: process.env.ticketCategory,
  closedCategory: process.env.ticketClosedCategory,
  archiveCategory: process.env.archiveCategory,
  claimedCategory: process.env.claimedCategory,
  moderatorRole: process.env.ticketModeratorRole,
}

client.once("ready", async () => {
  console.log(colors.green.bold("The script is being loaded"))
  console.log(colors.white.bold("+=+=+=+=+=++=+=+=+=+=++=+=+"))
  console.log(colors.cyan.bold("Bot is online!"))
  setInterval(() => {
    guild = client.guilds.cache.get(process.env.discordGuild)
    let count = guild.roles.cache.get(process.env.statsChannel).members
    if (guild) {
      client.user
        .setActivity(count.size + ` Members`, { type: `WATCHING` })
        .catch(console.error)
    }
  }, 1000 * 60 * 5)
})

client.on("ready", async () => {
  const GCommandsClient = new GCommands(client, {
    cmdDir: "commands/",
    eventDir: "events/",
    unkownCommandMessage: false,
    language: "english",
    slash: {
      slash: "both",
      prefix: "!",
    },
    defaultCooldown: 1,
  })
})

client.login(process.env.token)
