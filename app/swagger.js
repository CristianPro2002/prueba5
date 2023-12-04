const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require('./docs/swagger.json')

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerDocument ));

    console.log(`Swagger docs available at /api-docs`)
}

module.exports = swaggerDocs;