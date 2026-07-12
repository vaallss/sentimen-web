import { useContext, useState } from 'react'
import { AppContext } from '../App'
import { Card, SectionTitle, Button, EmptyState } from '../components/ui'
import { MODEL_KEYS, MODEL_INFO } from '../constants'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function WCPanel({ title, wordData, filter }) {
  const combined = {}
  if (filter === 'all' || filter === 'pos') Object.entries(wordData?.pos||{}).forEach(([w,c]) => combined[w] = (combined[w]||0)+c)
  if (filter === 'all' || filter === 'neg') Object.entries(wordData?.neg||{}).forEach(([w,c]) => combined[w] = (combined[w]||0)+c)
  const sorted = Object.entries(combined).sort((a,b)=>b[1]-a[1]).slice(0,30)

  if (!sorted.length) return (
    <Card>
      <SectionTitle>{title}</SectionTitle>
      <EmptyState icon="☁️" message="Prediksi dulu untuk melihat kata" />
    </Card>
  )

  const mx = sorted[0][1]
  return (
    <Card>
      <SectionTitle>{title}</SectionTitle>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6, alignItems:'center', minHeight:80 }}>
        {sorted.map(([w, c]) => {
          const sz = Math.round(11 + (c/mx)*16)
          const a  = 0.3 + (c/mx)*0.5
          const isPos = (wordData?.pos?.[w]||0) >= (wordData?.neg?.[w]||0)
          const color = isPos ? `rgba(22,163,74,${a})` : `rgba(220,38,38,${a})`
          return (
            <span key={w} title={`${w}: ${c}×`} style={{
              fontSize: sz, padding:'3px 9px', borderRadius:'var(--rs)',
              background: `${color}20`, color, border:`1px solid ${color}40`,
              cursor:'default', transition:'opacity .15s', whiteSpace:'nowrap'
            }}
            onMouseEnter={e=>e.target.style.opacity='.6'}
            onMouseLeave={e=>e.target.style.opacity='1'}>
              {w}
            </span>
          )
        })}
      </div>
    </Card>
  )
}

export default function WordCloud() {
  const { wordData } = useContext(AppContext)
  const [filter, setFilter] = useState('all')

  const all = {}
  MODEL_KEYS.forEach(k => {
    const pos = wordData[k]?.pos || {}
    const neg = wordData[k]?.neg || {}
    if (filter === 'all' || filter === 'pos') {
      Object.entries(pos).forEach(([w, c]) => { all[w] = (all[w]||0)+c })
    }
    if (filter === 'all' || filter === 'neg') {
      Object.entries(neg).forEach(([w, c]) => { all[w] = (all[w]||0)+c })
    }
  })
  const top10 = Object.entries(all).sort((a,b)=>b[1]-a[1]).slice(0,10)
    .map(([name,value]) => ({ name, value }))

  const filters = [
    { id:'all', label:'Semua kata' },
    { id:'pos', label:'😊 Positive' },
    { id:'neg', label:'😞 Negative' },
  ]

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:'20px', fontWeight:600 }}>Word cloud</h2>
        <p style={{ fontSize:'13px', color:'var(--text3)', marginTop:4 }}>
          Kata paling sering muncul dari ulasan yang diprediksi di sesi ini
        </p>
      </div>

      <Card>
        <SectionTitle>Filter berdasarkan sentimen</SectionTitle>
        <div style={{ display:'flex', gap:8 }}>
          {filters.map(f => (
            <Button key={f.id} variant={filter===f.id?'primary':'outline'}
              onClick={() => setFilter(f.id)}>
              {f.label}
            </Button>
          ))}
        </div>
      </Card>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
        {MODEL_KEYS.map(k => (
          <WCPanel key={k} title={MODEL_INFO[k].label} wordData={wordData[k]} filter={filter} />
        ))}
      </div>

      <Card>
        <SectionTitle>📊 Top 10 kata paling sering — semua model</SectionTitle>
        {top10.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={top10} layout="vertical" margin={{ left:10, right:20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f2f7" />
              <XAxis type="number" tick={{ fill:'#9ca3af', fontSize:11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill:'#374151', fontSize:12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5cc" radius={[0,5,5,0]} name="Frekuensi" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState icon="📊" message="Belum ada data — lakukan prediksi terlebih dahulu" />
        )}
      </Card>
    </div>
  )
}
