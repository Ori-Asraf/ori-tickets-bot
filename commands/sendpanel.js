const { MessageEmbed } = require("discord.js")
const { MessageButton, MessageActionRow } = require("gcommands")

module.exports = {
  name: "sendpanel",
  description: "Send panel cmd",
  slash: false,
  userRequiredPermissions: "ADMINISTRATOR",
  run: async ({ client, respond }) => {
    let embed = new MessageEmbed()
      .setAuthor(`Ticket System`, logo)
      .setDescription("Press on 📨 to open a ticket ")
      .setColor(defcolor)
      .setFooter(credit)

    let button = new MessageButton()
      .setLabel("Open")
      .setEmoji("📨")
      .setStyle("grey")
      .setID("support_ticket_create")

    respond({
      content: embed,
      inlineReply: false,
      components: new MessageActionRow().addComponent(button),
    })
  },
}
