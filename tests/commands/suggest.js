const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "suggest",
    description: "Suggest a suggestion in suggestions channel",
    slash: false,
    run: async({client, message}) => {
            //message.delete()
            if(message.channel.id == client.server.sugwrite) {
                const args = message.content.substring(client.info.prefix.length).split(" ").slice(1)
              if(args == '') return message.channel.send(`<@${message.author.id}> You cannot send an empty suggest!`);
                const FeedEmbed = new MessageEmbed()
                FeedEmbed.setColor(client.info.color)
                FeedEmbed.setAuthor(message.author.username, message.author.displayAvatarURL())
                FeedEmbed.setThumbnail(message.author.displayAvatarURL())
                FeedEmbed.setDescription(`${args.join(" ")}`)
                FeedEmbed.setFooter(`✅-Yes❎-No | ${client.info.credit}`, client.info.logo)
                message.guild.channels.cache.get(client.server.sugchat).send(FeedEmbed)
                    .then(embMessage => {
                    embMessage.react("✅");             
                    embMessage.react("❎");
                });
        
            } else {
                message.reply('You must use the channel for this command!') 
            }
    }
};