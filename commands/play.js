module.exports = {
    name: 'play',
    description: "says music",
    execute(message,songInfo){
        const Discord = require('discord.js');
        const queue = new Map();  
         dj();
    async function dj(){
        
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
        }
        
           // console.log(video);
        const youtubeResults = songInfo.results;
        const url2 = youtubeResults.map(result => {
        return result.id
        });
        const title2 = youtubeResults.map(result => {
            return result.title
            });
            const song = {
                title: title2,
                url: url2,
            }
            const serverQueue = queue.get(message.guild.id);
             if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                };
                queue.set(message.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
                 try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    queue.delete(message.guild.id);
                    return message.channel.send(`I could not join the voice channel: ${error}`);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
            var embed = new Discord.RichEmbed()
                        .setTitle("Song Selection")
                        .setDescription(`✅ Song has been added to the queue!`)
                        .setColor("GOLD")
                 return message.channel.send(embed);
            }
            return undefined;
    }
       // var connection = await voiceChannel.join();      
        // play(message.guild,song);  
       async  function play(guild, song){
                       const serverQueue = queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
            console.log(serverQueue.songs);
        const ytdl = require('ytdl-core');
                const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {quality: "highestaudio"}))
                   .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') 
              console.log('Song ended');
               else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                     
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
        
            var embed = new Discord.RichEmbed()
                .setTitle("Song Selection")
                .setDescription(`🎵 \`Start playing:\` *${song.title}*`)
                .setColor("GOLD")
            serverQueue.textChannel.send(embed);
        }

                
            
                }
}

  /*  async function handleVideo(video, msg, voiceChannel, playlist = false) {
            const serverQueue = queue.get(msg.guild.id);
            console.log(video);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: msg.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 10,
                    playing: true
                };
                queue.set(msg.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
        
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    queue.delete(msg.guild.id);
                    return msg.channel.send(`I could not join the voice channel: ${error}`);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
            var embed = new Discord.RichEmbed()
                        .setTitle("Song Selection")
                        .setDescription(`✅ Song has been added to the queue!`)
                        .setColor(`${COLOR}`)
                 return msg.channel.send(embed);
            }
            return undefined;
        }
        
        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
            console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') 
              console.log('Song ended');
               else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                     
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
        
            var embed = new Discord.RichEmbed()
                .setTitle("Song Selection")
                .setDescription(`🎵 \`Start playing:\` *${song.title}*`)
                .setColor(`${COLOR}`)
            serverQueue.textChannel.send(embed);
        }*/
