const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "verifycreate",
    description: "Create the Verify Message",
    slash: false,
    userRequiredPermissions: "ADMINISTRATOR",
    run: async({client, respond}) => {
      let embed = new MessageEmbed()
      embed.setAuthor(`${client.info.name} | Verify Module`, client.info.logo)
      embed.setDescription(`**בכדי לצפות בשרת יש לבצע אימות על ידי לחיצה על** \`✅\` \n\n שימו לב כי קראתם והסכמתם עם החוקים של השרת!`)
      embed.setColor(client.info.color)
      embed.setFooter(client.info.credit)
      
      let button = new MessageButton()
      button.setLabel("Verify")
      button.setEmoji("✅")
      button.setStyle("grey")
      button.setID("verifybtn")

      respond({
        content: embed,
        inlineReply: false,
        components: new MessageActionRow().addComponent(button)
      })
  }
};