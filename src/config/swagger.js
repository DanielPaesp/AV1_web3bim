import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jogos API",
      version: "1.0.0",
      description: "api para cadastro de jogos",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "1234"
        }
      }
    }
  },
  apis: ["../../server.js"]
};

const TOKEN_SECRETO = process.env.TOKEN_SECRETO || "1234";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;