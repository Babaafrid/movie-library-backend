const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [{ imdbID: String, title: String, poster: String, year: String }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
