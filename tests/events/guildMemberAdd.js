const { MessageEmbed, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    run: async(client, member) => {   
        const cachedInvites = client.invites.data.get(member.guild.id);
        const newInvites = await member.guild.fetchInvites();
        client.invites.data.set(member.guild.id, newInvites);
        try { 
            
            const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
            const channel = client.channels.cache.get(client.server.Welcome);
            const d = new Date();
            let day2 = d.getDate();
            let year2 = d.getFullYear();
            let month2 = d.getMonth();
            let full2 = `${day2}/${month2}/${year2}`;
            let time = member.user.createdAt;
            let day1 = time.getDate();
            let year1 = time.getFullYear();
            let month1 = time.getMonth();
            let full = `${day1}/${month1}/${year1}`;

            if(!member.guild) return;

            const canvas = Canvas.createCanvas(1772, 633);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/696378493629497344/906242604604215336/welcome.png`);
            
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#f2f2f2';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            var textString3 = `${member.user.username}`;
            if (textString3.length >= 14) {
              ctx.font = '100px Sans-Serif';
              ctx.fillStyle = '#f2f2f2';
              ctx.fillText(textString3, 720, canvas.height / 2 + 180);
            } else {
              ctx.font = '150px Sans-Serif';
              ctx.fillStyle = '#f2f2f2';
              ctx.fillText(textString3, 720, canvas.height / 2 + 180);
            }

            var textString2 = `#${member.user.discriminator}`;
            ctx.font = 'bold 40px Sans-Serif';
            ctx.fillStyle = '#f2f2f2';
            ctx.fillText(textString2, 730, canvas.height / 2 + 240);

            ctx.beginPath();
            ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
            ctx.closePath();
            ctx.clip();

            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

            const attachments = new MessageAttachment(canvas.toBuffer(), `welcome-${member.id}.png`)
            
            if (!member.user.bot) {
                if (usedInvite.maxUses === 0) {
                    const embed = new MessageEmbed()
                    .setColor(client.info.color)
                    .setDescription(`**${member.user} Joined**`)
                    .setFooter(client.info.credit)
                    .setThumbnail(client.info.logo)
                    .addFields(
                        { name: `Member`, value: `Number #${member.guild.memberCount}`, inline: true},
                        { name: `Joined At`, value: full2, inline: true},
                        { name: `Created At`, value: full, inline: true},
                        { name: `Invited By`, value: `<@${usedInvite.inviter.id}>`, inline: true},
                        { name: `Invite Code`, value: `${usedInvite.code}`, inline: true},
                        { name: `Invite Uses`, value: `${usedInvite.uses}/∞`, inline: true},
                    )
                    .setImage(`attachment://welcome-${member.id}.png`)
                    .attachFiles(attachments)
                    .setTimestamp()
                    channel.send(embed).catch(err => console.log(err));
                } else {
                    const embed = new MessageEmbed()
                    .setColor(client.info.color)
                    .setDescription(`**${member.user} Joined**`)
                    .setFooter(client.info.credit)
                    .setThumbnail(client.info.logo)
                    .addFields(
                        { name: `Member`, value: `Number #${member.guild.memberCount}`, inline: true},
                        { name: `Joined At`, value: full2, inline: true},
                        { name: `Created At`, value: full, inline: true},
                        { name: `Invited By`, value: `<@${usedInvite.inviter.id}>`, inline: true},
                        { name: `Invite Code`, value: `${usedInvite.code}`, inline: true},
                        { name: `Invite Uses`, value: `${usedInvite.uses}/${usedInvite.maxUses}`, inline: true},
                    )
                    .setImage(`attachment://welcome-${member.id}.png`)
                    .attachFiles(attachments)
                    .setTimestamp()
                    channel.send(embed).catch(err => console.log(err));
                }
            } else {
                    const embed = new MessageEmbed()
                    .setColor(client.info.color)
                    .setDescription(`**${member.user} Joined**`)
                    .setFooter(client.info.credit)
                    .setThumbnail(client.info.logo)
                    .addFields(
                        { name: `Member`, value: `Number #${member.guild.memberCount}`, inline: true},
                        { name: `Joined At`, value: full2, inline: true},
                        { name: `Created At`, value: full, inline: true},
                    )
                    .setImage(`attachment://welcome-${member.id}.png`)
                    .attachFiles(attachments)
                    .setTimestamp()
                    channel.send(embed).catch(err => console.log(err));
            }
        }
        catch(err) {
            console.log(err);
        }
    }
}