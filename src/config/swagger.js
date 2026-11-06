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
      schemas: {
        Jogo: {
          type: "object",
          required: ["id", "nome", "Ano"],
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "GTA IV" },
            Ano: { type: "integer", example: 2008 }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o valor de TOKEN_SECRETO como token Bearer"
        }
      }
    }
  },
  apis: ["./src/routes/jogosRoutes.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;