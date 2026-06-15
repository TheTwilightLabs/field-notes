"use client";

import { FormEvent, useState } from "react";

export function LeadForm() {
  const [response, setResponse] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse("Brief captured. Connect this form to your CRM before launch.");
    event.currentTarget.reset();
  }
  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-heading"><span>PROJECT INQUIRY</span><span>FORM_001</span></div>
      <label>Work email<input type="email" placeholder="you@company.com" required /></label>
      <label>What are you trying to build?<textarea rows={4} placeholder="A short description of the problem..." required /></label>
      <label>Approximate budget<select required defaultValue=""><option value="">Select a range</option><option>$10k–$25k</option><option>$25k–$75k</option><option>$75k–$150k</option><option>$150k+</option></select></label>
      <button className="button primary form-submit" type="submit">Send project brief ↗</button>
      <p className="form-response" role="status">{response}</p>
    </form>
  );
}
