# quick.gt
A simple & easy to use economy package for discord bots using quick.db

# Installing
`npm i --save quick.gt`

> Note: This package uses `quick.db` to run.

**[Join Our Discord Server](https://discord.gg/QUYQHMmk7P)**

# Getting Started

```js
const Gt = require("quick.gt");
const gt = new Gt.Manager();
```

# Example

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const Gt = require("quick.gt")
const gt = new Gt.Manager();

client.on("ready", () => {
    console.log("Bot has started!");
});

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    if (message.content === "daily") {
        let add = gt.daily(message.author.id, 500);
        if (add.onCooldown) return message.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
        else return message.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.after} coins.`);
    }
    if (message.content === "bal") {
        let money = gt.fetchMoney(message.author.id);
        return message.channel.send(`<@${money.user}> has ${money.amount} coins.`);
    }
    if (message.content === "leaderboard") {
        let lb = gt.leaderboard({ limit: 10, raw: false });
        const embed = new Discord.MessageEmbed()
        .setAuthor("Leaderboard")
        .setColor("BLACK");
        lb.forEach(u => {
            embed.addField(`${u.position}. ${client.users.get(u.id).tag}`, `Money: ${u.money} 💸`);
        });
        return message.channel.send(embed);
    }
});

client.login("NjU3OTUwNjk2NDAyMDU5Mjc5.XjgRXA.uS-OspxdjqXoxEQa59xVIsZvt5g");

```

# Functions

```js

addWl(userid, amount); // adds money & returns object
fetchWl(userid); // returns object
setWl(userid, amount); // sets new money value & returns object
deleteUser(userid); // Deletes a user from the database
removeWl(userid, amount); // removes certain amount from user
daily(userid, amount); // Adds daily balance & returns object with 24h cooldown
weekly(userid, amount); // adds weekly balance & returns object with cooldown
work(userid, amount, { options }); // Work function, returns object | options: { cooldown: time_in_ms, jobs: ["job name", "another job"] }
beg(userid, amount, { options }); // beg function, returns object | options: { canLose: false, cooldown: time_in_ms } | [ can be used in "search" command ]
transfer(userid1, userid2, amount); // transfer balance from a user to another, returns object | [ Can be used in "rob" command ]
leaderboard({ options }); // returns leaderboard | options: { raw: false, limit: 10 }

```

# Making Other Commands
You can make some other commands like `rob`, `gamble`, `search`, `shop` & more using above mentioned functions.

# Need help in quick.eco?
**[discord.gg/QUYQHMmk7P](https://discord.gg/QUYQHMmk7P)**


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FINEX07%2Fquick.eco.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FINEX07%2Fquick.eco?ref=badge_large)
#
