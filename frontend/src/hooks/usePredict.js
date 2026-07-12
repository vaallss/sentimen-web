import { useState, useCallback } from 'react'

export function usePredict() {
  // State untuk melacak status pemuatan (loading state)
  const [loading, setLoading]     = useState(false)
  // State untuk menyimpan hasil prediksi dari backend (berisi 6 model)
  const [result, setResult]       = useState(null)
  // State untuk menyimpan pesan error jika terjadi kesalahan
  const [error, setError]         = useState(null)
  // State untuk menyimpan riwayat prediksi (teks dan hasil)
  const [history, setHistory]     = useState([])
  // State untuk menyimpan frekuensi kata (untuk Word Cloud) dibagi positif/negatif per model
  const [wordData, setWordData]   = useState({})

  // Fungsi utama untuk mengirim teks ke backend dan mendapatkan prediksi
  const predict = useCallback(async (text) => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    try {
      // Mengirim request POST ke endpoint backend Flask
      const r = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const d = await r.json()
      if (d.error) throw new Error(d.error)
      
      setResult(d) // Simpan hasil prediksi (objek berisi 6 model)
      
      // Simpan ke riwayat pencarian (maksimal 200 riwayat terbaru)
      setHistory(prev => [{
        text, data: d,
        time: new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })
      }, ...prev].slice(0, 200))

      // Proses Data untuk Word Cloud menggunakan teks hasil preprocessing backend (clean)
      // agar terhindar dari stopword seperti "yang", "dan", "saya", dll.
      // Kami mengambil teks 'clean' dari salah satu hasil prediksi model.
      const firstModelKey = Object.keys(d)[0];
      const cleanText = d[firstModelKey]?.clean || text;
      
      // Ambil kata-kata dengan panjang lebih dari 2 huruf (misal: "oke", "top", "bagus")
      const words = cleanText.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/).filter(w=>w.length>2)
      
      setWordData(prev => {
        const next = { ...prev }
        // Iterasi setiap model (nb_tf, svm_tf, dll.) dari hasil prediksi
        Object.entries(d).forEach(([k, v]) => {
          if (!next[k]) next[k] = { pos:{}, neg:{} }
          
          // Tentukan apakah model ini memprediksi kata-kata tersebut positif atau negatif
          const bucket = v.label === 'Positive' ? 'pos' : 'neg'
          
          // Tambahkan frekuensi kemunculan kata ke "bucket" (pos/neg) masing-masing model
          words.forEach(w => {
            next[k][bucket][w] = (next[k][bucket][w] || 0) + 1
          })
        })
        return next
      })
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }, [])

  const clearHistory = () => setHistory([])

  return { predict, loading, result, error, history, clearHistory, wordData }
}
