// Variabel ini akan ngebantu banget pas mau ganti ke URL server hosting nanti
const API_URL = 'http://localhost:3000/api/generate-recipe';

const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const loadingState = document.getElementById('loading-state');
const resultContainer = document.getElementById('result-container');
const errorMsg = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

let base64Image = null;
let mimeType = null;

// Preview & Convert Image
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        mimeType = file.type;
        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            imagePreview.classList.remove('hidden');
            base64Image = event.target.result.split(',')[1];
        };
        reader.readAsDataURL(file);
    }
});

// Trigger API
generateBtn.addEventListener('click', async () => {
    if (!base64Image && !textInput.value.trim()) {
        showError("Masukkan bahan makanan di kolom teks terlebih dahulu!");
        return;
    }

    hideError();
    resultContainer.classList.add('hidden');
    resultContainer.classList.remove('opacity-100');
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');
    generateBtn.disabled = true;
    generateBtn.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        // fetch ke API_URL yang di set di paling atas file
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageBase64: base64Image,
                mimeType: mimeType,
                textPrompt: textInput.value
            })
        });

        const result = await response.json();

        if (!result.success) throw new Error(result.message);

        renderRecipe(result.data);

    } catch (err) {
        console.error(err);
        if (err.message === 'Failed to fetch') {
            showError("Server Backend belum menyala. Buka terminal VS Code dan jalankan 'node server.js'.");
        } else {
            showError("Terjadi kesalahan: " + err.message);
        }
    } finally {
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        generateBtn.disabled = false;
        generateBtn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
});

function renderRecipe(data) {
    document.getElementById('recipe-title').innerText = data.nama_resep;
    document.getElementById('recipe-reason').innerText = data.alasan;

    let difficultyColor = data.kesulitan.toLowerCase() === 'mudah' ? 'bg-emerald-500' : (data.kesulitan.toLowerCase() === 'sedang' ? 'bg-amber-500' : 'bg-red-500');
    document.getElementById('recipe-badges').innerHTML = `
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-600 flex items-center gap-1"><i class="fa-regular fa-clock"></i> ${data.waktu_masak}</span>
        <span class="px-3 py-1 rounded-full text-xs font-bold text-white ${difficultyColor}">${data.kesulitan}</span>
    `;

    document.getElementById('ingredients-list').innerHTML = data.bahan_lengkap.map(bahan => `
        <li class="flex items-start gap-2 border-b border-slate-200 pb-2 last:border-0"><i class="fa-solid fa-check text-orange-500 mt-1 text-sm"></i> <span>${bahan}</span></li>
    `).join('');

    document.getElementById('steps-list').innerHTML = data.langkah_masak.map((langkah, index) => `
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shadow-sm">${index + 1}</div>
            <p class="text-slate-700 pt-1 leading-relaxed">${langkah}</p>
        </div>
    `).join('');

    resultContainer.classList.remove('hidden');
    setTimeout(() => resultContainer.classList.add('opacity-100'), 50);
}

function showError(msg) { errorText.innerText = msg; errorMsg.classList.remove('hidden'); }
function hideError() { errorMsg.classList.add('hidden'); }