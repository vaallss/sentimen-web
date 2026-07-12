import { Card, SectionTitle, Tag, Badge, Divider, InsightBox } from '../components/ui'
import { SCENARIOS } from '../constants'
import { 
  Award, 
  BookOpen, 
  Scale, 
  Layers, 
  Cpu, 
  Settings, 
  Play, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react'

const PIPELINE = ['Case Folding (Lowercase)', 'Noise Removal (Cleaning)', 'Stopword Removal (Sastrawi)', 'Stemming (Sastrawi)']

export default function About() {
  // Find the best scenario
  const bestAcc = Math.max(...SCENARIOS.map(s => s.acc))
  
  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-.3px' }}>Tentang Sistem & Penelitian</h2>
        <p style={{ fontSize: '13px', color: 'var(--text3)', marginTop: 4 }}>
          Detail metodologi, hasil evaluasi skenario, kesimpulan riset, dan instruksi deployment sistem.
        </p>
      </div>

      {/* Research Title Card - Sleek dark gradient card */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        color: '#ffffff',
        borderRadius: 'var(--r)',
        padding: '24px',
        marginBottom: 20,
        boxShadow: 'var(--shadow-md)',
        border: '1px solid #4338ca',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative circle */}
        <div style={{
          position: 'absolute', right: '-40px', bottom: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: 'rgba(79, 70, 229, 0.15)', filter: 'blur(20px)'
        }} />
        
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, background: '#4f46e5', color: '#fff', padding: '3px 8px', borderRadius: 20 }}>
            TUGAS AKHIR / PENELITIAN ILMIAH
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(255,255,255,0.1)', color: '#e0e7ff', padding: '3px 8px', borderRadius: 20 }}>
            KLASIFIKASI SENTIMEN
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, background: '#10b981', color: '#fff', padding: '3px 8px', borderRadius: 20 }}>
            8 SKENARIO UJI
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.4, margin: '0 0 10px 0', color: '#ffffff' }}>
          PERBANDINGAN NAIVE BAYES DAN SVM DENGAN TF-IDF, WORD2VEC, DAN SMOTE UNTUK KLASIFIKASI SENTIMEN ULASAN PRODUK BERBASIS WEB
        </h3>
        
        <p style={{ fontSize: '12px', color: '#c7d2fe', lineHeight: 1.6, maxWidth: '90%' }}>
          Fokus utama penelitian ini adalah menganalisis kinerja algoritma pembelajaran mesin berbasis probabilistik (Naive Bayes) dibandingkan dengan model berbasis margin geometris (Support Vector Machine) menggunakan dua teknik representasi fitur yang berbeda (TF-IDF dan Word2Vec), serta mengukur dampak penyeimbangan kelas minoritas menggunakan metode SMOTE (Synthetic Minority Over-sampling Technique) pada dataset ulasan produk.
        </p>
      </div>

      {/* 4 Pillars of Research Conclusions */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <BookOpen size={16} color="var(--primary)" /> Kesimpulan Utama Penelitian
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Pillar 1: Best Model */}
          <Card style={{ margin: 0, borderTop: '4px solid var(--green)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green-l)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                <Award size={16} color="var(--green)" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>1. Model Terbaik (Best Performer)</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.6 }}>
              Kombinasi <strong style={{ color: 'var(--green)' }}>SVM + TF-IDF Tanpa SMOTE</strong> menghasilkan performa tertinggi dengan tingkat akurasi <strong>93%</strong> dan skor Macro F1 <strong>0.92</strong>. Model SVM dengan parameter kernel Radial Basis Function (RBF) sangat efektif memetakan bobot frekuensi kata dari TF-IDF menjadi batas klasifikasi (hyperplane) yang optimal.
            </div>
          </Card>

          {/* Pillar 2: TF-IDF vs Word2Vec */}
          <Card style={{ margin: 0, borderTop: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={16} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>2. Representasi Fitur: TF-IDF vs Word2Vec</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.6 }}>
              Ekstraksi fitur <strong style={{ color: 'var(--primary)' }}>TF-IDF unggul telak ~17%</strong> dibanding Word2Vec (akurasi tertinggi W2V hanya 76%). Pada ulasan produk Indonesia, kehadiran kata kunci sentimen spesifik (seperti <em>"kecewa"</em>, <em>"rusak"</em>, <em>"bagus"</em>) lebih mudah dideteksi melalui nilai frekuensi statistik TF-IDF daripada rata-rata vektor semantik Word2Vec.
            </div>
          </Card>

          {/* Pillar 3: SVM vs Naive Bayes */}
          <Card style={{ margin: 0, borderTop: '4px solid var(--blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--blue-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={16} color="var(--blue)" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>3. Perbandingan Algoritma: SVM vs NB</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.6 }}>
              Algoritma <strong style={{ color: 'var(--blue)' }}>SVM secara konsisten mengungguli Naive Bayes</strong> pada ekstraksi fitur yang sama dengan selisih <strong>2% s/d 5%</strong>. SVM terbukti lebih tangguh bekerja di ruang dimensi tinggi (terutama TF-IDF) tanpa terpengaruh masalah asumsi independensi fitur yang inheren pada Naive Bayes.
            </div>
          </Card>

          {/* Pillar 4: SMOTE Influence */}
          <Card style={{ margin: 0, borderTop: '4px solid var(--amber)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--amber-l)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scale size={16} color="var(--amber)" />
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>4. Pengaruh SMOTE (Oversampling)</div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.6 }}>
              Penerapan SMOTE <strong style={{ color: 'var(--amber)' }}>tidak memberi dampak signifikan</strong> terhadap performa (berkisar antara -1% s/d +1%). Hal ini disebabkan distribusi dataset awal yang sudah cukup seimbang (52.2% negatif vs 47.8% positif). SMOTE bahkan menurunkan performa SVM + TF-IDF dari 93% ke 92% karena potensi noise dari sampel sintetis.
            </div>
          </Card>
        </div>
      </div>

      {/* 8 Scenarios Table */}
      <Card style={{ marginBottom: 20 }}>
        <SectionTitle>📋 Ringkasan Hasil Uji Evaluasi (8 Skenario Penelitian)</SectionTitle>
        <div style={{ overflowX: 'auto', marginTop: 10 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['ID Skenario', 'Model', 'Ekstraksi Fitur', 'SMOTE', 'Akurasi', 'Macro F1', 'Status Sistem'].map((h, i) => (
                  <th key={i} style={{
                    textAlign: 'left', padding: '10px 12px', color: 'var(--text3)',
                    fontWeight: 600, fontSize: '10px', textTransform: 'uppercase',
                    borderBottom: '2px solid var(--border)', letterSpacing: '.5px'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s, i) => {
                const isBest = s.acc === bestAcc
                // Active models in API: all except tfidf+smote
                const isActive = s.id !== 'nb_tf_s' && s.id !== 'svm_tf_s'
                return (
                  <tr key={i} style={{ 
                    borderBottom: '1px solid var(--border)',
                    background: isBest ? 'var(--green-l)' : 'transparent',
                    fontWeight: isBest ? 500 : 400
                  }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: 'var(--text2)' }}>
                      {s.id} {isBest && <span style={{ color: 'var(--amber)', marginLeft: 4 }}>★</span>}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <strong>{s.model}</strong>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <Tag type={s.feat === 'TF-IDF' ? 'tfidf' : 'w2v'}>{s.feat}</Tag>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <Tag type={s.smote ? 'smote' : 'nosmote'}>{s.smote ? 'Ya (SMOTE)' : 'Tidak'}</Tag>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: isBest ? 'var(--green)' : 'var(--text)' }}>
                      {(s.acc * 100).toFixed(0)}%
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                      {s.mf.toFixed(2)}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      {isActive ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--green)', fontSize: '11px', fontWeight: 500 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                          Aktif (Live API)
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--text4)', fontSize: '11px' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text4)' }} />
                          Riset Teoretis
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'flex-start' }}>
          <div style={{ marginTop: 2 }}><CheckCircle2 size={14} color="var(--green)" /></div>
          <p style={{ fontSize: '11px', color: 'var(--text3)', margin: 0, lineHeight: 1.4 }}>
            <strong>Catatan Implementasi:</strong> Sistem backend mengaktifkan 6 model (live API) untuk pengujian real-time dan analisis batch. Skenario TF-IDF + SMOTE tidak disematkan ke dalam API produksi karena performanya tidak melampaui versi TF-IDF konvensional dan untuk menghemat konsumsi memori backend.
          </p>
        </div>
      </Card>

      {/* Preprocessing and Vectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14, marginBottom: 20 }}>
        {/* Preprocessing Pipeline */}
        <Card style={{ margin: 0 }}>
          <SectionTitle>🔄 Alur Pemrosesan Teks (Preprocessing Pipeline)</SectionTitle>
          <p style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: 12 }}>
            Setiap ulasan mentah diproses melalui tahapan berikut sebelum diekstrak fiturnya:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PIPELINE.map((step, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', background: 'var(--surface2)',
                borderRadius: 'var(--rs)', border: '1px solid var(--border)'
              }}>
                <div style={{ 
                  width: 20, height: 20, borderRadius: '50%', background: 'var(--primary)', 
                  color: '#fff', fontSize: '10px', fontWeight: 600, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)' }}>{step}</div>
                {i === 2 && <span style={{ fontSize: '10px', color: 'var(--text4)', marginLeft: 'auto' }}>Kamus Sastrawi</span>}
                {i === 3 && <span style={{ fontSize: '10px', color: 'var(--text4)', marginLeft: 'auto' }}>Kata Dasar</span>}
              </div>
            ))}
          </div>
        </Card>

        {/* Vectorization comparison */}
        <Card style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <SectionTitle>⚙️ Detail Vektor Fitur</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>1. TF-IDF Vectorizer</span>
                  <Tag type="tfidf">TF-IDF</Tag>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.5 }}>
                  Term Frequency - Inverse Document Frequency dengan batas maksimal <strong>5.000 fitur (kosakata unik)</strong>. Unggul dalam membedakan bobot kata penting.
                </p>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>2. Word2Vec Embeddings</span>
                  <Tag type="w2v">Word2Vec</Tag>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: 1.5 }}>
                  Model representasi semantik kontinu <strong>100 dimensi</strong>. Menggunakan pembobotan rata-rata (mean vector) dari seluruh kata dalam ulasan.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tech Stack & Execution Guide */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }}>
        {/* Tech Stack */}
        <Card style={{ margin: 0 }}>
          <SectionTitle>🛠️ Spesifikasi Teknologi (Tech Stack)</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Antarmuka (Frontend)', value: 'React 18 + Vite', icon: '⚛️' },
              { label: 'Server API (Backend)', value: 'Python Flask', icon: '🐍' },
              { label: 'Visualisasi Data', value: 'Recharts', icon: '📊' },
              { label: 'Pembelajaran Mesin', value: 'scikit-learn', icon: '🤖' },
              { label: 'Pengolahan Bahasa (NLP)', value: 'Sastrawi + Gensim', icon: '🔤' },
              { label: 'Oversampling (SMOTE)', value: 'imbalanced-learn (SMOTE)', icon: '⚖️' },
            ].map((row, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', background: 'var(--surface2)',
                borderRadius: 'var(--rs)', border: '1px solid var(--border)'
              }}>
                <span style={{ fontSize: '14px' }}>{row.icon}</span>
                <span style={{ fontSize: '11px', color: 'var(--text3)', width: 130 }}>{row.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)', marginLeft: 'auto' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Execution Guide */}
        <Card style={{ margin: 0 }}>
          <SectionTitle>🚀 Cara Menjalankan Sistem</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text2)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Settings size={12} color="var(--primary)" /> 1. Instalasi & Jalankan Backend (Flask)
              </div>
              <div style={{ 
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--text2)',
                background: 'var(--surface2)', padding: '10px 12px', borderRadius: 'var(--rs)',
                border: '1px solid var(--border)', lineHeight: 1.8
              }}>
                <span style={{ color: 'var(--text4)' }}># Install dependensi Python</span><br/>
                pip install flask flask-cors scikit-learn gensim Sastrawi imbalanced-learn<br/>
                <span style={{ color: 'var(--text4)' }}># Jalankan server Flask (Port 5000)</span><br/>
                cd backend && python app.py
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text2)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Play size={12} color="var(--primary)" /> 2. Jalankan Frontend (React)
              </div>
              <div style={{ 
                fontFamily: 'monospace', fontSize: '11px', color: 'var(--text2)',
                background: 'var(--surface2)', padding: '10px 12px', borderRadius: 'var(--rs)',
                border: '1px solid var(--border)', lineHeight: 1.8
              }}>
                <span style={{ color: 'var(--text4)' }}># Install node modules & jalankan dev mode</span><br/>
                cd frontend && npm install<br/>
                npm run dev <span style={{ color: 'var(--primary)' }}>(Akses: http://localhost:5173)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
