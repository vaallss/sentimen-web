import { useState, useContext } from 'react'
import { AppContext } from '../App'
import { Card, SectionTitle, Badge, Tag, Button, ProgressBar, Divider, InsightBox } from '../components/ui'
import { MODEL_KEYS, MODEL_INFO } from '../constants'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#4f46e5','#16a34a','#d97706','#2563eb','#dc2626','#7c3aed']

function ModelPanel({ k, data }) {
  if (!data) return null
  const info = MODEL_INFO[k]
  const isPos = data.label === 'Positive'
  const pos = data.proba?.Positive || 0
  const neg = data.proba?.Negative || 0

  return (
    <div style={{
      background:'var(--surface)', border:`1.5px solid ${info.best ? 'var(--primary)' : 'var(--border)'}`,
      borderRadius:'var(--r)', padding:'16px', position:'relative',
      boxShadow: info.best ? '0 0 0 3px var(--primary-l)' : 'var(--shadow)',
      transition:'all .2s'
    }}>
      {info.best && (
        <span style={{
          position:'absolute', top:12, right:12,
          background:'var(--primary-l)', color:'var(--primary)',
          border:'1px solid var(--primary-m)', borderRadius:20,
          fontSize:'10px', fontWeight:600, padding:'2px 8px'
        }}>★ Best</span>
      )}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
        <div style={{fontSize:'13px',fontWeight:600,color:'var(--text)',paddingRight:info.best?60:0}}>
          {info.label}
        </div>
        <Badge type={isPos ? 'positive' : 'negative'}>{data.label}</Badge>
      </div>
      <div style={{display:'flex',gap:4,marginBottom:10,flexWrap:'wrap'}}>
        <Tag type={info.feat==='TF-IDF'?'tfidf':'w2v'}>{info.feat}</Tag>
        <Tag type={info.smote?'smote':'nosmote'}>{info.smote?'SMOTE':'No SMOTE'}</Tag>
        <Tag>Acc {info.acc}</Tag>
      </div>
      <div style={{
        fontSize:'10px',color:'var(--text3)',background:'var(--surface2)',
        padding:'5px 8px',borderRadius:'var(--rs)',marginBottom:10,
        fontFamily:'monospace',wordBreak:'break-all',lineHeight:1.5,
        border:'1px solid var(--border)'
      }}>
        {data.clean || '—'}
      </div>
      <div style={{marginBottom:7}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:3}}>
          <span style={{color:'var(--green)',fontWeight:500}}>Positive</span>
          <span style={{fontWeight:600}}>{pos}%</span>
        </div>
        <ProgressBar value={pos} color="var(--green)" />
      </div>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:3}}>
          <span style={{color:'var(--red)',fontWeight:500}}>Negative</span>
          <span style={{fontWeight:600}}>{neg}%</span>
        </div>
        <ProgressBar value={neg} color="var(--red)" />
      </div>
    </div>
  )
}

function RadarViz({ result }) {
  const accMap = {nb_tf:90,svm_tf:93,nb_w2v:71,svm_w2v:76,nb_w2v_s:71,svm_w2v_s:76}
  const axes = ['Pos conf','Neg conf','Train Acc','Train Prec','Train F1']
  const radarData = axes.map((ax, i) => {
    const point = { subject: ax }
    MODEL_KEYS.forEach(k => {
      if (i === 0) point[k] = result[k]?.proba?.Positive || 0
      else if (i === 1) point[k] = result[k]?.proba?.Negative || 0
      else point[k] = accMap[k]
    })
    return point
  })

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="#e4e7ef" />
        <PolarAngleAxis dataKey="subject" tick={{fill:'#6b7280',fontSize:11}} />
        <Tooltip formatter={(v) => v.toFixed(1)+'%'} />
        <Legend wrapperStyle={{fontSize:11}} />
        {MODEL_KEYS.map((k, i) => (
          <Radar key={k} name={MODEL_INFO[k].label} dataKey={k}
            stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.08}
            strokeWidth={2} dot={{r:3}} />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default function Predict() {
  const { predict, loading, result, error } = useContext(AppContext)
  const [text, setText] = useState('')

  const handleSubmit = () => predict(text)
  const handleKey = (e) => { if (e.ctrlKey && e.key === 'Enter') handleSubmit() }

  const tfModels  = ['nb_tf', 'svm_tf']
  const w2vModels = ['nb_w2v', 'svm_w2v', 'nb_w2v_s', 'svm_w2v_s']

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:'20px',fontWeight:600,letterSpacing:'-.3px'}}>Prediksi sentimen</h2>
        <p style={{fontSize:'13px',color:'var(--text3)',marginTop:4}}>
          Analisis ulasan menggunakan 6 model aktif — NB & SVM × TF-IDF & W2V × tanpa & dengan SMOTE
        </p>
      </div>

      <Card>
        <label style={{fontSize:'12px',fontWeight:500,color:'var(--text2)',display:'block',marginBottom:6}}>
          Teks ulasan produk
        </label>
        <textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={handleKey}
          rows={4} placeholder="Contoh: Barang datang cepat, kualitas bagus sesuai deskripsi..."
          style={{
            width:'100%', background:'var(--surface)',
            border:'1.5px solid var(--border)', borderRadius:'var(--rs)',
            padding:'10px 12px', fontSize:'13px', color:'var(--text)',
            fontFamily:'inherit', outline:'none', resize:'vertical',
            transition:'border .15s', lineHeight:1.5
          }}
          onFocus={e=>e.target.style.borderColor='var(--primary)'}
          onBlur={e=>e.target.style.borderColor='var(--border)'}
        />
        <div style={{display:'flex',gap:8,alignItems:'center',marginTop:12}}>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? '⏳ Menganalisis...' : '🔍 Analisis sekarang'}
          </Button>
          <Button variant="outline" onClick={()=>{setText('');}} disabled={loading}>
            ↺ Reset
          </Button>
          <span style={{fontSize:'11px',color:'var(--text4)',marginLeft:'auto'}}>
            <kbd style={{background:'var(--surface2)',border:'1px solid var(--border)',
              borderRadius:4,padding:'2px 6px',fontSize:'10px'}}>Ctrl+Enter</kbd>
          </span>
        </div>
        {error && (
          <div style={{marginTop:10,padding:'8px 12px',background:'var(--red-l)',
            border:'1px solid var(--red-b)',borderRadius:'var(--rs)',
            fontSize:'13px',color:'var(--red)'}}>⚠️ {error}</div>
        )}
      </Card>

      {result && (
        <>
          <Card style={{marginBottom:16}}>
            <SectionTitle>📖 Glosarium Model & Fitur</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <InsightBox type="primary">
                <div style={{fontWeight:600,marginBottom:4}}>🎯 Jenis Model</div>
                <ul style={{margin:0,paddingLeft:16,listStyle:'circle',color:'var(--text2)'}}>
                  <li style={{marginBottom:4}}><b>Naive Bayes (NB):</b> Model probabilistik yang cepat, mengandalkan perhitungan peluang kemunculan kata. Cocok untuk teks dasar.</li>
                  <li><b>Support Vector Machine (SVM):</b> Model matematis yang mencari garis pemisah terbaik antara kalimat positif dan negatif. Lebih akurat mengenali pola rumit.</li>
                </ul>
              </InsightBox>
              <InsightBox type="warning">
                <div style={{fontWeight:600,marginBottom:4}}>🧩 Ekstraksi Fitur & Teknik</div>
                <ul style={{margin:0,paddingLeft:16,listStyle:'circle',color:'var(--text2)'}}>
                  <li style={{marginBottom:4}}><b>TF-IDF:</b> Mengubah teks jadi angka berdasarkan seberapa sering kata muncul (frekuensi). Kurang paham konteks makna kata.</li>
                  <li style={{marginBottom:4}}><b>Word2Vec (W2V):</b> Mengubah kata jadi vektor yang paham makna semantik. (Misal: "Bagus" dekat maknanya dengan "Keren").</li>
                  <li><b>SMOTE:</b> Teknik menyeimbangkan data saat training agar model tidak bias ke kelas mayoritas.</li>
                </ul>
              </InsightBox>
            </div>
          </Card>

          {/* TF-IDF group */}
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
            <div style={{height:1,background:'var(--border)',flex:1}}/>
            <div style={{fontSize:'12px',fontWeight:600,color:'var(--text2)',
              padding:'5px 12px',background:'var(--blue-l)',
              border:'1px solid var(--blue-b)',borderRadius:20}}>
              📘 TF-IDF — berbasis frekuensi kata
            </div>
            <div style={{height:1,background:'var(--border)',flex:1}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
            {tfModels.map(k => <ModelPanel key={k} k={k} data={result[k]} />)}
          </div>

          {/* W2V group */}
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
            <div style={{height:1,background:'var(--border)',flex:1}}/>
            <div style={{fontSize:'12px',fontWeight:600,color:'var(--text2)',
              padding:'5px 12px',background:'var(--amber-l)',
              border:'1px solid var(--amber-b)',borderRadius:20}}>
              🧠 Word2Vec — berbasis semantik kata
            </div>
            <div style={{height:1,background:'var(--border)',flex:1}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
            {w2vModels.map(k => <ModelPanel key={k} k={k} data={result[k]} />)}
          </div>

          {/* Summary */}
          <Card>
            <SectionTitle>📊 Ringkasan & Rekomendasi</SectionTitle>
            {(() => {
              const nb = result.nb_tf, svm = result.svm_tf
              const nbw = result.nb_w2v, svmw = result.svm_w2v
              const tfOk  = nb?.label === svm?.label
              const w2vOk = nbw?.label === svmw?.label
              const vote = {Positive:0,Negative:0}
              MODEL_KEYS.forEach(k => { if(result[k]) vote[result[k].label]++ })
              const maj = vote.Positive >= vote.Negative ? 'Positive' : 'Negative'
              return (
                <>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
                    <div style={{
                      padding:'12px',borderRadius:'var(--rs)',
                      background:tfOk?'var(--green-l)':'var(--amber-l)',
                      border:`1px solid ${tfOk?'var(--green-b)':'var(--amber-b)'}`
                    }}>
                      <div style={{fontSize:'11px',color:'var(--text3)',fontWeight:600,
                        textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>
                        TF-IDF Models
                      </div>
                      <div style={{fontSize:'13px',display:'flex',gap:8,flexWrap:'wrap',marginBottom:6}}>
                        <span>NB → <Badge type={nb?.label==='Positive'?'positive':'negative'}>{nb?.label}</Badge></span>
                        <span>SVM → <Badge type={svm?.label==='Positive'?'positive':'negative'}>{svm?.label}</Badge></span>
                      </div>
                      <div style={{fontSize:'12px',color:tfOk?'var(--green)':'var(--amber)',fontWeight:500}}>
                        {tfOk ? '✓ Kedua model sepakat' : '⚠ Kedua model berbeda pendapat'}
                      </div>
                    </div>
                    <div style={{
                      padding:'12px',borderRadius:'var(--rs)',
                      background:w2vOk?'var(--green-l)':'var(--amber-l)',
                      border:`1px solid ${w2vOk?'var(--green-b)':'var(--amber-b)'}`
                    }}>
                      <div style={{fontSize:'11px',color:'var(--text3)',fontWeight:600,
                        textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>
                        Word2Vec Models
                      </div>
                      <div style={{fontSize:'13px',display:'flex',gap:8,flexWrap:'wrap',marginBottom:6}}>
                        <span>NB → <Badge type="amber">{nbw?.label}</Badge></span>
                        <span>SVM → <Badge type="amber">{svmw?.label}</Badge></span>
                      </div>
                      <div style={{fontSize:'12px',color:w2vOk?'var(--green)':'var(--amber)',fontWeight:500}}>
                        {w2vOk ? '✓ Kedua model sepakat' : '⚠ Kedua model berbeda pendapat'}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding:'14px 16px',background:'var(--primary-l)',
                    border:'1.5px solid var(--primary-m)',borderRadius:'var(--rs)',
                    display:'flex',alignItems:'center',gap:14
                  }}>
                    <span style={{fontSize:'22px'}}>⭐</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'12px',color:'var(--text3)',marginBottom:3}}>
                        Rekomendasi — SVM + TF-IDF (akurasi tertinggi 93%)
                      </div>
                      <div style={{fontSize:'16px',fontWeight:700,color:'var(--primary)',display:'flex',alignItems:'center',gap:8}}>
                        {svm?.label}
                        <Badge type={svm?.label==='Positive'?'positive':'negative'}>{svm?.label}</Badge>
                      </div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'11px',color:'var(--text3)',marginBottom:3}}>Voting 6 model</div>
                      <div style={{fontSize:'13px',fontWeight:600}}>
                        <span style={{color:'var(--green)'}}>{vote.Positive} Pos</span>
                        {' · '}
                        <span style={{color:'var(--red)'}}>{vote.Negative} Neg</span>
                      </div>
                    </div>
                  </div>
                </>
              )
            })()}
            <Divider />
            <SectionTitle>📡 Radar Confidence — 6 Model</SectionTitle>
            <RadarViz result={result} />
          </Card>
        </>
      )}
    </div>
  )
}
