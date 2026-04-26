import { useState, useEffect } from 'react';

export default function QuizPractice({ quiz }: { quiz: any }){
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);


  useEffect(()=>{
    setIndex(0); setSelected(null); setCorrectCount(0); setFinished(false);
  }, [quiz]);

  if(!quiz) return <div>No quiz loaded</div>
  const q = quiz.questions[index];

  const submitAnswer = () => {
    if(selected === null) return;
    const isCorrect = typeof q.correct === 'number' ? selected === q.correct : false;
    if(isCorrect) setCorrectCount(c=>c+1);
    setRevealed(true);
    // if last question, finish after revealing
    if(index + 1 >= quiz.questions.length){
      setFinished(true);
    }
  }

  const restart = () => { setIndex(0); setSelected(null); setCorrectCount(0); setFinished(false); setRevealed(false); }

  const next = () => { setIndex(i=>i+1); setSelected(null); setRevealed(false); }

  return (
    <div className="quiz-card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>{quiz.title || 'Quiz'}</h2>
        <div>
          <span className="chip count">{index+1}/{quiz.questions.length}</span>
          <span className="chip score">{correctCount} pts</span>
        </div>
      </div>
      <div className="meta">Question {index+1} / {quiz.questions.length} — Score: {correctCount}</div>

      {!finished ? (
        <>
          <p className="question">{q.question}</p>
          <ul className="answers">
            {q.answers.map((a: string, i:number)=> {
              let cls = '';
              if(revealed){
                if(typeof q.correct === 'number' && i === q.correct) cls = 'correct';
                else if(selected === i && i !== q.correct) cls = 'incorrect';
              } else if(selected === i){ cls = 'selected' }
              return (
                <li key={i} className={cls} onClick={()=>{ if(!revealed) setSelected(i) }}>{a}</li>
              )
            })}
          </ul>
          <div className="controls">
            {!revealed ? (
              <button onClick={submitAnswer} disabled={selected===null}>Submit</button>
            ) : (
              index + 1 < quiz.questions.length ? (
                <button onClick={next}>Next question</button>
              ) : (
                <button onClick={restart}>See results</button>
              )
            )}
          </div>
        </>
      ) : (
        <div className="finished">
          <h3>Finished</h3>
          <p>You answered {correctCount} out of {quiz.questions.length} correctly.</p>
          <p>{correctCount === quiz.questions.length ? 'Perfect! Great job!' : (correctCount >= Math.ceil(quiz.questions.length/2) ? 'Nice work — keep practicing!' : 'Keep trying — you will improve!')}</p>
          <div className="controls">
            <button onClick={restart}>Play again</button>
          </div>
        </div>
      )}
    </div>
  )
}
