const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "message",
    once: false,
    run: async(client, message) => {
	 if(!message.member) return;
      if(message.channel.id === client.server.bugwrite){
        await message.delete();
      }else if(message.channel.id === client.server.sugwrite) {
        await message.delete();
      }
      if(message.content.includes("http://") || message.content.includes("https://")) {
            if(message.content.includes("youtube.com") && message.channel.id == client.server.WhitelistChat) {
              return;  
            }else{
              if(!message.member.hasPermission('MANAGE_MESSAGES')) {
                await message.delete();
                let Embed = new MessageEmbed()
                .setAuthor(`System`, 'https://cdn.discordapp.com/attachments/696378493629497344/905468356457558046/alert-icon-1562_1.png')
                .setColor("#ff0000")
                .setDescription(`<@${message.author.id}> **You may not try send Links here.**`)
                .setFooter(client.info.credit)
                .setTimestamp()
                message.channel.send(Embed);
              }
            }
      }else if(message.content.includes("discord.gg") || message.content.includes("discord.com")) {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) {
              await message.delete();
              let Embed = new MessageEmbed()
              .setAuthor(`System`, 'https://cdn.discordapp.com/attachments/696378493629497344/905468356457558046/alert-icon-1562_1.png')
              .setColor("#ff0000")
              .setDescription(`<@${message.author.id}> **You may not try send Invites here.**`)
              .setFooter(client.info.credit)
              .setTimestamp()
              message.channel.send(Embed);
            }
      }
      
      if (message.author.bot) return;
      if (!message.guild) return;
      if (!message.content.startsWith(client.info.prefix)) return;
      const args = message.content.slice(client.info.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      let reason = args.slice(1).join(' ');
        switch (command) {
            
            case 'a-approve': {
              if(message.channel.id === client.server.approvalChat)
              if(args == '') return message.channel.send(`<@${message.author.id}> User Mention is missing!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
              let argsmention = message.mentions.users.first();
              let member = message.mentions.members.first();
              const roleid = client.server.whitelisted
              if(member.roles.cache.has(roleid)) {
                message.channel.send(`<@${message.author.id}> User has already passed the Auditions!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
              }else if (!member.roles.cache.has(client.server.Waiting)) {
                message.channel.send(`<@${message.author.id}> user has no Waiting for Auditions Role.`).then((sent) => {
                  setTimeout(function () {
                    sent.delete();
                    message.delete()
                  }, 4500);
                });
              } else {
                const OriHagever = new MessageEmbed()
                .setColor("#33ff33")
                .setTitle(`__**Passed Auditions**__`, client.info.logo)
                .setAuthor(`NewVersion Whitelist`, client.info.logo)
                .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871061814740414515/check-mark-transparent-gif-4.png")
                .setDescription(`${argsmention} **Successfully Passed Auditions**`)
                .addField("\u200B", "<a:elite_checkmark:871068205324566568> - `A message has been sent to his DM`")
                .addField("Approved By:", "<@" +message.author.id + ">", true)
                .setTimestamp()
                .setFooter(client.info.credit, client.info.logo)
                message.delete()
                message.channel.send(OriHagever)
          message.guild.channels.cache.get(client.server.publicapproval).send(OriHagever)
                const RoyHagever = new MessageEmbed()
                .setColor("#ff9966")
                .setTitle(`**NewVersion - Whitelist Auditions**`, client.info.logo)
                .setAuthor(`NewVersion Whitelist`, client.info.logo)
                .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871073795581042708/vector-clip-art-tropy-png-300x300.png")
                .setDescription(`${argsmention} **!מזל טוב וכל הכבוד - **<a:elite_confettiblast:871072772443504720>`)
                .addField("\u200B", "!אנו שמחים להודיע לך שעברת את חלק האודישנים לשרת הוויטליסט. קיבלת רול וויטליסט, לפני כניסתך נא לעבור בקצרה על חוקי השרת. כמו כן שים לב כי נפתחו בעבורך חדרים חדשים בשרת האודישנים/וויטליסט")
                .setTimestamp()
                .setFooter("בברכה צוות אודישנים - NewVersion Whitelist", client.info.logo)
                argsmention.send(RoyHagever);
                member.roles.add(client.server.whitelisted).catch(console.error)
                member.roles.remove(client.server.Waiting).catch(console.error)
              }
          break;
          }

            case 'a-reject': {
              if(message.channel.id === client.server.approvalChat)
              if(args == '') return message.channel.send(`<@${message.author.id}> User Mention is missing!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                }, 4500);
                message.delete()
              });
              let argsmention = message.mentions.users.first();
              let member = message.mentions.members.first();
              const roleid = client.server.whitelisted
              if(member.roles.cache.has(roleid)) {
                message.channel.send(`<@${message.author.id}> User has already passed the Auditions!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
              }else if (!member.roles.cache.has(client.server.Waiting)) {
                message.channel.send(`<@${message.author.id}> user has no Waiting for Auditions Role.`).then((sent) => {
                  setTimeout(function () {
                    sent.delete();
                    message.delete()
                  }, 4500);
                });
              } else {
                  const OriHagever = new MessageEmbed()
                  .setColor("#ff3333")
                  .setTitle(`__**Rejected From Auditions**__`, client.info.logo)
                  .setAuthor(`NewVersion Whitelist`, client.info.logo)
                  .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871077606940876800/x-mark-3-512.png")
                  .setDescription(`${argsmention} **Rejected From Auditions**`)
                  .addField("\u200B", "<a:elite_notcheckmark:871068206981337198> - `Rejected for some reason by Rejector`")
                  .addField("Rejected By:", "<@" +message.author.id + ">", true)
                  .setTimestamp()
                  .setFooter(client.info.credit, client.info.logo)
                  message.delete()
                  message.channel.send(OriHagever)
                  message.guild.channels.cache.get(client.server.publicapproval).send(OriHagever)
                  const RoyHagever = new MessageEmbed()
                  .setColor("#ff9966")
                  .setTitle(`**NewVersion - Whitelist Auditions**`, client.info.logo)
                  .setAuthor(`NewVersion Whitelist`, client.info.logo)
                  .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871079076679520327/Sorry-Transparent-Background-PNG.png")
                  .setDescription(`${argsmention} **!לצערנו לא עברת את האודישנים - **<a:elite_notcheckmark:871068206981337198>`)
                  .addField("\u200B", "לצערנו לא עברת את האודישנים מוזמן לעבור על הטעויות שלך ולהגיש טופס מחדש.")
                  .setTimestamp()
                  .setFooter("בצער רב צוות אודישנים - NewVersion Whitelist", client.info.logo)
                  argsmention.send(RoyHagever);
                  member.roles.remove(client.server.Waiting).catch(console.error)
              }
          break;
          }

            case 'f-approve': {
              if(message.channel.id === client.server.approvalForm)
              if(args == '') return message.channel.send(`<@${message.author.id}> User Mention is missing!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
              let argsmention = message.mentions.users.first();
              let member = message.mentions.members.first();
              const roleid = client.server.whitelisted
              if(member.roles.cache.has(roleid)) {
                message.channel.send(`<@${message.author.id}> User has already passed the Auditions!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
              }else if (member.roles.cache.has(client.server.Waiting)) {
                message.channel.send(`<@${message.author.id}> user already has passed Forms.`).then((sent) => {
                  setTimeout(function () {
                    sent.delete();
                    message.delete()
                  }, 4500);
                });
              } else {
                const OriHagever = new MessageEmbed()
                .setColor("#33ff33")
                .setTitle(`__**Passed Forms**__`, client.info.logo)
                .setAuthor(`NewVersion Whitelist`, client.info.logo)
                .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871061814740414515/check-mark-transparent-gif-4.png")
                .setDescription(`${argsmention} **Successfully Passed Forms**`)
                .addField("\u200B", "<a:elite_checkmark:871068205324566568> - `A message has been sent to his DM`")
                .addField("Approved By:", "<@" +message.author.id + ">", true)
                .setTimestamp()
                .setFooter(client.info.credit, client.info.logo)
                message.delete()
                message.channel.send(OriHagever)
            message.guild.channels.cache.get(client.server.publicapproval).send(OriHagever)
                const RoyHagever = new MessageEmbed()
                .setColor("#cc66ff")
                .setTitle(`**NewVersion - Whitelist Forms**`, client.info.logo)
                .setAuthor(`NewVersion Whitelist`, client.info.logo)
                .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871089990313082970/pngegg.png")
                .setDescription(`${argsmention} **!כל הכבוד - **<a:elite_confettiblast:871072772443504720>`)
                .addField("\u200B", "אנו שמחים להודיע לך שעברת את החלק הראשון בכניסה לשרת(הטופס). קיבלת רול ממתין לבחינה, מוזמן להסתכל מתי ימי הבחינות הקרובים לבוא להיבחן קולי, לבחינה קולית תצטרך/י לספר את הסיפור בקצרה לספר על עצמך ולעבור על חוקים בקצרה.")
                .setTimestamp()
                .setFooter("בברכה צוות הטפסים - NewVersion Whitelist", client.info.logo)
                argsmention.send(RoyHagever);
                member.roles.add(client.server.Waiting).catch(console.error)
              }
          break;
          }

            case 'f-reject': {
        if(message.channel.id === client.server.approvalForm)
        if(args == '') return message.channel.send(`<@${message.author.id}> User Mention is missing!`).then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 4500);
          message.delete()
        });
        let argsmention = message.mentions.users.first();
        let member = message.mentions.members.first();
        const roleid = client.server.whitelisted
        if(member.roles.cache.has(roleid)) {
          message.channel.send(`<@${message.author.id}> User has already passed the Auditions!`).then((sent) => {
          setTimeout(function () {
            sent.delete();
            message.delete()
          }, 4500);
        });
        }else if (member.roles.cache.has(client.server.Waiting)) {
            message.channel.send(`<@${message.author.id}> User has already passed the Forms!`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                  message.delete()
                }, 4500);
              });
        } else {
            const OriHagever = new MessageEmbed()
            .setColor("#ff3333")
            .setTitle(`__**Rejected From Forms**__`, client.info.logo)
            .setAuthor(`NewVersion Whitelist`, client.info.logo)
            .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871077606940876800/x-mark-3-512.png")
            .setDescription(`${argsmention} **Rejected From Forms**`)
            .addField("\u200B", "<a:elite_notcheckmark:871068206981337198> - `Rejected for some reason by Rejector`")
            .addField("Rejected By:", "<@" +message.author.id + ">", true)
            .setTimestamp()
            .setFooter(client.info.credit, client.info.logo)
            message.delete()
            message.channel.send(OriHagever)
            message.guild.channels.cache.get(client.server.publicapproval).send(OriHagever)
            const RoyHagever = new MessageEmbed()
            .setColor("#ff9966")
            .setTitle(`**NewVersion - Whitelist Forms**`, client.info.logo)
            .setAuthor(`NewVersion Whitelist`, client.info.logo)
            .setThumbnail("https://cdn.discordapp.com/attachments/801196740815749181/871079076679520327/Sorry-Transparent-Background-PNG.png")
            .setDescription(`${argsmention} **!לצערנו לא עברת את הטפסים - **<a:elite_notcheckmark:871068206981337198>`)
            .addField("\u200B", "לצערנו לא עברת את השלב הראשון של הטופס מוזמן לעבור על הטעויות שלך ולהגיש טופס.")
            .setTimestamp()
            .setFooter("בצער רב צוות אודישנים - NewVersion Whitelist", client.info.logo)
            argsmention.send(RoyHagever);
            }
            break;
          }
        }
    }
}