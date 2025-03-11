const express = require("express");
const db = require("../utils/db");
const router = express.Router();

router.post("/", (req, res) => {
  const { userId, amount, type } = req.body;

  if (!["deposit", "withdraw"].includes(type)) {
    return res.status(400).send("Tipo de transacción inválido");
  }

  const query = "INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, ?)";
  db.query(query, [userId, amount, type], (err) => {
    if (err) return res.status(500).send("Error al registrar la transacción");
    res.send("Transacción registrada exitosamente");
  });
});

module.exports = router;
