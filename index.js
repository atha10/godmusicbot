const Discord = require('discord.js');
const token = 'NjQ3NzUxODgxMDAyNzEzMTEw.XefH3g.mNhE5W_nDt4z_S2a0HH0pdmy7m8';
const Client = new Discord.Client();
const PREFIX = ',';
const search = require('youtube-search');
const opts = {
    maxResults: 1,
    key: 'AIzaSyBqFMs2l5Pwrr3Yx19TCHq6lXhgT9HWYSE',
	type: 'video'
};
const ytdl = require('ytdl-core');


Client.on('ready', () => {
    console.log('Music Bot Is Online!!!');
})

const fs = require('fs');
Client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    Client.commands.set(command.name, command);
}

Client.on('message', async message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    const searchString = args.slice(1).join(' ');
    console.log(searchString);
 
    switch (args[0]) {
 
        case "ping":
            Client.commands.get('ping').execute(message, args);
        break;
 
        case "play":
                let songInfo =await search(searchString, opts).catch(err => console.log(err));
                console.log(songInfo);
              //  var connection = await voiceChannel.join();
                Client.commands.get('play').execute(message,songInfo);
        break;
    }
 
});
Client.login(token);
