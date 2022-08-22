const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");
module.exports = {
    name: "memory",
    description: "Checks the bot memory usage",
    slash: false,
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, respond}) => {
	const analize = process.memoryUsage();
	var result = {}
	result.heapTotal = Math.round(analize['heapTotal'] / 1024 / 1024 * 100) / 100
	result.heapUsed = Math.round(analize['heapUsed'] / 1024 / 1024 * 100) / 100
	result.external = Math.round(analize['external'] / 1024 / 1024 * 100) / 100
	result.rss = Math.round(analize['rss'] / 1024 / 1024 * 100) / 100
	result.arrayBuffers = Math.round(analize['arrayBuffers'] / 1024 / 1024 * 100) / 100
        let embed = new MessageEmbed()
        embed.setColor(client.info.color)
        embed.setAuthor(`${client.info.name} | Memory Module`, client.info.logo)
        embed.setThumbnail(client.info.logo)
        embed.setDescription(`Current Usage : \n\`\`\`Total : ${result.heapTotal} MB | Used : ${result.heapUsed} MB | Rss : ${result.rss} MB | External : ${result.external} MB | Buffers : ${result.arrayBuffers} MB\`\`\``)
        embed.setTimestamp()
        embed.setFooter(client.info.credit)
        respond({
          content: embed,
          inlineReply: false
        })
    }
  };