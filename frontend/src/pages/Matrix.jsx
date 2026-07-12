import { useState } from 'react'
import { Card, SectionTitle, Badge, Tag, Button, ProgressBar } from '../components/ui'
import { SCENARIOS, CHART_COLORS } from '../constants'

const C = CHART_COLORS
const best = Math.max(...SCENARIOS.map(s => s.acc))

function HeatmapCell({ value, total, good }) {
  const intensity = value / total
  const bg = good
    ? `rgba(22,163,74,${0.1 + intensity * 0.4})`
    : `rgba(220,38,38,${0.1 + intensity * 0.4})`
  const color = good ? 'var(--green)' : 'var(--red)'
  const border = good ? 'var(--green-b)' : 'var(--red-b)'
  return (
    <div style={{
      textAlign:'center', padding:'22px 8px', borderRadius:'var(--rs)',
      background: bg, color, border:`1px solid ${border}`,
      fontSize:'20px', fontWeight:700, transition:'all .3s'
    }}>
      {value}
    </div>
  )
}

export default function Matrix() {
  const [active, setActive] = useState(0)
  const s = SCENARIOS[active]
  const [[tn,fp],[fn,tp]] = s.cm
  const total = tn + fp + fn + tp

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:'20px', fontWeight:600 }}>Confusion matrix</h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', marginTop:4 }}>
          Klik skenario untuk melihat detail prediksi vs label aktual
        </p>
      </div>

      {/* Scenario selector */}
      <Card>
        <SectionTitle>Pilih skenario</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
          {SCENARIOS.map((sc,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:'8px 10px', borderRadius:'var(--rs)', fontSize:'11px',
              fontWeight: active===i ? 600 : 400, cursor:'pointer', border:'1.5px solid',
              borderColor: active===i ? 'var(--primary)' : 'var(--border)',
              background: active===i ? 'var(--primary-l)' : 'var(--surface)',
              color: active===i ? 'var(--primary)' : 'var(--text2)',
              transition:'all .12s'
            }}>
              {sc.label}
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {/* Heatmap */}
        <Card>
          <SectionTitle>{s.label}</SectionTitle>
          <div style={{ fontSize:'11px', color:'var(--text3)', textAlign:'center',
            marginBottom:8, fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px' }}>
            ← Prediksi →
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:4 }}>
            <div />
            {['Negative','Positive'].map(l => (
              <div key={l} style={{ textAlign:'center', padding:'6px', color:'var(--text3)',
                fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px' }}>
                {l}
              </div>
            ))}
            {[['Negative', tn, fp], ['Positive', fn, tp]].map(([label, v1, v2]) => (
              <>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end',
                  paddingRight:10, color:'var(--text3)', fontSize:'11px', fontWeight:600 }}>
                  {label}
                </div>
                <HeatmapCell value={v1} total={total} good={label==='Negative' ? true : false} />
                <HeatmapCell value={v2} total={total} good={label==='Positive' ? true : false} />
              </>
            ))}
          </div>
          <div style={{ display:'flex', gap:16, fontSize:'11px', color:'var(--text3)',
            marginTop:14, paddingTop:14, borderTop:'1px solid var(--border)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ width:12, height:12, background:'var(--green-l)', border:'1.5px solid var(--green-b)',
                borderRadius:3, display:'inline-block' }} />
              Prediksi benar (TN / TP)
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ width:12, height:12, background:'var(--red-l)', border:'1.5px solid var(--red-b)',
                borderRadius:3, display:'inline-block' }} />
              Prediksi salah (FP / FN)
            </span>
          </div>
        </Card>

        {/* Metrics */}
        <div>
          <Card>
            <SectionTitle>Metrik evaluasi</SectionTitle>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'12px' }}>
              <thead>
                <tr>
                  {['Kelas','Precision','Recall','F1-Score'].map((h,i) => (
                    <th key={i} style={{ textAlign: i===0?'left':'center', padding:'7px 10px',
                      color:'var(--text3)', fontWeight:600, fontSize:'10px',
                      textTransform:'uppercase', borderBottom:'2px solid var(--border)',
                      background:'var(--surface2)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding:'9px 10px', fontWeight:500, color:'var(--red)' }}>Negative</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.pn.toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.rn.toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.fn.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ padding:'9px 10px', fontWeight:500, color:'var(--green)' }}>Positive</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.pp.toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.rp.toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px' }}>{s.fp.toFixed(2)}</td>
                </tr>
                <tr style={{ borderTop:'2px solid var(--border)' }}>
                  <td style={{ padding:'9px 10px', fontWeight:600, color:'var(--text2)' }}>Macro avg</td>
                  <td style={{ textAlign:'center', padding:'9px 10px', fontWeight:600 }}>{((s.pn+s.pp)/2).toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px', fontWeight:600 }}>{((s.rn+s.rp)/2).toFixed(2)}</td>
                  <td style={{ textAlign:'center', padding:'9px 10px', fontWeight:600 }}>{s.mf.toFixed(2)}</td>
                </tr>
                <tr style={{ background:'var(--primary-l)' }}>
                  <td colSpan={3} style={{ padding:'9px 10px', color:'var(--primary)', fontWeight:500 }}>Accuracy</td>
                  <td style={{ textAlign:'center', padding:'9px 10px', color:'var(--primary)', fontWeight:700, fontSize:'18px' }}>
                    {(s.acc*100).toFixed(0)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card>
            <SectionTitle>Ranking akurasi semua skenario</SectionTitle>
            {SCENARIOS.map((sc,i) => (
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', marginBottom:3 }}>
                  <span style={{ color: i===active ? 'var(--primary)' : 'var(--text3)', fontWeight: i===active?600:400 }}>
                    {sc.label}
                  </span>
                  <span style={{ fontWeight:600, color: sc.acc===best ? 'var(--green)' : 'var(--text2)' }}>
                    {(sc.acc*100).toFixed(0)}%{sc.acc===best?' ★':''}
                  </span>
                </div>
                <ProgressBar value={sc.acc*100}
                  color={i===active ? 'var(--primary)' : sc.acc===best ? 'var(--green)' : 'var(--border2)'}
                  height={6} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
