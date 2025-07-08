const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); // ← добавляем nodemailer

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/submit-alimony', async (req, res) => {
  const formData = req.body;
  console.log('Данные формы:', formData);

  // Преобразуем объект в читаемый текст
  const emailText = Object.entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  try {
    // Создаем транспортер
    const transporter = nodemailer.createTransport({
      service: 'gmail', // или другой SMTP-сервис
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Отправка письма
    await transporter.sendMail({
      from: `"Форма алиментов" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_FOR_FORM, // можно указать другой email
      subject: 'Новое заявление о взыскании алиментов',
      text: emailText,
    });

    res.json({ status: 'ok', message: 'Письмо отправлено' });
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    res.status(500).json({ status: 'error', message: 'Не удалось отправить письмо' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
