import { useContext } from 'react'
import { AppContext } from '../App'
import { Card, MetricCard, Badge, Button, EmptyState } from '../components/ui'
import { MODEL_KEYS, MODEL_INFO } from '../constants'

export default function History() {
  const { history, clearHistory } = useContext(AppContext)

  const dl = () => {
    let c = 'Waktu,Teks,NB+TF,SVM+TF,NB+W2V,SVM+W2V,NB+W2V+S,SVM+W2V+S\n'
    history.forEach(h => {
      const vals = MODEL_KEYS.map(k => h.data[k]?.label||'').join(',')
      c += `${h.time},"${h.text.replace(/"/g,'""')}",${vals}\n`
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([c],{type:'text/csv'}))
    a.download = 'riwayat_prediksi.csv'
    a.click()
  }

  const nbPos  = history.filter(h=>h.data?.nb_tf?.label==='Positive').length
  const svmPos = history.filter(h=>h.data?.svm_tf?.label==='Positive').length
  const agr    = history.filter(h=>h.data?.nb_tf?.label===h.data?.svm_tf?.label).length

  return (
    <div>
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:'20px',fontWeight:600}}>Riwayat prediksi</h2>
        <p style={{fontSize:'13px',color:'var(--text3)',marginTop:4}}>Semua prediksi di sesi ini</p>
      </div>

      <Card>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:10,marginBottom:16}}>
          <MetricCard label="Total prediksi" value={history.length} />
          <MetricCard label="NB+TF Positive" value={nbPos} color="var(--green)" />
          <MetricCard label="SVM+TF Positive" value={svmPos} color="var(--green)" />
          <MetricCard label="TF-IDF Sepakat" value={history.length ? (agr/history.length*100).toFixed(0)+'%' : '—'} color="var(--primary)" />
        </div>

        <div style={{display:'flex',gap:8,marginBottom:14}}>
          <Button variant="outline" onClick={clearHistory}>🗑 Hapus semua</Button>
          <Button variant="outline" onClick={dl} disabled={!history.length}>⬇ Export CSV</Button>
        </div>

        {!history.length
          ? <EmptyState icon="📭" message="Belum ada riwayat prediksi" />
          : history.map((h, i) => (
            <div key={i} style={{
              display:'flex',alignItems:'flex-start',gap:12,
              padding:'10px 0',borderBottom:'1px solid var(--border)'
            }}>
              <div style={{fontSize:'11px',color:'var(--text4)',flexShrink:0,width:42,marginTop:2}}>
                {h.time}
              </div>
              <div style={{
                flex:1,fontSize:'13px',color:'var(--text2)',
                overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'
              }} title={h.text}>{h.text}</div>
              <div style={{display:'flex',gap:4,flexShrink:0}}>
                {['nb_tf','svm_tf','nb_w2v','svm_w2v'].map(k => (
                  <Badge key={k} type={h.data[k]?.label==='Positive'?'positive':'negative'}>
                    {h.data[k]?.label?.[0] || '?'}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        }
      </Card>
    </div>
  )
}
