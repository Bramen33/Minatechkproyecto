const pool = require('./db');

const testConnection = async () => {
    try {
        // Ejecuta una consulta simple para probar la conexión
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Conexión exitosa. Resultado:', rows[0].solution);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    } finally {
        // Cierra el pool de conexiones
        pool.end();
    }
};

testConnection();
