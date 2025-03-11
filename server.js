require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // Usaremos axios para interactuar con la API de Clerk

const app = express();

app.use(bodyParser.json());

// Ruta básica para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Endpoint para listar usuarios desde Clerk
app.get("/list-users", async (req, res) => {
  try {
    console.log("Intentando listar usuarios directamente desde la API de Clerk...");

    const response = await axios.get("https://api.clerk.dev/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    console.log("Usuarios obtenidos:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error al listar usuarios:", err.message);
    res.status(500).json({
      message: "Error al listar usuarios",
      error: err.message,
    });
  }
});

// NUEVO: Endpoint para actualizar el balance de un usuario
app.post("/update-balance", async (req, res) => {
  const { userId, newBalance } = req.body;

  // Validar que se envían los parámetros necesarios
  if (!userId || newBalance === undefined) {
    return res.status(400).send("Falta el ID del usuario o el nuevo balance");
  }

  try {
    console.log(`Actualizando balance para el usuario ${userId}...`);

    // Actualizar el balance en `public_metadata` usando la API de Clerk
    await axios.patch(
      `https://api.clerk.dev/v1/users/${userId}`,
      {
        public_metadata: { balance: newBalance },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
        },
      }
    );

    console.log(`Balance actualizado para el usuario ${userId} a ${newBalance}`);
    res.send(`Balance actualizado a ${newBalance}`);
  } catch (err) {
    console.error("Error al actualizar el balance:", err.message);
    res.status(500).json({
      message: "Error al actualizar el balance",
      error: err.message,
    });
  }
});

// Configurar el servidor para escuchar en un puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
