import { Card, SectionTitle, Badge, Tag, InsightBox, MetricCard } from '../components/ui'
import { SCENARIOS, CHART_COLORS } from '../constants'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend
} from 'recharts'

const C = CHART_COLORS
const best = Math.max(...SCENARIOS.map(s => s.acc))

function RadarComp({ scA, scB, labelA, labelB, colorA, colorB, minVal }) {
  const axes = ['Accuracy','P(Neg)','R(Neg)','F1(Neg)','P(Pos)','R(Pos)','F1(Pos)']
  const keys = ['acc','pn','rn','fn','pp','rp','fp']
  const data = axes.map((ax, i) => ({
    subject: ax,
    A: Math.round(scA[keys[i]] * 100),
    B: Math.round(scB[keys[i]] * 100),
  }))
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e4e7ef" />
        <PolarAngleAxis dataKey="subject" tick={{ fill:'#6b7280', fontSize:10 }} />
        <Radar name={labelA} dataKey="A" stroke={colorA} fill={colorA} fillOpacity={0.1} strokeWidth={2} dot={{ r:3 }} />
        <Radar name={labelB} dataKey="B" stroke={colorB} fill={colorB} fillOpacity={0.1} strokeWidth={2} dot={{ r:3 }} />
        <Legend wrapperStyle={{ fontSize:11 }} />
        <Tooltip formatter={v => v + '%'} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default function Compare() {
  const barData = SCENARIOS.map(s => ({ name: s.label, value: +(s.acc*100).toFixed(1), isBest: s.acc === best, feat: s.feat }))

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:'20px', fontWeight:600 }}>Perbandingan model</h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', marginTop:4 }}>
          Evaluasi lengkap 8 skenario — NB vs SVM × TF-IDF vs W2V × tanpa vs dengan SMOTE
        </p>
      </div>

      {/* Summary metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:10, marginBottom:16 }}>
        <MetricCard label="Model terbaik" value="SVM+TF-IDF" color="var(--primary)" sub="Tanpa SMOTE" />
        <MetricCard label="Akurasi tertinggi" value="93%" color="var(--green)" sub="SVM + TF-IDF" />
        <MetricCard label="Macro F1 terbaik" value="0.92" color="var(--green)" sub="SVM + TF-IDF" />
        <MetricCard label="TF-IDF vs W2V" value="+17%" sub="keunggulan akurasi" />
        <MetricCard label="SVM vs NB" value="+3%" sub="pada fitur sama" />
      </div>

      {/* Bar chart */}
      <Card>
        <SectionTitle>📊 Akurasi semua 8 skenario</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} layout="vertical" margin={{ left:10, right:30 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f2f7" />
            <XAxis type="number" domain={[60,100]} tickFormatter={v=>v+'%'} tick={{ fill:'#9ca3af', fontSize:11 }} />
            <YAxis type="category" dataKey="name" width={150} tick={{ fill:'#374151', fontSize:11 }} />
            <Tooltip formatter={v => [v+'%','Akurasi']} />
            <Bar dataKey="value" radius={[0,5,5,0]}>
              {barData.map((d,i) => (
                <Cell key={i} fill={d.isBest ? C.green : d.feat==='TF-IDF' ? C.primary+'cc' : C.blue+'88'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Radar grids */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Card>
          <SectionTitle>Radar — NB vs SVM (TF-IDF)</SectionTitle>
          <RadarComp scA={SCENARIOS[0]} scB={SCENARIOS[1]} labelA="NB" labelB="SVM" colorA={C.primary} colorB={C.green} />
        </Card>
        <Card>
          <SectionTitle>Radar — NB vs SVM (Word2Vec)</SectionTitle>
          <RadarComp scA={SCENARIOS[4]} scB={SCENARIOS[5]} labelA="NB" labelB="SVM" colorA={C.primary} colorB={C.green} />
        </Card>
        <Card>
          <SectionTitle>Radar — TF-IDF vs W2V (NB)</SectionTitle>
          <RadarComp scA={SCENARIOS[0]} scB={SCENARIOS[4]} labelA="TF-IDF" labelB="W2V" colorA={C.blue} colorB={C.amber} />
        </Card>
        <Card>
          <SectionTitle>Radar — TF-IDF vs W2V (SVM)</SectionTitle>
          <RadarComp scA={SCENARIOS[1]} scB={SCENARIOS[5]} labelA="TF-IDF" labelB="W2V" colorA={C.blue} colorB={C.amber} />
        </Card>
      </div>

      {/* Full table */}
      <Card>
        <SectionTitle>📋 Tabel evaluasi lengkap</SectionTitle>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
            <thead>
              <tr>
                {['Model','Fitur','SMOTE','Accuracy','P(Neg)','R(Neg)','F1(Neg)','P(Pos)','R(Pos)','F1(Pos)','Macro F1'].map((h,i) => (
                  <th key={i} style={{ textAlign:'left', padding:'9px 12px', color:'var(--text3)',
                    fontWeight:600, fontSize:'10px', textTransform:'uppercase',
                    borderBottom:'2px solid var(--border)', background:'var(--surface2)',
                    whiteSpace:'nowrap', letterSpacing:'.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s,i) => {
                const isBest = s.acc === best
                return (
                  <tr key={i} style={{ background: isBest ? 'var(--primary-l)' : 'transparent' }}
                    onMouseEnter={e=>e.currentTarget.style.background=isBest?'var(--primary-l)':'var(--surface2)'}
                    onMouseLeave={e=>e.currentTarget.style.background=isBest?'var(--primary-l)':'transparent'}>
                    <td style={{ padding:'9px 12px', fontWeight:isBest?600:400 }}>
                      {s.model}
                      {isBest && <Badge type="best" style={{marginLeft:6}}>★ Best</Badge>}
                    </td>
                    <td style={{ padding:'9px 12px' }}><Tag type={s.feat==='TF-IDF'?'tfidf':'w2v'}>{s.feat}</Tag></td>
                    <td style={{ padding:'9px 12px' }}><Tag type={s.smote?'smote':'nosmote'}>{s.smote?'Ya':'Tidak'}</Tag></td>
                    <td style={{ padding:'9px 12px', fontWeight:isBest?700:600, color:isBest?'var(--green)':'var(--text)' }}>{(s.acc*100).toFixed(0)}%</td>
                    {[s.pn,s.rn,s.fn,s.pp,s.rp,s.fp,s.mf].map((v,j) => (
                      <td key={j} style={{ padding:'9px 12px' }}>{v.toFixed(2)}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <InsightBox>
        <strong>Kesimpulan:</strong> Model terbaik adalah <strong>SVM + TF-IDF tanpa SMOTE</strong> dengan akurasi <strong>93%</strong> dan macro F1 <strong>0.92</strong>.
        TF-IDF secara konsisten mengungguli Word2Vec (~17–20%), menunjukkan representasi frekuensi kata lebih efektif untuk ulasan berbahasa Indonesia.
        Pada fitur yang sama, SVM selalu lebih unggul dari NB (+3%). SMOTE tidak memberi dampak signifikan karena distribusi kelas sudah relatif seimbang.
      </InsightBox>
    </div>
  )
}
