# SentiWeb — 8-Skenario Sentiment Analyzer

## Stack
- **Frontend**: React 18 + Vite + Recharts
- **Backend**: Python Flask + scikit-learn + Gensim

## Cara Menjalankan

### 1. Backend
```bash
cd backend
pip install flask flask-cors scikit-learn gensim Sastrawi imbalanced-learn
python app.py
# → http://localhost:5000
```

### 2. Frontend (development)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 3. Frontend (production build)
```bash
cd frontend
npm run build
# hasil di folder dist/
```

## Struktur
```
sentiweb/
├── backend/
│   ├── app.py          ← Flask API
│   └── models/         ← semua file .pkl dan .bin
└── frontend/
    ├── src/
    │   ├── pages/      ← Predict, History, Batch, Compare, Matrix, Smote, WordCloud, About
    │   ├── components/ ← Layout, ui components
    │   ├── hooks/      ← usePredict
    │   ├── constants.js
    │   └── App.jsx
    └── package.json
```

## API Endpoints
- `POST /api/predict` → prediksi 6 model sekaligus
- `POST /api/batch`   → batch prediksi hingga 500 teks
- `GET  /api/health`  → cek status server
