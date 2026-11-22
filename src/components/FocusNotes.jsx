import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { focusNotes } from '../data/focusNotes.js';

export default function FocusNotes() {
  const [active, setActive] = useState(0);
  const slide = focusNotes[active];
  const move = step => setActive(current => (current + step + focusNotes.length) % focusNotes.length);

  return (
    <section className="focus-notes" aria-label="Focus Notes carousel" aria-roledescription="carousel">
      <div className="note-copy">
        <div className="note-eyebrow">FOCUS NOTES <span className="note-counter">{slide.counter}</span></div>
        <h3 key={`title-${slide.id}`}>{slide.title}</h3>
        <p key={`body-${slide.id}`}>{slide.body}</p>
      </div>

      <div className="note-preview" aria-hidden="true">
        <span className="preview-check">✓</span>
        <span className="preview-lines">
          {slide.preview.tag && <small>{slide.preview.tag}</small>}
          <strong>{slide.preview.label}</strong>
        </span>
        {slide.preview.value && <span className="preview-value">{slide.preview.value}</span>}
      </div>

      <div className="note-controls">
        <div className="note-dots" role="group" aria-label="Choose a Focus Note">
          {focusNotes.map((note, index) => (
            <button
              key={note.id}
              className={`note-dot ${active === index ? 'selected' : ''}`}
              aria-label={`Go to Focus Note ${index + 1}: ${note.title}`}
              aria-current={active === index ? 'true' : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button className="note-arrow" aria-label="Previous Focus Note" onClick={() => move(-1)}><ArrowLeft size={17} /></button>
        <button className="note-arrow" aria-label="Next Focus Note" onClick={() => move(1)}><ArrowRight size={17} /></button>
      </div>
    </section>
  );
}
