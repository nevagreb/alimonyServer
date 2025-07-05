// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Разрешает запросы с других источников
app.use(express.json()); // Обработка JSON

app.post('/submit-alimony', (req, res) => {
  console.log('Данные формы:', req.body);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

