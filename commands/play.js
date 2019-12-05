module.exports = {
    name: 'play',
    description: "says music",
    execute(message,songInfo){
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
        }
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
       // var connection = await voiceChannel.join();      
         play(message.guild,song);  
       async  function play(guild, song){
        const ytdl = require('ytdl-core');
                var connection = await voiceChannel.join();
                const dispatcher = connection.playStream(ytdl(song.url, {quality: "highestaudio"}))
                    .on('error', error => {
                        console.error(error);
                    });
           //   dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            

                
            
                }
}
}
