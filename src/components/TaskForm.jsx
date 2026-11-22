import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../utils/taskHelpers.js';

const blank = { title: '', description: '', category: 'Development', status: 'To do', priority: 'Medium', dueDate: '' };

export default function TaskForm({ open, task, onClose, onSave }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setForm(task ? { ...blank, ...task } : blank);
    setErrors({});
    const focusTimer = window.setTimeout(() => titleRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [open, task]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll('button, input, textarea, select');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const change = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
  };

  const submit = event => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Enter a task title.';
    if (!STATUSES.includes(form.status)) nextErrors.status = 'Choose a status.';
    if (!PRIORITIES.includes(form.priority)) nextErrors.priority = 'Choose a priority.';
    if (!form.dueDate) nextErrors.dueDate = 'Select a due date.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category || 'Development'
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="task-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div>
            <h2 id="form-title">{task ? 'Edit task' : 'Create new task'}</h2>
            <p>{task ? 'Update the details below to save your changes.' : 'Add your task details to stay on top of your work.'}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close form"><X size={20} /></button>
        </div>

        <form onSubmit={submit} noValidate>
          <label className="field full">
            <span className="field-label">Task title <b>*</b></span>
            <input ref={titleRef} name="title" value={form.title} onChange={change} placeholder="e.g. Update pricing page" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} />
            {errors.title && <small className="field-error" id="title-error">{errors.title}</small>}
          </label>

          <label className="field full">
            <span className="field-label">Description</span>
            <textarea name="description" value={form.description} onChange={change} placeholder="Add notes about this task..." rows="4" />
          </label>

          <div className="form-grid">
            <label className="field">
              <span className="field-label">Status <b>*</b></span>
              <select name="status" value={form.status} onChange={change} aria-invalid={Boolean(errors.status)}>
                {STATUSES.map(status => <option key={status}>{status}</option>)}
              </select>
              {errors.status && <small className="field-error">{errors.status}</small>}
            </label>
            <label className="field">
              <span className="field-label">Priority <b>*</b></span>
              <select name="priority" value={form.priority} onChange={change} aria-invalid={Boolean(errors.priority)}>
                {PRIORITIES.map(priority => <option key={priority}>{priority}</option>)}
              </select>
              {errors.priority && <small className="field-error">{errors.priority}</small>}
            </label>
            <label className="field">
              <span className="field-label">Category</span>
              <select name="category" value={form.category} onChange={change}>
                {CATEGORIES.map(category => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="field-label">Due date <b>*</b></span>
              <input type="date" name="dueDate" value={form.dueDate} onChange={change} aria-invalid={Boolean(errors.dueDate)} />
              {errors.dueDate && <small className="field-error">{errors.dueDate}</small>}
            </label>
          </div>

          <p className="required-note">* Required field</p>
          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn">{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
