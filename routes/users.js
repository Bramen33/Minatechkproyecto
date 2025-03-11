const express = require("express");
const db = require("../utils/db");
const router = express.Router();

router.get("/:id/balance", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT balance FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send("Error al obtener el balance");
    if (results.length === 0) return res.status(404).send("Usuario no encontrado");
    res.json({ balance: results[0].balance });
  });
});

module.exports = router;
