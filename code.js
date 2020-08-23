
const discord = require('discord.js'); 
const commando = require('discord.js-commando')

var bot = new commando.Client ({
    disabledEvryone: true,
    commandPrefix: '!',
    unknownCommandResponse: false
});
let prefix = "?"

bot.login(process.env.token)

bot.on("ready", () => {
    console.log("A Bot Sikeressen el Indult!");
});


bot.on('message', message => {
    if (message.content.startsWith(`${prefix}teszt`)) {
        message.channel.send('teszt')
    }
});

//FILE SYSTEM
bot.on('message', message => {

    //CHECK CHANNEL TYPE

    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;

    //SET PREFIX

    let prefixek = JSON.parse(fs.readFileSync("./prefixek.json", "utf8"));
    if(!prefixek[message.guild.id]) {
        prefixek[message.guild.id] = {
            prefix: botconfig.prefix
        }
    }
    let prefix = prefixek[message.guild.id].prefix;

    //CHECK PREFIX, DEFINE ARGS & COMMAND

    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

    // RUN COMMANDS 

   if(bot.commands.has(cmd)) {
       command = bot.commands.get(cmd);
   } else if (bot.aliases.has(cmd)) {
       commands = bot.commands.get(bot.aliases.get(cmd));
   }
    try {
        command.run(bot, message, args);
    } catch(e) {
        return
    }
});

//-------------------------------------

//READ COMMAND FOLDER

fs.readdir("./commands/", (err,files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log('nem találni ilyen parancsot!')
        return
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} Betöltve!`)
        bot.commands.set(props.help.name, props);


        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

// Valamit írjal mar!