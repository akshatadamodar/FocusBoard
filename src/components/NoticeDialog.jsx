import { useEffect, useRef } from 'react';

export default function NoticeDialog({ notice, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!notice) return undefined;
    closeRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [notice, onClose]);

  if (!notice) return null;

  return (
    <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="confirm-dialog notice-dialog" role="dialog" aria-modal="true" aria-labelledby="notice-title" aria-describedby="notice-message">
        <h2 id="notice-title">{notice.title}</h2>
        <p id="notice-message">{notice.message}</p>
        <div className="modal-actions">
          <button type="button" className="primary-btn" ref={closeRef} onClick={onClose}>Got it</button>
        </div>
      </section>
    </div>
  );
}
