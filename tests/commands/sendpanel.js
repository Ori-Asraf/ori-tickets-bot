const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "sendpanel",
    description: "Create the Ticket Panel Message",
    slash: false,
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, respond}) => {
      let embed = new MessageEmbed()
      embed.setAuthor(`${client.info.name} | Tickets Module`, client.info.logo)
      embed.setDescription(`**בכדי לפתוח טיקט יש ללחוץ על **\`📨\` \n\n ניתן לפתוח טיקט כל יום בין השעות 8:00 - 23:00 `)
      embed.setColor(client.info.color)
      embed.setFooter(client.info.credit)
      
      let button = new MessageButton()
      button.setLabel("Open")
      button.setEmoji("📨")
      button.setStyle("grey")
      button.setID("support_ticket_create")

      respond({
        content: embed,
        inlineReply: false,
        components: new MessageActionRow().addComponent(button)
      })
  }
};
