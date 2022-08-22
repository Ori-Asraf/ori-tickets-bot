const { MessageEmbed, MessageAttachment } = require("discord.js")
const { MessageButton, MessageActionRow } = require("gcommands/src")

module.exports = {
  name: "clickButton",
  once: false,
  run: async (client, button) => {
    await button.defer()

    let buttonMember = button.clicker.member
    let guild = button.guild

    if (button.id == "support_ticket_create") {
      let allChannels = client.channels.cache
        .filter((m) => m.type == "text" && m.name.includes("ticket-"))
        .map((m) => m.name.split("ticket-")[1])

      let already = allChannels.some((v) => buttonMember.user.id == v)
      if (already === true) {
        return buttonMember.send(
          `**Sorry, you already have a ticket. \n** \`Server : ${guild.name}\``
        )
      }
      let ticketChannel = await guild.channels.create(
        `ticket-${buttonMember.user.id}`,
        {
          type: "text",
          topic: `${buttonMember.user.username}'s ticket`,
          parent: client.tickets.category,
          permissionOverwrites: [
            {
              id: buttonMember.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
            {
              id: guild.roles.everyone,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: client.tickets.moderatorRole,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
          ],
        }
      )

      let supportEmbed = new MessageEmbed()
        .setAuthor(`System`, logo)
        .setColor(defcolor)
        .setDescription(
          "Support will be with you shortly.\nTo close this ticket react with :lock:"
        )
        .setFooter(credit)
        .setTimestamp()

      let supportButton = new MessageButton()
        .setLabel("")
        .setEmoji("🔒")
        .setStyle("gray")
        .setID(`ticket_close_${ticketChannel.id}`)

      let claimButton = new MessageButton()
        .setLabel("")
        .setEmoji("🎯")
        .setStyle("gray")
        .setID(`ticket_claim_${ticketChannel.id}`)

      ticketChannel.send({
        content: `${buttonMember.user} Welcome!`,
        embeds: supportEmbed,
        components: new MessageActionRow()
          .addComponent(supportButton)
          .addComponent(claimButton),
      })
      buttonMember.send(
        `**You opened a ticket. ${ticketChannel} \n** \`Server : ${guild.name}\``
      )
    }

    if (button.id == `ticket_close_${button.channel.id}`) {
      let ticketChannel = button.channel
      let createdBy =
        client.users.cache.get(ticketChannel.name.split("ticket-")[1]) ||
        client.users.cache.get(
          ticketChannel.name.split("ticket-claimed-")[1]
        ) ||
        client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

      let yes = new MessageButton()
        .setLabel("")
        .setEmoji("✅")
        .setStyle("gray")
        .setID(`ticket_close_yes_${buttonMember.user.id}`)
      let no = new MessageButton()
        .setLabel("")
        .setEmoji("❌")
        .setStyle("gray")
        .setID(`ticket_close_no_${buttonMember.user.id}`)

      let msg = await ticketChannel.send({
        content: `${buttonMember.user} Are you really sure to close the ticket?`,
        components: new MessageActionRow().addComponent(yes).addComponent(no),
      })
      let filter = (button) => buttonMember.user.id == button.clicker.user.id
      let collector = await ticketChannel.createButtonCollector(msg, filter, {
        max: 1,
        time: 60000,
        errors: ["time"],
      })

      collector.on("collect", (button) => {
        if (button.id == `ticket_close_yes_${button.clicker.user.id}`) {
          msg.delete()

          let closedEmbed = new MessageEmbed()
            .setAuthor(`System`, logo)
            .setColor(defcolor)
            .setDescription(
              `Ticket closed by ${button.clicker.user}\nTicket created by ${createdBy}\n\n🔓 Reopen Ticket\n❌ Delete Ticket\n📥 Archive Ticket\n📜 Transcript Ticket`
            )

          let reopen = new MessageButton()
            .setLabel("")
            .setID(`ticket_reopen_${ticketChannel.id}`)
            .setEmoji("🔓")
            .setStyle("gray")

          let deleteButton = new MessageButton()
            .setLabel("")
            .setID(`ticket_delete_${ticketChannel.id}`)
            .setEmoji("❌")
            .setStyle("gray")

          let archiveButton = new MessageButton()
            .setLabel("")
            .setID(`ticket_archive_${ticketChannel.id}`)
            .setEmoji("📥")
            .setStyle("gray")

          let transcriptButton = new MessageButton()
            .setLabel("")
            .setID(`ticket_transcript_${ticketChannel.id}`)
            .setEmoji("📜")
            .setStyle("gray")

          button.channel.edit({
            name: `ticket-closed-${createdBy}`,
            parentID: client.tickets.closedCategory,
            permissionOverwrites: [
              {
                id: createdBy.id,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: client.tickets.moderatorRole,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
          })

          button.channel.send({
            embeds: closedEmbed,
            components: new MessageActionRow()
              .addComponent(reopen)
              .addComponent(deleteButton)
              .addComponent(archiveButton)
              .addComponent(transcriptButton),
          })
        } else {
          msg.delete()
        }
      })
    }

    if (button.id == `ticket_reopen_${button.channel.id}`) {
      let ticketChannel = button.channel
      let createdBy =
        client.users.cache.get(ticketChannel.name.split("ticket-")[1]) ||
        client.users.cache.get(
          ticketChannel.name.split("ticket-claimed-")[1]
        ) ||
        client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

      let allMessages = await ticketChannel.messages.fetch()
      let systemMessages = allMessages.filter(
        (m) => m.embeds && m.author.id == client.user.id
      )
      systemMessages.forEach((msg) => {
        msg.delete()
      })

      let supportEmbed = new MessageEmbed()
        .setAuthor(`System`, logo)
        .setColor(defcolor)
        .setDescription(
          "Support will be with you shortly.\nTo close this ticket react with :lock:"
        )
        .setFooter(credit)
        .setTimestamp()

      let supportButton = new MessageButton()
        .setLabel("")
        .setEmoji("🔒")
        .setStyle("gray")
        .setID(`ticket_close_${ticketChannel.id}`)

      let claimButton = new MessageButton()
        .setLabel("")
        .setEmoji("🎯")
        .setStyle("gray")
        .setID(`ticket_claim_${ticketChannel.id}`)

      ticketChannel.edit({
        name: `ticket-${createdBy}`,
        parentID: client.tickets.category,
        permissionOverwrites: [
          {
            id: createdBy.id,
            allow: ["VIEW_CHANNEL"],
          },
          {
            id: guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: client.tickets.moderatorRole,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
          },
        ],
      })

      ticketChannel.send({
        content: `${createdBy} Welcome back!`,
        embeds: supportEmbed,
        components: new MessageActionRow()
          .addComponent(supportButton)
          .addComponent(claimButton),
      })
    }

    if (button.id == `ticket_delete_${button.channel.id}`) {
      let ticketChannel = button.channel

      let deleteEmbed = new MessageEmbed()
        .setAuthor(`System`, logo)
        .setColor(defcolor)
        .setDescription("Ticket will be deleted in 5s")

      ticketChannel.send({ embeds: deleteEmbed })
      setTimeout(() => {
        ticketChannel.delete()
      }, 5000)
    }

    if (button.id == `ticket_archive_${button.channel.id}`) {
      let ticketChannel = button.channel
      let createdBy =
        client.users.cache.get(ticketChannel.name.split("ticket-")[1]) ||
        client.users.cache.get(
          ticketChannel.name.split("ticket-claimed-")[1]
        ) ||
        client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

      let allMessages = await ticketChannel.messages.fetch()
      let systemMessages = allMessages.filter(
        (m) => m.embeds && m.author.id == client.user.id
      )
      systemMessages.forEach((msg) => {
        msg.delete()
      })

      let archiveEmbed = new MessageEmbed()
        .setAuthor(`System`, logo)
        .setColor(defcolor)
        .setDescription("The ticket has been archived. You can just delete it.")

      button.channel.edit({
        name: `ticket-archived-${createdBy}`,
        parentID: client.tickets.archiveCategory,
        permissionOverwrites: [
          {
            id: createdBy.id,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: client.tickets.moderatorRole,
            deny: ["SEND_MESSAGES"],
          },
        ],
      })

      button.channel.send({ embeds: archiveEmbed })
    }

    if (button.id == `ticket_transcript_${button.channel.id}`) {
      let ticketChannel = button.channel

      let allMessages = await ticketChannel.messages.fetch()
      let systemMessages = allMessages
        .filter(
          (m) => m.content && m.author.id != client.user.id && !m.author.bot
        )
        .map(
          (m) =>
            msToTime(m.createdTimestamp) +
            " | " +
            m.author.tag +
            ": " +
            m.cleanContent
        )
        .join("\n")

      let attch = new MessageAttachment(
        Buffer.from(systemMessages),
        `saved_transcript_${button.channel.id}.txt`
      )
      ticketChannel.send({
        content: `${button.clicker.user} Transcript created!`,
        attachments: [attch],
      })
    }

    if (button.id == `ticket_claim_${button.channel.id}`) {
      let ticketChannel = button.channel
      let createdBy =
        client.users.cache.get(ticketChannel.name.split("ticket-")[1]) ||
        client.users.cache.get(
          ticketChannel.name.split("ticket-claimed-")[1]
        ) ||
        client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

      let claimEmbed = new MessageEmbed()
        .setAuthor(`System`, logo)
        .setColor(defcolor)
        .setDescription(`${button.clicker.user} claimed this ticket.`)

      button.channel.edit({
        name: `ticket-claimed-${createdBy}`,
        parentID: client.tickets.claimedCategory,
        permissionOverwrites: [
          {
            id: createdBy.id,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: client.tickets.moderatorRole,
            deny: ["SEND_MESSAGES"],
          },
        ],
      })

      button.channel.send({ embeds: claimEmbed })
    }

    function msToTime(ms) {
      let fullFill = (a, limit) =>
        ("0".repeat(69) + a.toString()).slice(limit ? -limit : -2)

      let daet = new Date(ms)

      let day = fullFill(daet.getDate())
      let month = fullFill(daet.getMonth())
      let year = fullFill(daet.getFullYear(), 4)

      let hours = fullFill(daet.getHours())
      let mins = fullFill(daet.getMinutes())
      let secs = fullFill(daet.getSeconds())

      return `${day}/${month}/${year} ${hours}:${mins}:${secs}`
    }
  },
}
