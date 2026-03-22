const errorHandler = (err, req, res, next) => {
  console.error('[ErrorHandler]', err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Erreur interne du serveur.' });
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route '${req.originalUrl}' introuvable.` });
};

module.exports = { errorHandler, notFound };
