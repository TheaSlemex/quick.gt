const Discord = require("discord.js");
const client = new Discord.Client();
const Gt = require("./index");
const gt = new Gt.Manager();

client.on("ready", () => {
    console.log("Bot has started!");
});

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    if (message.content === "daily") {
        let add = gt.daily(message.author.id, 500);
        if (add.onCooldown) return message.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.sgtnds} sgtnds.`);
        else return message.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.after} coins.`);
    }
    if (message.content === "work") {
        let add = gt.work(message.author.id, 1000);
        if (add.onCooldown) return message.reply(`You already worked. Come back after ${add.time.minutes} minutes & ${add.time.sgtnds} sgtnds.`);
        else return message.reply(`you worked ${add.amount} as a ${add.workedAs} and earned ${add.after} coins.`);
    }
    if (message.content === "weekly") {
        let add = gt.weekly(message.author.id, 500);
        if (add.onCooldown) return message.reply(`You already claimed your weekly coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.sgtnds} sgtnds.`);
        else return message.reply(`you claimed ${add.amount} as your weekly coins and now you have total ${add.after} coins.`);
    }
    if (message.content === "bal") {
        let money = gt.fetchMoney(message.author.id);
        return message.channel.send(`<@${money.user}> has ${money.amount} coins.`);
    }
    if (message.content === "leaderboard") {
        let lb = gt.leaderboard({ limit: 10, raw: false });
        const embed = new Discord.RichEmbed()
            .setAuthor("Leaderboard")
            .setColor("BLURPLE");
        lb.forEach(u => {
            embed.addField(`${u.position}. ${client.users.get(u.id).tag}`, `Money: ${u.money} 💸`);
        });
        return message.channel.send(embed);
    }
});

client.login("NjU3OTUwNjk2NDAyMDU5Mjc5.XjgRXA.uS-OspxdjqXoxEQa59xVIsZvt5g");
