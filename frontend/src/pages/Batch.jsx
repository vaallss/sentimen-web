import { useState } from 'react'
import { Card, MetricCard, Badge, Button, EmptyState } from '../components/ui'
import { MODEL_KEYS, MODEL_INFO } from '../constants'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CLRS = ['#16a34a','#dc2626']

export default function Batch() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(false)

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (e) => {
      const lines = e.target.result.split('\n').filter(l=>l.trim())
      const st = lines[0].toLowerCase().includes('ulasan')||lines[0].toLowerCase().includes('text') ? 1 : 0
      const texts = lines.slice(st, st+500).map(l=>l.split(',')[0].replace(/"/g,'').trim()).filter(t=>t)
      setLoading(true)
      const r = await fetch('/api/batch', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ texts })
      })
      const d = await r.json()
      setData(d)
      setLoading(false)
    }
    reader.readAsText(file)
  }

  const expCSV = () => {
    let c = 'No,Teks,NB+TF,SVM+TF,NB+W2V,SVM+W2V,NB+W2V+S,SVM+W2V+S\n'
    data.forEach((d,i) => {
      c += `${i+1},"${d.text.replace(/"/g,'""')}",${MODEL_KEYS.map(k=>d[k]||'').join(',')}\n`
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([c],{type:'text/csv'}))
    a.download = 'hasil_batch.csv'
    a.click()
  }

  const counts = MODEL_KEYS.map(k => data.filter(d=>d[k]==='Positive').length)
  const agr    = data.filter(d=>d.nb_tf===d.svm_tf).length
  const n      = data.length

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:'20px',fontWeight:600}}>Upload & batch</h2>
        <p style={{fontSize:'13px',color:'var(--text3)',marginTop:4}}>
          Upload file CSV — kolom pertama teks ulasan, maks 500 baris
        </p>
      </div>

      <Card>
        <div
          onClick={()=>document.getElementById('fi').click()}
          onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='var(--primary)'}}
          onDragLeave={e=>{e.currentTarget.style.borderColor='var(--border2)'}}
          onDrop={e=>{e.preventDefault();handleFile(e.dataTransfer.files[0])}}
          style={{
            border:'2px dashed var(--border2)', borderRadius:'var(--r)',
            padding:'36px', textAlign:'center', cursor:'pointer',
            background:'var(--surface2)', transition:'all .15s'
          }}
        >
          <div style={{fontSize:'36px',marginBottom:10}}>📁</div>
          <div style={{fontSize:'15px',fontWeight:600,color:'var(--text)',marginBottom:4}}>
            {loading ? '⏳ Memproses...' : 'Seret atau klik untuk upload CSV'}
          </div>
          <div style={{fontSize:'12px',color:'var(--text3)'}}>
            Kolom pertama = teks ulasan · maks 500 baris
          </div>
          <input type="file" id="fi" accept=".csv" style={{display:'none'}}
            onChange={e=>handleFile(e.target.files[0])} />
        </div>
      </Card>

      {data.length > 0 && (
        <>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10,marginBottom:16}}>
            <MetricCard label="Total" value={n} />
            <MetricCard label="NB+TF Pos" value={counts[0]} color="var(--green)" sub={`${(counts[0]/n*100).toFixed(0)}%`} />
            <MetricCard label="SVM+TF Pos" value={counts[1]} color="var(--green)" sub={`${(counts[1]/n*100).toFixed(0)}%`} />
            <MetricCard label="NB+W2V Pos" value={counts[2]} color="var(--amber)" sub={`${(counts[2]/n*100).toFixed(0)}%`} />
            <MetricCard label="SVM+W2V Pos" value={counts[3]} color="var(--amber)" sub={`${(counts[3]/n*100).toFixed(0)}%`} />
            <MetricCard label="TF Sepakat" value={`${(agr/n*100).toFixed(0)}%`} color="var(--primary)" />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:14}}>
            {MODEL_KEYS.map((k,i) => (
              <Card key={k}>
                <div style={{fontSize:'11px',fontWeight:600,color:'var(--text3)',
                  textTransform:'uppercase',letterSpacing:'.8px',marginBottom:12}}>
                  {MODEL_INFO[k].label}
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={[{name:'Positive',value:counts[i]},{name:'Negative',value:n-counts[i]}]}
                      dataKey="value" cx="50%" cy="50%" outerRadius={60}>
                      {CLRS.map((c,j)=><Cell key={j} fill={c} />)}
                    </Pie>
                    <Tooltip formatter={(v)=>`${v} (${(v/n*100).toFixed(1)}%)`} />
                    <Legend wrapperStyle={{fontSize:11}} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            ))}
          </div>

          <Card>
            <div style={{display:'flex',alignItems:'center',marginBottom:12}}>
              <div style={{fontSize:'11px',fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'.8px'}}>
                Hasil klasifikasi
              </div>
              <Button variant="outline" onClick={expCSV} style={{marginLeft:'auto'}}>
                ⬇ Download CSV
              </Button>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}>
                <thead>
                  <tr>
                    {['#','Teks','NB+TF','SVM+TF','NB+W2V','SVM+W2V','NB+W2V+S','SVM+W2V+S'].map((h,i)=>(
                      <th key={i} style={{textAlign:'left',padding:'8px 10px',
                        color:'var(--text3)',fontWeight:600,fontSize:'10px',
                        textTransform:'uppercase',borderBottom:'2px solid var(--border)',
                        background:'var(--surface2)',whiteSpace:'nowrap'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((d,i)=>(
                    <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                      <td style={{padding:'8px 10px',color:'var(--text3)',width:36}}>{i+1}</td>
                      <td style={{padding:'8px 10px',maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={d.text}>{d.text}</td>
                      {MODEL_KEYS.map(k=>(
                        <td key={k} style={{padding:'8px 10px'}}>
                          <Badge type={d[k]==='Positive'?'positive':'negative'}>
                            {d[k]==='Positive'?'Pos':'Neg'}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
