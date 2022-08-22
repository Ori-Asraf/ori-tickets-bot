const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "ping",
    aliases: ["latency"],
    description: "Checks the bot currect latency.",
    slash: false,
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, respond}) => {
        let embed = new MessageEmbed()
        embed.setColor(client.info.color)
        embed.setAuthor(`${client.info.name} | Ping Module`, client.info.logo)
        embed.setThumbnail(client.info.logo)
        embed.setDescription(`Current Latency : \n\`\`\`${Math.round(client.ws.ping)} milliseconds\`\`\``)
        embed.setFooter(client.info.credit)

        respond({
          content: embed,
          inlineReply: false
        })
    }
  };