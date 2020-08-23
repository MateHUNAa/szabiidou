
const discord = require('discord.js'); 
const commando = require('discord.js-commando')

var bot = new commando.Client ({
    disabledEvryone: true,
    commandPrefix: '!',
    unknownCommandResponse: false
});
let prefix = "?"

bot.login('NzM2ODYyMjcwMTE3NzczMzUz.Xx0-dw.F6SEt_j8k_hh1UiaYHtGLCaTKNk')

bot.on("ready", () => {
    console.log("A Bot Sikeressen el Indult!");
});


bot.on('message', message => {
    if (message.content.startsWith(`${prefix}teszt`)) {
        message.channel.send('teszt')
    }
});

