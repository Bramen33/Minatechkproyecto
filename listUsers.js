require("dotenv").config(); // Cargar variables de entorno
const express = require("express");
const bodyParser = require("body-parser");
const { users } = require("@clerk/clerk-sdk-node");

const app = express();

app.use(bodyParser.json());

// Endpoint para listar todos los usuarios
app.get("/list-users", async (req, res) => {
  try {
    console.log("Intentando listar todos los usuarios desde Clerk...");

    const allUsers = await users.getUserList();
    console.log("Usuarios obtenidos desde Clerk:", allUsers);

    res.json(allUsers);
  } catch (err) {
    console.error("Error al listar usuarios:", err);
    res.status(500).json({
      message: "Error al listar usuarios",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3001; // Usa un puerto diferente al de server.js
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
