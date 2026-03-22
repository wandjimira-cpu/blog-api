const { pool } = require('../config/database');

class Article {
  static async create({ titre, contenu, auteur, date_publication, categorie, tags }) {
    const sql = `INSERT INTO articles (titre, contenu, auteur, date_publication, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)`;
    const datePublication = date_publication || new Date();
    const [result] = await pool.execute(sql, [titre, contenu, auteur, datePublication, categorie, tags || null]);
    return result.insertId;
  }

  static async findAll({ categorie, auteur, date } = {}) {
    let sql = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    if (categorie) { sql += ' AND categorie = ?'; params.push(categorie); }
    if (auteur) { sql += ' AND auteur LIKE ?'; params.push(`%${auteur}%`); }
    if (date) { sql += ' AND DATE(date_publication) = ?'; params.push(date); }
    sql += ' ORDER BY date_publication DESC';
    const [rows] = await pool.execute(sql, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async update(id, fields) {
    const allowed = ['titre', 'contenu', 'categorie', 'tags'];
    const updates = [];
    const params = [];
    allowed.forEach((field) => {
      if (fields[field] !== undefined) {
        updates.push(`${field} = ?`);
        params.push(fields[field]);
      }
    });
    if (updates.length === 0) return false;
    params.push(id);
    const [result] = await pool.execute(`UPDATE articles SET ${updates.join(', ')} WHERE id = ?`, params);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM articles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async search(query) {
    const sql = `SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY date_publication DESC`;
    const pattern = `%${query}%`;
    const [rows] = await pool.execute(sql, [pattern, pattern]);
    return rows;
  }
}

module.exports = Article;
