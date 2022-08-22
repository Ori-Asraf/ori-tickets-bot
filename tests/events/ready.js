module.exports = {
    name: "ready",
    once: true,
    run: async(client) => {
            setInterval(() => {
                guild = client.guilds.cache.get(client.server.guild);
                if(guild) {
                    client.user.setActivity(guild.memberCount + ` Members`, {type: `WATCHING`})
                    client.channels.cache.get(client.server.MemberCount).setName(`Member Count : ` + guild.memberCount)
                    let Whitelisted = guild.roles.cache.get(client.server.whitelisted).members;
                    client.channels.cache.get(client.server.WhitelistedCount).setName(`Whitelisted Count : ${Whitelisted.size}`)
                    .catch(console.error);
                }
            }, 1000 * 60 * 5);
            setTimeout(() => {
                console.log(client.db.Colors.white.bold("[Process]")+client.db.Colors.green(" Application Online ")+client.db.Colors.cyan("("+client.user.tag+")"));
            }, 1000);
    }
}