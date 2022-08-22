const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "onlive",
    description: "Announce a live stream in streams channel",
    slash: false,
    run: async({client, message}) => {
            //message.delete()
            if(message.channel.id == client.server.WhitelistChat) {
                if(message.content.includes("https://www.you") || message.content.includes("https://you")) {
                    const args = message.content.substring(client.info.prefix.length).split(" ").slice(1)
                    if(args == '') return message.channel.send(`<@${message.author.id}> You cannot send an empty command!`);
                      const FeedEmbed = new MessageEmbed()
                      FeedEmbed.setColor("#ff5050")
                      FeedEmbed.setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871101327592292443/371903520_SOCIAL_ICONS_YOUTUBE.png")
                      FeedEmbed.setAuthor(message.author.username, message.author.displayAvatarURL())
                      FeedEmbed.setDescription(`<@${message.author.id}> עלה לשידור חי, כמו כן אתם מוזמנים להיכנס לשידור ולפרגן!`)
                      FeedEmbed.addField("Youtube link","[Click Here]("+ args +")")
                      message.guild.channels.cache.get(client.server.Onlive).send(FeedEmbed)
                      message.guild.channels.cache.get(client.server.Onlive).send("@here")
                } else {
                    message.reply("make sure the link is valid youtube video!")
                }
            } else {
                message.reply('You must use the channel for this command!') 
            }
    }
};