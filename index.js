const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const config = require('./config.js');
const bot = new Telegraf(config.token);
bot.start((ctx) => ctx.reply(config.start_text));
bot.help((ctx) => ctx.reply(config.help_text));

    
bot.command('encrypt', (ctx) => {
    config.logCommand(ctx.message.from.username, ctx.message.text.split(" ")[0]);
    var args = ctx.message.text.split(" ").slice(1);
    if(!args[0]) return ctx.reply("Please provide like this /encrypt <encrypted key>");

    function createSecretKey(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 18; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    var secretKey = createSecretKey();

    var encryptor = require('simple-encryptor')(secretKey);
    var encrypted = encryptor.encrypt(String(args[0]));
    ctx.reply(`
    Text: \`${args[0]}\`
    
    Encrypted Key: \`${secretKey}_${encrypted}\`
    
    WARNING: If you lose your secret key, you will not be able to decrypt your encrypted key.`)
});


bot.command('decrypt', (ctx) => {
    config.logCommand(ctx.message.from.username, ctx.message.text.split(" ")[0]);
    var args = ctx.message.text.split(" ").slice(1);
    if(!args[0]) return ctx.reply("Please provide like this /decrypt <encrypted key>");

    var secretKey = args[0].split("_")[0];
    var encrypted = args[0].split("_")[1];

    var encryptor = require('simple-encryptor')(secretKey);
    var decrypted = encryptor.decrypt(encrypted);
    ctx.reply(`
    Encrypted Key: \`${args[0]}\`

    Decrypted Text: \`${decrypted}\`
    `)
});

bot.launch();

//when command used, log console
bot.on('message', (ctx) => {
    //LOG LIKE THIS; [USERNAME]
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));