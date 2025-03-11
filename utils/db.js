const mysql = require('mysql2/promise');

// Configuración de la conexión
const db = mysql.createPool({
    host: 'srv1471.hstgr.io', // Cambia por el host correcto
    user: 'u448085746_minatech', // Usuario de la base de datos
    password: 'Bautista7878.', // Contraseña del usuario
    database: 'u448085746_minatechk', // Nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Probar la conexión al iniciar
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release(); // Libera la conexión para que vuelva al pool
  } catch (err) {
    console.error("Error al conectar la base de datos:", err);
    process.exit(1);
  }
})();

module.exports = db;

