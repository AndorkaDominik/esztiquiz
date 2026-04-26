import React from 'react';

export default function QuizAnswers({ quiz }: { quiz: any }){
  if(!quiz) return <div className="quiz-card">No quiz loaded</div>
  return (
    <div className="quiz-card">
      <h2>Answers — {quiz.title || 'Quiz'}</h2>
      <div className="meta">{quiz.questions.length} questions</div>
      <ol style={{paddingLeft:20}}>
        {quiz.questions.map((q:any, idx:number)=> (
          <li key={idx} style={{marginBottom:18}}>
            <div style={{fontWeight:700, marginBottom:6}}>{idx+1}. {q.question}</div>
            <div style={{color:'#2b6cb0', fontWeight:600}}>Correct answer: {typeof q.correct === 'number' ? q.answers[q.correct] : 'Not specified'}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
