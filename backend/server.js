const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit besar karena menerima gambar Base64

// Inisialisasi Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-recipe', async (req, res) => {
    try {
        const { imageBase64, mimeType, textPrompt } = req.body;

        const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

        const systemPrompt = `
        Kamu adalah koki profesional Michelin Star. Analisis gambar/teks bahan makanan berikut, dan buatkan 1 resep masakan kreatif.
        Kamu HARUS merespon HANYA dengan format JSON valid tanpa format markdown (jangan gunakan \`\`\`json).
        Struktur JSON wajib:
        {
            "nama_resep": "String",
            "waktu_masak": "String",
            "kesulitan": "Mudah / Sedang / Sulit",
            "alasan": "String 1 kalimat",
            "bahan_lengkap": ["String", "String"],
            "langkah_masak": ["String", "String"]
        }
        `;

        const promptContent = systemPrompt + (textPrompt ? `\n\nInstruksi user: ${textPrompt}` : "");
        const parts = [{ text: promptContent }];

        if (imageBase64) {
            parts.push({
                inlineData: {
                    data: imageBase64,
                    mimeType: mimeType
                }
            });
        }

        // Eksekusi AI
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const aiResponse = result.response.text();
        const recipeData = JSON.parse(aiResponse);

        // Kirim hasil JSON kembali ke Frontend
        res.json({ success: true, data: recipeData });

    } catch (error) {
        console.error("Error AI:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server Backend berjalan di http://localhost:${port}`);
});