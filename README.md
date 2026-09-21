# 🍳 Smart Chef AI

![Smart Chef AI Banner]([URL_GAMBAR_SCREENSHOT_LO_DISINI_ATAU_HAPUS_JIKA_TIDAK_ADA])

Smart Chef AI adalah aplikasi web *fullstack* cerdas yang berfungsi sebagai asisten koki pribadi Anda. Cukup sebutkan bahan makanan yang ada di kulkas (atau unggah fotonya), dan AI akan meracik resep masakan yang lezat, lengkap dengan estimasi waktu, tingkat kesulitan, dan instruksi langkah demi langkah.

Proyek ini dibangun untuk mendemonstrasikan integrasi **Generative AI (Large Language Models)** ke dalam aplikasi web menggunakan arsitektur *Client-Server* yang aman.

## ✨ Fitur Utama

*   **🧠 AI-Powered Recipe Generation:** Menggunakan model **Google Gemini AI** untuk menghasilkan resep unik secara *real-time*.
*   **📸 Multimodal Input (Vision):** Mendukung unggahan gambar kulkas/bahan makanan untuk dianalisis langsung oleh AI.
*   **🔒 Secure Client-Server Architecture:** API Key diamankan di sisi *backend* (Node.js/Express) sehingga tidak terekspos di sisi *client* (Browser).
*   **📱 Responsive & Modern UI:** Antarmuka pengguna yang bersih dan interaktif dibangun dengan **Tailwind CSS**.
*   **⚙️ Structured Data Handling:** Memanfaatkan *Prompt Engineering* untuk memaksa model AI merespons dalam format JSON murni agar mudah di-*parsing* oleh sistem.

## 🛠️ Teknologi yang Digunakan

**Frontend:**
*   HTML5 & Vanilla JavaScript
*   Tailwind CSS (via CDN)
*   FontAwesome (Icons)

**Backend:**
*   Node.js
*   Express.js
*   Google Generative AI SDK (`@google/generative-ai`)
*   Dotenv & CORS

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda dan memiliki **API Key dari Google AI Studio**.

### 1. Kloning Repository
```bash
git clone [https://github.com/faridrahmatillah/Smart-Chef-AI.git](https://github.com/faridrahmatillah/Smart-Chef-AI.git)
cd Smart-Chef-AI
