import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  Search,
  History,
  FolderOpen,
  BarChart3,
  LayoutGrid,
  Scale,
  Cloud,
  Info
} from 'lucide-react'

const NAV_ITEMS = [
  { section: 'Analisis' },
  { to: '/',          icon: Search,      label: 'Prediksi sentimen' },
  { to: '/history',   icon: History,     label: 'Riwayat prediksi'  },
  { to: '/batch',     icon: FolderOpen,  label: 'Upload & batch'    },
  { section: 'Evaluasi' },
  { to: '/compare',   icon: BarChart3,   label: 'Perbandingan model' },
  { to: '/matrix',    icon: LayoutGrid,  label: 'Confusion matrix'  },
  { to: '/smote',     icon: Scale,       label: 'Dampak SMOTE'      },
  { to: '/wordcloud', icon: Cloud,       label: 'Word cloud'        },
  { section: 'Info' },
  { to: '/about',     icon: Info,        label: 'Tentang sistem'   },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background:'var(--surface)',
        borderRight:'1px solid var(--border)',
        display:'flex', flexDirection:'column',
        position:'sticky', top:0, height:'100vh', overflowY:'auto', flexShrink:0
      }}>
        {/* Logo */}
        <div style={{
          padding:'20px', borderBottom:'1px solid var(--border)'
        }}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{
              width:34, height:34, background:'var(--primary)',
              borderRadius:'var(--rs)', display:'flex', alignItems:'center',
              justifyContent:'center'
            }}>
              <BarChart3 size={18} color="#ffffff" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{fontWeight:700,fontSize:'15px',color:'var(--text)'}}>SentiWeb</div>
              <div style={{fontSize:'11px',color:'var(--text4)'}}>8-Skenario Analyzer</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding:'10px 10px', flex:1 }}>
          {NAV_ITEMS.map((item, i) => {
            if (item.section) return (
              <div key={i} style={{
                fontSize:'10px', fontWeight:600, color:'var(--text4)',
                textTransform:'uppercase', letterSpacing:'1px',
                padding:'14px 10px 5px'
              }}>{item.section}</div>
            )
            const isActive = pathname === item.to
            const Icon = item.icon
            return (
              <Link key={item.to} to={item.to} style={{
                display:'flex', alignItems:'center', gap:'10px',
                padding:'8px 12px', borderRadius:'var(--rs)',
                fontSize:'13px', fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--primary)' : 'var(--text2)',
                background: isActive ? 'var(--primary-l)' : 'transparent',
                textDecoration:'none', margin:'1px 0',
                transition:'all .12s'
              }}>
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} style={{
                  color: isActive ? 'var(--primary)' : 'var(--text3)',
                  transition: 'color .12s'
                }} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding:'14px 20px', borderTop:'1px solid var(--border)',
          fontSize:'11px', color:'var(--text4)'
        }}>
          NB & SVM × TF-IDF & W2V<br/>
          Model terbaik: SVM+TF-IDF (93%)
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, padding:'28px 32px', maxWidth:1100, overflowX:'hidden' }}>
        {children}
      </main>
    </div>
  )
}
