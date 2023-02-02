module.exports = {
    token: "YOUR_BOT_TOKEN",
    start_text: `Hello, my name is Crypter Bot, if you want to know more about me, please type /help and my author is github.com/@b1bxonty`,
    help_text: `I'm a crypter bot,
    - /encrypt <text> to encrypt your text
    - /decrypt <encrypted key> to decrypt your encrypted key`,
}

module.exports.logCommand = function (user, command){
    console.log(`[${user}] used command ${command} at ${new Date().toLocaleString()}`)
}