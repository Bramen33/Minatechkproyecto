require("dotenv").config();
const axios = require("axios"); // Instala axios si no lo tienes: npm install axios

async function testClerkApi() {
  try {
    console.log("Intentando listar usuarios directamente desde la API de Clerk...");

    const response = await axios.get("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    console.log("Usuarios obtenidos:", response.data);
  } catch (err) {
    console.error("Error al interactuar con la API de Clerk:", err.message);
  }
}

testClerkApi();
