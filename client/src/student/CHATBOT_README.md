# KidCoderClub Advanced AI Chatbot

## 🤖 Overview

Chatbot KidCoderClub telah diupgrade menggunakan Google Gemini AI untuk memberikan respons yang lebih cerdas dan kontekstual. Chatbot ini dirancang khusus untuk membantu anak-anak dalam platform pembelajaran coding KidCoderClub.

## ✨ Features

### 🧠 AI-Powered Responses
- Menggunakan Google Gemini AI untuk respons yang lebih natural dan akurat
- Konteks khusus untuk KidCoderClub platform
- Fallback responses jika AI tidak tersedia

### 🎨 Enhanced UI/UX
- Modern design dengan gradient backgrounds
- Typing indicator saat AI sedang berpikir
- Avatar untuk bot dan user
- Timestamp pada setiap pesan
- Improved animations dan transitions
- Auto-scroll ke pesan terbaru

### 🚀 Smart Features
- Quick reply buttons untuk pertanyaan umum
- Disabled input saat AI sedang memproses
- Error handling yang baik
- Conversation history untuk konteks yang lebih baik

## 🛠 Setup Instructions

### 1. Prerequisites
Pastikan Anda sudah menginstall:
- Node.js (v16 atau lebih baru)
- npm atau yarn

### 2. Install Dependencies
Package `@google/generative-ai` sudah terinstall. Jika belum, jalankan:

```bash
npm install @google/generative-ai
```

### 3. Environment Setup

#### Dapatkan API Key Gemini:
1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat project baru atau gunakan yang sudah ada
3. Generate API key

#### Setup Environment Variables:
1. Copy file `.env.example` ke `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` dan tambahkan API key Anda:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

## 📁 File Structure

```
src/
├── components/
│   └── Chatbot.tsx           # Main chatbot component
├── services/
│   └── geminiService.ts      # Gemini AI service handler
└── ...
.env.example                  # Environment template
.env.local                    # Your actual environment (gitignored)
```

## 🔧 Configuration

### Gemini Service Configuration

File `src/services/geminiService.ts` berisi:

- **System Prompt**: Konteks khusus untuk KidCoderClub
- **Error Handling**: Fallback responses jika API gagal
- **Conversation Context**: Menyimpan riwayat percakapan untuk konteks yang lebih baik

### Customization Options

#### 1. Ubah System Prompt
Edit method `getSystemPrompt()` di `geminiService.ts` untuk mengustomisasi karakter dan pengetahuan AI.

#### 2. Tambah Quick Replies
Edit array `quickReplies` di `Chatbot.tsx` untuk menambah pertanyaan cepat.

#### 3. Styling
Semua styling menggunakan Tailwind CSS dan bisa diubah di komponen `Chatbot.tsx`.

## 🎯 Usage

### Untuk Developer

1. **Import Chatbot**:
```tsx
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Chatbot />
    </div>
  );
}
```

2. **Customizing Responses**:
Chatbot akan secara otomatis memberikan respons yang relevan berdasarkan konteks KidCoderClub. Anda bisa menambah fallback responses di `geminiService.ts`.

### Untuk User

1. Klik icon bot di pojok kanan bawah
2. Gunakan quick replies atau ketik pertanyaan langsung
3. AI akan merespons dengan informasi yang relevan tentang:
   - Cara mendaftar kursus
   - Melihat sertifikat
   - Submit assignment
   - Join WhatsApp groups
   - Pertanyaan coding dasar
   - Dan lainnya

## 🔒 Security

- API key disimpan di environment variables
- Tidak ada sensitive data yang di-commit ke repository
- Error handling mencegah exposure informasi internal

## 📝 Troubleshooting

### API Key Issues
Jika Anda melihat pesan "AI service is not configured properly":
1. Pastikan file `.env.local` ada dan berisi API key
2. Restart development server setelah menambah environment variables
3. Periksa bahwa API key valid di Google AI Studio

### Quota/Rate Limiting
Jika Anda melihat pesan tentang high demand:
- Tunggu beberapa saat sebelum mencoba lagi
- Periksa quota di Google AI Studio
- Pertimbangkan upgrade ke plan berbayar jika diperlukan

### Fallback Mode
Jika Gemini AI tidak tersedia, chatbot akan otomatis beralih ke fallback responses yang telah ditentukan.

## 🚀 Future Enhancements

- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Integration dengan user authentication
- [ ] Persistent chat history
- [ ] File upload support
- [ ] Integration dengan course progress tracking

## 💡 Tips

1. **Performance**: Chatbot menyimpan maksimal 6 pesan terakhir untuk konteks, menghindari API calls yang terlalu besar
2. **UX**: Typing indicator dan disabled state memberikan feedback yang jelas kepada user
3. **Reliability**: Fallback system memastikan chatbot tetap berfungsi meski AI service bermasalah

---

**Note**: Chatbot ini dirancang khusus untuk anak-anak, jadi selalu gunakan bahasa yang ramah dan age-appropriate dalam kustomisasi.