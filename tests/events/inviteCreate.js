module.exports = {
    name: "inviteCreate",
    once: false,
    run: async(client, invite) => {
        client.invites.data.set(invite.guild.id, await invite.guild.fetchInvites())
    }
}