import { createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { usePredict } from './hooks/usePredict'

import Predict   from './pages/Predict'
import History   from './pages/History'
import Batch     from './pages/Batch'
import Compare   from './pages/Compare'
import Matrix    from './pages/Matrix'
import Smote     from './pages/Smote'
import WordCloud from './pages/WordCloud'
import About     from './pages/About'

export const AppContext = createContext(null)

export default function App() {
  const predictor = usePredict()

  return (
    <AppContext.Provider value={predictor}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/"          element={<Predict />}   />
            <Route path="/history"   element={<History />}   />
            <Route path="/batch"     element={<Batch />}     />
            <Route path="/compare"   element={<Compare />}   />
            <Route path="/matrix"    element={<Matrix />}    />
            <Route path="/smote"     element={<Smote />}     />
            <Route path="/wordcloud" element={<WordCloud />} />
            <Route path="/about"     element={<About />}     />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
