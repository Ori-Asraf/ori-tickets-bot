const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "clear",
    description: "Clears chat messages.",
    slash: false,
    run: async({client, message}) => {
        const args = message.content.split(' ')[1]
        
            await message.delete();
      
            let NoAccess = new MessageEmbed()
            .setAuthor(`${client.info.name} | Clear Module`, client.info.logo)
            .setColor("#FF2800")
            .setDescription(`<@${message.author.id}> **You don't have access to this Command!**`)
            .setFooter(client.info.credit)
            .setTimestamp()
      
            if (!message.member.hasPermission('MANAGE_MESSAGES'))
                return message.channel.send(NoAccess).then(msg => {msg.delete({ timeout: 2500 })}).catch();
      
            if (!isNaN(args)) {
              let amount = 0;
              if (args === '1' || args === '0') {
                amount = 1;
              } else {
                amount = args;
                if (amount > 100) {
                  amount = 100;
                }
              }
              await message.channel.bulkDelete(amount, true).then((_message) => {
                let Embed = new MessageEmbed()
                .setAuthor(`${client.info.name} | Clear Module`, client.info.logo)
                .setColor(client.info.color)
                .setDescription(`Bot cleared \`${_message.size}\` messages`)
                .setFooter(client.info.credit)
                .setTimestamp()
                message.channel.send(Embed).then((sent) => {
                  setTimeout(function () {
                    sent.delete();
                  }, 2500);
                });
              });
      
            } else {
                let NoAmt = new MessageEmbed()
                .setAuthor(`${client.info.name} | Clear Module`, client.info.logo)
                .setColor("#FF2800")
                .setDescription(`<@${message.author.id}> **You must set the amount of message purge!**`)
                .setFooter(client.info.credit)
                .setTimestamp()
              message.channel.send(NoAmt).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                }, 2500);
              });
            }
        
    }
  };