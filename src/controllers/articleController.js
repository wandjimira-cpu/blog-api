const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
  try {
    const { titre, contenu, auteur, date_publication, categorie, tags } = req.body;
    if (!titre || !contenu || !auteur || !categorie) {
      return res.status(400).json({ success: false, message: 'Les champs titre, contenu, auteur et categorie sont obligatoires.' });
    }
    const insertId = await Article.create({ titre, contenu, auteur, date_publication, categorie, tags });
    const article = await Article.findById(insertId);
    return res.status(201).json({ success: true, message: 'Article créé avec succès.', data: article });
  } catch (error) {
    console.error('[createArticle]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur lors de la création.' });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;
    const articles = await Article.findAll({ categorie, auteur, date });
    return res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID invalide.' });
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ success: false, message: `Aucun article trouvé avec l'ID ${id}.` });
    return res.status(200).json({ success: true, data: article });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID invalide.' });
    const existing = await Article.findById(id);
    if (!existing) return res.status(404).json({ success: false, message: `Aucun article trouvé avec l'ID ${id}.` });
    const updated = await Article.update(id, req.body);
    if (!updated) return res.status(400).json({ success: false, message: 'Aucun champ valide à mettre à jour.' });
    const article = await Article.findById(id);
    return res.status(200).json({ success: true, message: 'Article mis à jour avec succès.', data: article });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID invalide.' });
    const existing = await Article.findById(id);
    if (!existing) return res.status(404).json({ success: false, message: `Aucun article trouvé avec l'ID ${id}.` });
    await Article.delete(id);
    return res.status(200).json({ success: true, message: `Article avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') return res.status(400).json({ success: false, message: 'Le paramètre "query" est requis.' });
    const articles = await Article.search(query.trim());
    return res.status(200).json({ success: true, count: articles.length, query: query.trim(), data: articles });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};
