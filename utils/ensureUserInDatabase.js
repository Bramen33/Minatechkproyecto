const db = require("./db"); // Asegúrate de que esta ruta sea correcta
const { users } = require("@clerk/clerk-sdk-node");

const ensureUserInDatabase = async (clerkUserId) => {
  try {
    // Verificar si el usuario ya está registrado en la base de datos
    const [rows] = await db.query("SELECT id FROM users WHERE clerk_id = ?", [clerkUserId]);

    if (rows.length === 0) {
      // Si el usuario no existe, obtener información de Clerk
      const clerkUser = await users.getUser(clerkUserId);

      // Insertar el usuario en la base de datos
      await db.query(
        "INSERT INTO users (clerk_id, email, balance) VALUES (?, ?, 0.00)",
        [clerkUserId, clerkUser.emailAddresses[0].emailAddress]
      );

      console.log(`Usuario ${clerkUserId} agregado a la base de datos`);
    } else {
      console.log(`Usuario ${clerkUserId} ya está en la base de datos`);
    }
  } catch (err) {
    console.error("Error al manejar usuario en la base de datos:", err);
    throw err;
  }
};

module.exports = ensureUserInDatabase;
