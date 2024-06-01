const Playlist = require('../models/Playlist');

exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user._id }).populate('movies');
    const movies = playlists.flatMap(playlist => playlist.movies);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMovieToPlaylist = async (req, res) => {
  const { imdbID, Title, Poster, Year } = req.body;
  try {
    const playlist = await Playlist.findOne({ userId: req.user._id });
    if (playlist) {
      playlist.movies.push({ imdbID, title: Title, poster: Poster, year: Year });
      await playlist.save();
    } else {
      await Playlist.create({
        userId: req.user._id,
        movies: [{ imdbID, title: Title, poster: Poster, year: Year }],
      });
    }
    res.status(201).json({ message: 'Movie added to playlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMovieFromPlaylist = async (req, res) => {
  const { imdbID } = req.params;
  try {
    const playlist = await Playlist.findOne({ userId: req.user._id });
    if (playlist) {
      playlist.movies = playlist.movies.filter(movie => movie.imdbID !== imdbID);
      await playlist.save();
      res.status(200).json({ message: 'Movie deleted from playlist' });
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
