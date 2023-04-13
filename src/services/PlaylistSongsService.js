const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const result = await this._pool.query({
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    });

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const result = await this._pool.query({
      text: `SELECT songs.id, songs.title, songs.performer
      FROM songs
      JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    });

    return result.rows;
  }
}

module.exports = PlaylistSongsService;
