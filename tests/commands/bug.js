const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "bug",
    description: "Report a bug in bugs channel",
    slash: false,
    run: async({client, message}) => {
            //message.delete()
            if(message.channel.id == client.server.bugwrite) {
                const args = message.content.substring(client.info.prefix.length).split(" ").slice(1)
              if(args == '') return message.channel.send(`<@${message.author.id}> You cannot send an empty report!`);
                const FeedEmbed = new MessageEmbed()
                FeedEmbed.setColor(client.info.color)
                FeedEmbed.setAuthor(message.author.username, message.author.displayAvatarURL())
                FeedEmbed.setThumbnail(message.author.displayAvatarURL())
                FeedEmbed.setDescription(`${args.join(" ")}`)
                FeedEmbed.setFooter(client.info.credit)
                message.guild.channels.cache.get(client.server.bugchat).send(FeedEmbed)
        
            } else {
                message.reply('You must use the channel for this command!') 
            }
    }
};