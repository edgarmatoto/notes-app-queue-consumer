class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistSongService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlist: { id: playlistId }, targetEmail } = JSON.parse(
        message.content.toString(),
      );

      const playlist = await this._playlistSongService.getPlaylistById(
        playlistId,
      );
      const songs = await this._playlistSongService.getPlaylistSongs(
        playlistId,
      );

      const playlistSongs = { playlist: { ...playlist, songs } };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlistId,
        playlist.name,
        JSON.stringify({ playlistSongs }),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
