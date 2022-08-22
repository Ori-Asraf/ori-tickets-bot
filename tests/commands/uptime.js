const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "uptime",
    description: "Checks the bot uptime counter",
    slash: false,
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, respond}) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        let embed = new MessageEmbed()
        embed.setColor(client.info.color)
        embed.setAuthor(`${client.info.name} | Uptime Module`, client.info.logo)
        embed.setThumbnail(client.info.logo)
        embed.setDescription(`Current Uptime : \n\`\`\`Days : ${days} | Hours : ${hours} | Minutes : ${minutes} | Seconds : ${seconds}\`\`\``)
        embed.setTimestamp()
        embed.setFooter(client.info.credit)
        respond({
          content: embed,
          inlineReply: false
        })
    }
  };