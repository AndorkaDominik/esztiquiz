import { useState } from 'react'
import './App.css'
import QuizImporter from './components/QuizImporter'
import QuizPractice from './components/QuizPractice'
import QuizAnswers from './components/QuizAnswers'
import PromptPage from './components/PromptPage'
import { useEffect } from 'react'

function App(){
  const [quiz, setQuiz] = useState<any>(null)
  const [page, setPage] = useState<'import'|'practice'|'answers'|'prompt'>('import')
  const [uploads, setUploads] = useState<any[]>([])
  const [showUploads, setShowUploads] = useState(false)

  useEffect(()=>{
    // try to load public/stat.json as a built-in upload
    (async ()=>{
      try{
        const res = await fetch('/stat.json');
        if(!res.ok) return;
        const j = await res.json();
        setUploads(u=>{
          // avoid duplicate if already present by title
          if(u.find(x=>x.title === j.title)) return u;
          return [j, ...u];
        })
        // set as active quiz on first load
        setQuiz(j);
        setPage('practice');
      }catch(e){ /* ignore */ }
    })()
  }, [])

  const loadSample = async ()=>{
    try{
      const res = await fetch('/stat.json');
      const j = await res.json();
      setQuiz(j);
      setPage('practice');
    }catch(e){ alert('Failed to load sample'); }
  }

  const shuffleQuestions = ()=>{
    if(!quiz) return;
    const shuffled = { ...quiz, questions: [...quiz.questions].sort(()=>Math.random()-0.5) };
    setQuiz(shuffled);
    setPage('practice');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand">Quiz Studio</div>
        </div>
        <nav className="topbar-nav">
          <button onClick={()=>setPage('import')}>Import</button>
          <button onClick={()=>setPage('practice')} disabled={!quiz}>Practice</button>
          <button onClick={()=>setPage('answers')} disabled={!quiz}>Answers</button>
          <button onClick={()=>setPage('prompt')}>AI Prompt</button>
        </nav>
      </header>

      <div className="layout">
        <main className="content">
          {page==='import' && <QuizImporter onLoad={(q)=>{ setQuiz(q); setUploads(prev=>[q, ...prev]); setPage('practice'); }} />}
          {page==='practice' && <QuizPractice quiz={quiz} />}
          {page==='answers' && <QuizAnswers quiz={quiz} />}
          {page==='prompt' && <PromptPage />}

          <section style={{marginTop:20}}>
            <div className="quiz-card">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <strong>Uploaded quizzes</strong>
                <div style={{display:'flex', gap:8}}>
                  <button onClick={loadSample}>Load sample</button>
                  <button onClick={shuffleQuestions} disabled={!quiz}>Shuffle</button>
                </div>
              </div>
              <div style={{marginTop:12}}>
                {uploads.length===0 ? <div className="meta">No uploads yet</div> : (
                  uploads.map((u,i)=>(
                    <div key={i} className="upload-item" style={{marginBottom:10}}>
                      <div className="upload-title">{u.title || `Upload #${i+1}`}</div>
                      <div className="upload-actions">
                        <button onClick={()=>{ setQuiz(u); setPage('practice'); }}>Open</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
