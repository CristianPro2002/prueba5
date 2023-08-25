const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require('./docs/swagger.json')
const { appConfig }  = require('../config.js');

const PORT = appConfig.port;
const HOST = appConfig.host;


const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup( swaggerDocument ));

    console.log(`Swagger docs available at ${HOST}:${PORT}/api-docs`)
}

module.exports = swaggerDocs;