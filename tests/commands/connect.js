const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "ip",
    aliases: ["connect", "address"],
    description: "Whitelist Only Command",
    channelOnly: ["856842243016622110"],
    slash: false,
    run: async({client, respond}) => {
        let embed = new MessageEmbed()
        embed.setColor(client.info.color)
        embed.setAuthor(`${client.info.name} | Whitelisted Module`, client.info.logo)
        embed.setThumbnail(client.info.logo)
        embed.setDescription(`Direct Connect : [CFX Link](https://cfx.re/join/${client.info.ipaddress})
        \n FiveM : \`${client.info.ipaddress}\`
        \n TeamSpeak : \`${client.info.tsaddress}\`
        `)
        embed.setFooter(client.info.credit)
        respond({
          content: embed,
          inlineReply: false
        })
    }
  };