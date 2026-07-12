import { Card, SectionTitle, Tag, InsightBox, MetricCard, ProgressBar } from '../components/ui'
import { SCENARIOS, CHART_COLORS } from '../constants'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

const C = CHART_COLORS
const PAIRS = [{b:0,s:2},{b:1,s:3},{b:4,s:6},{b:5,s:7}]
const PAIR_LABELS = ['NB+TF-IDF','SVM+TF-IDF','NB+W2V','SVM+W2V']

export default function Smote() {
  const chartData = PAIR_LABELS.map((label, i) => ({
    name: label,
    'Sebelum SMOTE': +(SCENARIOS[PAIRS[i].b].acc * 100).toFixed(1),
    'Sesudah SMOTE':  +(SCENARIOS[PAIRS[i].s].acc * 100).toFixed(1),
  }))

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:'20px', fontWeight:600 }}>Dampak SMOTE</h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', marginTop:4 }}>
          Perbandingan performa model sebelum dan sesudah oversampling kelas minoritas
        </p>
      </div>

      {/* Distribusi */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Card>
          <SectionTitle>📊 Distribusi data — sebelum SMOTE</SectionTitle>
          <div style={{ marginBottom:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:4 }}>
              <span style={{ color:'var(--red)', fontWeight:500 }}>Negative</span>
              <span style={{ fontWeight:600 }}>2.821 (52.2%)</span>
            </div>
            <ProgressBar value={52.2} color="var(--red)" />
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:4 }}>
              <span style={{ color:'var(--green)', fontWeight:500 }}>Positive</span>
              <span style={{ fontWeight:600 }}>2.579 (47.8%)</span>
            </div>
            <ProgressBar value={47.8} color="var(--green)" />
          </div>
          <div style={{ marginTop:10, fontSize:'12px', color:'var(--text4)',
            display:'flex', alignItems:'center', gap:6 }}>
            📌 Total: 5.400 data · Tidak seimbang
          </div>
        </Card>
        <Card>
          <SectionTitle>✅ Distribusi data — sesudah SMOTE</SectionTitle>
          <div style={{ marginBottom:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:4 }}>
              <span style={{ color:'var(--red)', fontWeight:500 }}>Negative</span>
              <span style={{ fontWeight:600 }}>2.821 (50%)</span>
            </div>
            <ProgressBar value={50} color="var(--red)" />
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:4 }}>
              <span style={{ color:'var(--green)', fontWeight:500 }}>Positive</span>
              <span style={{ fontWeight:600 }}>2.821 (50%)</span>
            </div>
            <ProgressBar value={50} color="var(--green)" />
          </div>
          <div style={{ marginTop:10, fontSize:'12px', color:'var(--green)',
            display:'flex', alignItems:'center', gap:6 }}>
            ✓ Total: 5.642 data · Perfectly balanced
          </div>
        </Card>
      </div>

      {/* Bar chart */}
      <Card>
        <SectionTitle>📊 Akurasi sebelum vs sesudah SMOTE</SectionTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top:5, right:20, bottom:5, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f7" />
            <XAxis dataKey="name" tick={{ fill:'#374151', fontSize:12 }} />
            <YAxis domain={[60,100]} tickFormatter={v=>v+'%'} tick={{ fill:'#9ca3af', fontSize:11 }} />
            <Tooltip formatter={v => v+'%'} />
            <Legend wrapperStyle={{ fontSize:12 }} />
            <Bar dataKey="Sebelum SMOTE" fill={C.primary+'bb'} radius={[4,4,0,0]} />
            <Bar dataKey="Sesudah SMOTE" fill={C.green+'bb'}   radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card>
        <SectionTitle>📋 Tabel perbandingan lengkap</SectionTitle>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
            <thead>
              <tr>
                {['Model','Fitur','Kondisi','Accuracy','Precision','Recall','Macro F1','Δ Akurasi'].map((h,i) => (
                  <th key={i} style={{ textAlign:'left', padding:'9px 12px',
                    color:'var(--text3)', fontWeight:600, fontSize:'10px',
                    textTransform:'uppercase', borderBottom:'2px solid var(--border)',
                    background:'var(--surface2)', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((p, pi) => {
                const b = SCENARIOS[p.b], a = SCENARIOS[p.s]
                const diff = (a.acc - b.acc) * 100
                const dc = diff > 0 ? 'var(--green)' : diff < 0 ? 'var(--red)' : 'var(--text3)'
                return (
                  <>
                    <tr key={`b${pi}`} style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={{ padding:'9px 12px', fontWeight:500 }}>{b.model}</td>
                      <td style={{ padding:'9px 12px' }}><Tag type={b.feat==='TF-IDF'?'tfidf':'w2v'}>{b.feat}</Tag></td>
                      <td style={{ padding:'9px 12px' }}><Tag>Sebelum</Tag></td>
                      <td style={{ padding:'9px 12px', fontWeight:600 }}>{(b.acc*100).toFixed(0)}%</td>
                      <td style={{ padding:'9px 12px' }}>{b.pn.toFixed(2)}</td>
                      <td style={{ padding:'9px 12px' }}>{b.rn.toFixed(2)}</td>
                      <td style={{ padding:'9px 12px' }}>{b.mf.toFixed(2)}</td>
                      <td rowSpan={2} style={{ padding:'9px 12px', textAlign:'center',
                        fontWeight:700, fontSize:'16px', color:dc, verticalAlign:'middle',
                        borderLeft:'1px solid var(--border)' }}>
                        {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                      </td>
                    </tr>
                    <tr key={`a${pi}`} style={{ borderBottom:'3px solid var(--border)' }}>
                      <td style={{ padding:'9px 12px', fontWeight:500 }}>{a.model}</td>
                      <td style={{ padding:'9px 12px' }}><Tag type={a.feat==='TF-IDF'?'tfidf':'w2v'}>{a.feat}</Tag></td>
                      <td style={{ padding:'9px 12px' }}><Tag type="smote">Sesudah</Tag></td>
                      <td style={{ padding:'9px 12px', fontWeight:600,
                        color: diff>=0?'var(--green)':'var(--red)' }}>{(a.acc*100).toFixed(0)}%</td>
                      <td style={{ padding:'9px 12px' }}>{a.pn.toFixed(2)}</td>
                      <td style={{ padding:'9px 12px' }}>{a.rn.toFixed(2)}</td>
                      <td style={{ padding:'9px 12px' }}>{a.mf.toFixed(2)}</td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <InsightBox>
        <strong>TF-IDF:</strong> NB+TF-IDF naik tipis 90%→91% (+1%). SVM+TF-IDF turun 93%→92% (−1%) — SVM sudah robust tanpa oversampling.<br/><br/>
        <strong>Word2Vec:</strong> Tidak ada peningkatan berarti setelah SMOTE. Bottleneck ada di kualitas representasi W2V, bukan distribusi kelas.<br/><br/>
        <strong>Kesimpulan:</strong> SMOTE tidak memberi dampak signifikan karena distribusi kelas sudah relatif seimbang (52.2% vs 47.8%). Model terbaik tetap <strong>SVM + TF-IDF tanpa SMOTE</strong> (93%).
      </InsightBox>
    </div>
  )
}
