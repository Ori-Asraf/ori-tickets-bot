const { MessageEmbed, MessageAttachment } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands/src");

module.exports = {
    name: "clickButton",
    once: false,
    run: async(client, button) => {
        await button.defer();

        let buttonMember = button.clicker.member;
        let guild = button.guild;

        if(button.id === "verifybtn"){
            var user = buttonMember.user.id;
            const roleid = client.server.member
            let usr = guild.members.cache.get(user)
            if(usr.roles.cache.has(roleid)) {
              await usr.send(`<@${user}>** You are already Verifed!\n** \`Server : ${guild.name}\``).catch(err => { console.log(client.db.Colors.white.bold("[Verification]")+client.db.Colors.red(" Unable to DM ")+client.db.Colors.white(usr.user.tag)) });
            } else {
              await usr.roles.add(roleid);   
              await usr.send(`<@${user}>** You got successfully Verified!\n** \`Server : ${guild.name}\``).catch(err => { console.log(client.db.Colors.white.bold("[Verification]")+client.db.Colors.red(" Unable to DM ")+client.db.Colors.white(usr.user.tag)) });
            }
        }

        if(button.id == "support_ticket_create") {
            let allChannels = client.channels.cache.filter(m => m.type == "text" && m.name.includes("ticket-")).map(m => m.name.split("ticket-")[1]);
            
            let already = allChannels.some(v => buttonMember.user.id == v)
            if(already === true) {
                return buttonMember.send(`**Sorry, you have already have a ticket. \n** \`Server : ${guild.name}\``).catch(err => { console.log(client.db.Colors.white.bold("[Tickets]")+client.db.Colors.red(" Unable to DM ")+client.db.Colors.white(buttonMember.user.tag)) });
            }
            let ticketChannel = await guild.channels.create(`ticket-${buttonMember.user.id}`, {
                type: "text",
                topic: `${buttonMember.user.username}'s ticket`,
                parent: client.server.opened,
                permissionOverwrites: [
                    {
                        id: buttonMember.id,
                        allow: ["SEND_MESSAGES","VIEW_CHANNEL"]
                    },
                    {
                        id: guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: client.server.staff,
                        allow: ["SEND_MESSAGES","VIEW_CHANNEL"]
                    }
                ]
            })

            let supportEmbed = new MessageEmbed()
                .setAuthor(`System`, client.info.logo)
                .setColor(client.info.color)
                .setDescription("Support will be with you shortly.\nTo close this ticket react with :lock:")
                .setFooter(client.info.credit)
                .setTimestamp();

            let supportButton = new MessageButton()
                .setLabel("")
                .setEmoji("🔒")
                .setStyle("gray")
                .setID(`ticket_close_${ticketChannel.id}`)
            
            ticketChannel.send({
                content: `${buttonMember.user} Welcome!`, 
                embeds: supportEmbed, 
                components: new MessageActionRow().addComponent(supportButton)
            })
            buttonMember.send(`**You have opened a ticket. ${ticketChannel} \n** \`Server : ${guild.name}\``).catch(err => { console.log(client.db.Colors.white.bold("[Tickets]")+client.db.Colors.red(" Unable to DM ")+client.db.Colors.white(buttonMember.user.tag)) });
        }

        if(button.id == `ticket_close_${button.channel.id}`) {
            let ticketChannel = button.channel;
            let createdBy = client.users.cache.get(ticketChannel.name.split("ticket-")[1]) || client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

            let yes = new MessageButton().setLabel("").setEmoji("✅").setStyle("gray").setID(`ticket_close_yes_${buttonMember.user.id}`)
            let no = new MessageButton().setLabel("").setEmoji("❌").setStyle("gray").setID(`ticket_close_no_${buttonMember.user.id}`)

            let msg = await ticketChannel.send({content: `${buttonMember.user} Are you really sure to close the ticket?`, components: new MessageActionRow().addComponent(yes).addComponent(no)})
            let filter = (button) => buttonMember.user.id == button.clicker.user.id
            let collector = await ticketChannel.createButtonCollector(msg, filter, { max: 1, time: 60000, errors: ["time"] })

            collector.on("collect", button => {
                if(button.id == `ticket_close_yes_${button.clicker.user.id}`) {
                    msg.delete();

                    let closedEmbed = new MessageEmbed()
                        .setAuthor(`System`, client.info.logo)
                        .setColor(client.info.color)
                        .setDescription(`Ticket closed by ${button.clicker.user}\nTicket created by ${createdBy}\n\n🔓 Reopen Ticket\n❌ Delete Ticket\n📥 Archive Ticket`)

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

                    button.channel.edit({
                        name: `ticket-closed-${createdBy}`,
                        parentID: client.server.closed,
                        permissionOverwrites: [
                            {
                                id: createdBy.id,
                                deny: ["VIEW_CHANNEL"]
                            },
                            {
                                id: guild.roles.everyone,
                                deny: ["VIEW_CHANNEL"]
                            },
                            {
                                id: client.server.staff,
                                allow: ["SEND_MESSAGES","VIEW_CHANNEL"]
                            }
                        ]
                    })

                    button.channel.send({embeds: closedEmbed, components: new MessageActionRow().addComponent(reopen).addComponent(deleteButton).addComponent(archiveButton)})
                } else {
                    msg.delete();
                }
            })
        }

        if(button.id == `ticket_reopen_${button.channel.id}`) {
            let ticketChannel = button.channel;
            let createdBy = client.users.cache.get(ticketChannel.name.split("ticket-")[1]) || client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

            let allMessages = await ticketChannel.messages.fetch()
            let systemMessages = allMessages.filter(m => m.embeds && m.author.id == client.user.id);
            systemMessages.forEach(msg => {msg.delete()})

            let supportEmbed = new MessageEmbed()
                .setAuthor(`System`, client.info.logo)
                .setColor(client.info.color)
                .setDescription("Support will be with you shortly.\nTo close this ticket react with :lock:")
                .setFooter(client.info.credit)
                .setTimestamp();

            let supportButton = new MessageButton()
                .setLabel("")
                .setEmoji("🔒")
                .setStyle("gray")
                .setID(`ticket_close_${ticketChannel.id}`)
            
            ticketChannel.edit({
                name: `ticket-${createdBy}`,
                parentID: client.server.opened,
                permissionOverwrites: [
                    {
                        id: createdBy.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: client.server.staff,
                        allow: ["SEND_MESSAGES","VIEW_CHANNEL"]
                    }
                ]
            })

            ticketChannel.send({content: `${createdBy} Welcome back!`, embeds: supportEmbed, components: new MessageActionRow().addComponent(supportButton)})
        }

        if(button.id == `ticket_delete_${button.channel.id}`) {
            let ticketChannel = button.channel;

            let deleteEmbed = new MessageEmbed()
                .setAuthor(`System`, client.info.logo)
                .setColor("#ff0000")
                .setDescription("Ticket will be deleted in 5s")
            
            ticketChannel.send({embeds: deleteEmbed})
            setTimeout(() => {ticketChannel.delete()}, 5000);
        }

        if(button.id == `ticket_archive_${button.channel.id}`) {
            let ticketChannel = button.channel;
            let createdBy = client.users.cache.get(ticketChannel.name.split("ticket-")[1]) || client.users.cache.get(ticketChannel.name.split("ticket-closed-")[1])

            let allMessages = await ticketChannel.messages.fetch()
            let systemMessages = allMessages.filter(m => m.embeds && m.author.id == client.user.id);
            systemMessages.forEach(msg => {msg.delete()})

            let archiveEmbed = new MessageEmbed()
                .setAuthor(`System`, client.info.logo)
                .setColor(client.info.color)
                .setDescription("The ticket has been archived. You can just delete it.")

            button.channel.edit({
                name: `ticket-archived-${createdBy}`,
                parentID: client.server.archived,
                permissionOverwrites: [
                    {
                        id: createdBy.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: client.server.staff,
                        deny: ["SEND_MESSAGES"]
                    }
                ]
            })

            button.channel.send({embeds: archiveEmbed})
        }
    }
}
