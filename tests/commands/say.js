const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "say",
    description: "Send a message as the bot",
    slash: false,
    run: async({client, message}) => {
            const args = message.content.slice(client.info.prefix.length).trim().split(/ +/g);
            let reason = args.slice(1).join(' ');
            await message.delete()
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`<@${message.author.id}> Access Denied for this command!`);
            if(reason == '') return message.channel.send(`<@${message.author.id}> You cannot send an empty message!`);
            message.channel.send(reason)
    }
};