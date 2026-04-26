import React from 'react';

type Quiz = {
  title?: string;
  questions: Array<{ question: string; answers: string[]; correct?: number }>
}

export default function QuizImporter({ onLoad }: { onLoad: (q: Quiz) => void }){
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(String(reader.result));
        onLoad(parsed);
      }catch(err){
        alert('Invalid JSON');
      }
    }
    reader.readAsText(f);
  }

  return (
    <div className="quiz-card">
      <h2>Import Quiz JSON</h2>
      <p className="meta">Drop a JSON file or pick one. Expected schema shown below.</p>
      <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12}}>
        <input type="file" accept="application/json" onChange={handleFile} />
      </div>
      <pre style={{background:'#f4f6f8', padding:12, borderRadius:8, marginTop:12, fontSize:13, overflow:'auto'}}>{`{
  title?: string,
  questions: [
    { question: string, answers: [string,string,string,string], correct?: number }
  ]
}`}</pre>
    </div>
  )
}
