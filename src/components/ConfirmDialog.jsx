import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    confirmRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onCancel(); }}>
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
          <button type="button" className="danger-btn" ref={confirmRef} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
