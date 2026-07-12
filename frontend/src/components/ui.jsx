import clsx from 'clsx'

export function Card({ children, className, ...props }) {
  return (
    <div className={clsx('card', className)} style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      borderRadius:'var(--r)', padding:'20px', boxShadow:'var(--shadow)',
      marginBottom:'16px', ...props.style
    }} {...props}>{children}</div>
  )
}

export function SectionTitle({ children }) {
  return (
    <div style={{fontSize:'11px',fontWeight:600,color:'var(--text3)',
      textTransform:'uppercase',letterSpacing:'.8px',marginBottom:'14px'}}>
      {children}
    </div>
  )
}

export function Badge({ type, children }) {
  const styles = {
    positive: { background:'var(--green-l)', color:'var(--green)', border:'1px solid var(--green-b)' },
    negative: { background:'var(--red-l)',   color:'var(--red)',   border:'1px solid var(--red-b)'   },
    best:     { background:'var(--primary-l)',color:'var(--primary)',border:'1px solid var(--primary-m)'},
    amber:    { background:'var(--amber-l)', color:'var(--amber)', border:'1px solid var(--amber-b)' },
    blue:     { background:'var(--blue-l)',  color:'var(--blue)',  border:'1px solid var(--blue-b)'  },
    gray:     { background:'var(--surface2)',color:'var(--text3)', border:'1px solid var(--border)'  },
  }
  return (
    <span style={{display:'inline-flex',alignItems:'center',padding:'2px 9px',
      borderRadius:'20px',fontSize:'11px',fontWeight:600,...(styles[type]||styles.gray)}}>
      {children}
    </span>
  )
}

export function Tag({ type, children }) {
  const styles = {
    tfidf:  { background:'var(--blue-l)',  color:'var(--blue)'  },
    w2v:    { background:'var(--amber-l)', color:'var(--amber)' },
    smote:  { background:'var(--green-l)', color:'var(--green)' },
    nosmote:{ background:'var(--surface2)',color:'var(--text3)' },
  }
  return (
    <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'20px',
      fontWeight:500,...(styles[type]||styles.nosmote)}}>
      {children}
    </span>
  )
}

export function Button({ variant='primary', children, ...props }) {
  const base = {
    padding:'8px 16px', borderRadius:'var(--rs)', fontSize:'13px',
    fontWeight:500, cursor:'pointer', border:'none', transition:'all .12s',
    display:'inline-flex', alignItems:'center', gap:'6px',
    opacity: props.disabled ? .45 : 1,
  }
  const variants = {
    primary: { background:'var(--primary)', color:'#fff' },
    outline: { background:'var(--surface)', color:'var(--text2)',
               border:'1.5px solid var(--border)' },
    ghost:   { background:'transparent', color:'var(--text3)', border:'none' },
  }
  return (
    <button style={{...base,...variants[variant]}} {...props}>
      {children}
    </button>
  )
}

export function ProgressBar({ value, color = 'var(--primary)', height = 7 }) {
  return (
    <div style={{height, background:'var(--surface2)', borderRadius:4,
      overflow:'hidden', border:'1px solid var(--border)'}}>
      <div style={{height:'100%', width:`${value}%`, background:color,
        borderRadius:4, transition:'width .5s ease'}} />
    </div>
  )
}

export function MetricCard({ label, value, sub, color }) {
  return (
    <div style={{background:'var(--surface2)', border:'1px solid var(--border)',
      borderRadius:'var(--rs)', padding:'14px 16px'}}>
      <div style={{fontSize:'10px',color:'var(--text3)',fontWeight:600,
        textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{label}</div>
      <div style={{fontSize:'22px',fontWeight:600,color:color||'var(--text)',lineHeight:1}}>{value}</div>
      {sub && <div style={{fontSize:'11px',color:'var(--text4)',marginTop:4}}>{sub}</div>}
    </div>
  )
}

export function Divider() {
  return <div style={{height:1,background:'var(--border)',margin:'16px 0'}} />
}

export function InsightBox({ children, type = 'primary' }) {
  const s = {
    primary: { background:'var(--primary-l)', border:'1px solid var(--primary-m)', color:'var(--text2)' },
    warning: { background:'var(--amber-l)',   border:'1px solid var(--amber-b)',   color:'var(--text2)' },
  }
  return (
    <div style={{borderRadius:'var(--r)',padding:'16px',fontSize:'13px',
      lineHeight:1.8,...s[type]}}>{children}</div>
  )
}

export function EmptyState({ icon, message }) {
  return (
    <div style={{textAlign:'center',padding:'36px',color:'var(--text4)'}}>
      <div style={{fontSize:'32px',marginBottom:'10px'}}>{icon}</div>
      <div style={{fontSize:'13px'}}>{message}</div>
    </div>
  )
}

export function Table({ headers, children }) {
  return (
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}>
        <thead>
          <tr>
            {headers.map((h,i) => (
              <th key={i} style={{textAlign:'left',padding:'9px 12px',
                color:'var(--text3)',fontWeight:600,fontSize:'10px',
                textTransform:'uppercase',letterSpacing:'.5px',
                borderBottom:'2px solid var(--border)',background:'var(--surface2)',
                whiteSpace:'nowrap'}}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
