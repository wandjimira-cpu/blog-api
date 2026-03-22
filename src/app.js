require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { testConnection } = require('./config/database');
const articleRoutes = require('./routes/articleRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Blog API - Documentation',
  swaggerOptions: { docExpansion: 'list', displayRequestDuration: true },
}));

app.use('/api/articles', articleRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Blog API opérationnelle', version: '1.0.0', documentation: `http://localhost:${PORT}/api-docs` });
});

app.use(notFound);
app.use(errorHandler);

async function start() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📖 Documentation : http://localhost:${PORT}/api-docs`);
  });
}

start();
