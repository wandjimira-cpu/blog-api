const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API REST pour la gestion des articles de blog',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            titre: { type: 'string', example: 'Mon article' },
            contenu: { type: 'string', example: 'Contenu de larticle...' },
            auteur: { type: 'string', example: 'Wandji Miranda Brunelle' },
            date_publication: { type: 'string', format: 'date-time' },
            categorie: { type: 'string', example: 'Technologie' },
            tags: { type: 'string', example: 'nodejs, express' },
            date_creation: { type: 'string', format: 'date-time' },
            date_modification: { type: 'string', format: 'date-time' },
          },
        },
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur', 'categorie'],
          properties: {
            titre: { type: 'string', example: 'Mon article' },
            contenu: { type: 'string', example: 'Contenu de larticle...' },
            auteur: { type: 'string', example: 'Wandji Miranda Brunelle' },
            date_publication: { type: 'string', format: 'date-time' },
            categorie: { type: 'string', example: 'Technologie' },
            tags: { type: 'string', example: 'nodejs, express' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Message erreur' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
