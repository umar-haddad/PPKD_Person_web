const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTestAccount({
    service: "gmail",
    auth: {
      user: "samirabilkis2020@gmail.com.com",
      pass: "umar@reactJS", //Google tidak mengizinkan aplikasi pihak ketiga (seperti Nodemailer) untuk menggunakan password utama akun Anda secara langsung. 
      //Sebagai gantinya, Anda harus membuat password aplikasi untuk 
      //digunakan oleh aplikasi tersebut.
    },
  });
  const mailOptions = {
    from: email, // Email pengirim (dari input pengguna)
    to: "samirabilkis2020@gmail.com", // Ganti dengan email tujuan
    subject: "Pesan dari Pengguna",
    html: `<p><strong>Pesan:</strong> ${message}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email terkirim" });
  } catch (error) {
    console.error(error);
    res.status(500).send("terjadi kesalaha saat mengirim");
  }
});

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${PORT}`);
});
