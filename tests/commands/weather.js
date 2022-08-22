const { MessageEmbed } = require("discord.js");
const { ArgumentType, MessageButton, MessageActionRow } = require("gcommands");

module.exports = {
    name: "weather",
    description: "Returns weather information about your region.",
    slash: false,
    run: async({client, message}) => {
        const args = message.content.split(' ')[1]
        const req=require('request');
        const T8AWDeaLTPoR5 = client.db.weatherapi;
        const url=`http://api.weatherapi.com/v1/current.json?key=${T8AWDeaLTPoR5} &q=${args}&aqi=no`;
        req(url, (a,b,c) => {
            const weather = JSON.parse(c)
            var currectday;
            var temp_emoji;
            const apierror = new MessageEmbed();
            apierror.setColor("#FF2800")
            apierror.setAuthor(`${client.info.name} | Weather Module`, client.info.logo)
            apierror.setDescription(`Error while initializing API key.`)
            apierror.setFooter(client.info.credit)
            apierror.setTimestamp()
            const unknownargs = new MessageEmbed();
            unknownargs.setColor("#FF2800")
            unknownargs.setAuthor(`${client.info.name} | Weather Module`, client.info.logo)
            unknownargs.setDescription(`No region specified or the region does not exists. \n Try type something like **Jerusalem**.`)
            unknownargs.setFooter(client.info.credit)
            unknownargs.setTimestamp()
            const unknowncountry = new MessageEmbed();
            unknowncountry.setColor("#FF2800")
            unknowncountry.setAuthor(`${client.info.name} | Weather Module`, client.info.logo)
            unknowncountry.setDescription(`This Region don't even exists.`)
            unknowncountry.setFooter(client.info.credit)
            unknowncountry.setTimestamp()
            const d = new Date();
            let day = d.getDay();
            if(weather.error){
            if(weather.error.code == "2006")return message.channel.send(apierror);
            if(weather.error.code == "1006")return message.channel.send(unknownargs);
            }
            if(weather.location.country == "Palestine")return message.channel.send(unknowncountry);
            if(day == 0){currectday="Sunday"};
            if(day == 1){currectday="Monday"};
            if(day == 2){currectday="Tuesday"};
            if(day == 3){currectday="Wednesday"};
            if(day == 4){currectday="Thursday"};
            if(day == 5){currectday="Friday"};
            if(day == 6){currectday="Saturday"};
            if(weather.current.temp_c >= 30.0){temp_emoji="☀️"};
            if(weather.current.temp_c <= 17.0){temp_emoji="❄️"};
            if(weather.current.temp_c >= 17.0 && weather.current.temp_c <= 30.0){temp_emoji="💨"};
            const embed = new MessageEmbed()
            embed.setColor(client.info.color)
            embed.setAuthor(`${client.info.name} | Weather Module`, client.info.logo)
            embed.setThumbnail("https:"+weather.current.condition.icon)
            embed.setDescription(`
            \n **\`🧭\` Location :** ${weather.location.name} 
            **\`🗺️\` Region :** ${weather.location.region}
            **\`🌍\` State :** ${weather.location.country}
            \n **\`⏰\` Time :** ${weather.location.localtime} 
            **\`📆\` Day  :** ${currectday} 
            \n **\`☁️\` Condition :** ${weather.current.condition.text} 
            **\`${temp_emoji}\` Temperature :** ${weather.current.temp_c} °C 
            `)
            embed.setFooter(client.info.credit)
            embed.setTimestamp()
            message.channel.send(embed)
        })
    }
  };