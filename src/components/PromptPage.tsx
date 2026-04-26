import React from 'react';

export default function PromptPage(){
  const prompt = `You are given a JSON document representing a multiple-choice quiz. The expected schema is:\n{\n  title?: string,\n  questions: [\n    {\n      question: string,\n      answers: [string, string, string, string],\n      correct?: number // zero-based index of the correct answer\n    }\n  ]\n}\n\nWhen processing this document, do the following:\n1) Validate that every question has exactly 4 answers. If any question differs, return a concise list of problematic question indices.\n2) If the 'correct' index is missing for a question, attempt to infer the correct answer by returning a best-guess index and a short justification (1-2 sentences).\n3) Normalize whitespace in questions and answers, trimming leading/trailing spaces and collapsing multiple internal spaces to one.\n4) Return the transformed JSON with the same schema and include a top-level key 'inference' listing any inferred answers and validations.\n\nOutput only valid JSON that matches the described transformed schema.`;

  return (
    <div>
      <div className="quiz-card">
        <h2>AI prompt for generating / processing Quiz JSON</h2>
        <p className="meta">Copy this prompt to an LLM to generate or normalize quiz JSON.</p>
        <pre style={{whiteSpace:'pre-wrap', background:'#f4f6f8', padding:12, borderRadius:8, marginTop:8, overflow:'auto'}}>{prompt}</pre>
      </div>
    </div>
  )
}
