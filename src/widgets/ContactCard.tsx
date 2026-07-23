import React, { useState } from 'react';
import { Send, CheckCircle, Mail } from 'lucide-react';

export const ContactCard: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errs.email = "Please enter a valid email address.";
    }
    if (formState.message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="contact-widget" style={{ justifyContent: 'center' }}>
        <div className="form-success-message">
          <div className="form-success-icon">
            <CheckCircle size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#f3f4f6', marginBottom: '0.5rem' }}>Transmission Sent!</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto 1.5rem' }}>
            Thanks for reaching out! Karim Mohamed (kariimmohamed412-svg) will respond shortly.
          </p>
          <button 
            className="submit-btn" 
            style={{ maxWidth: '150px' }}
            onClick={() => setStatus('idle')}
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-widget">
      <div>
        <div className="widget-title">
          <Mail size={18} style={{ color: '#c084fc' }} />
          <span>Contact Commander</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.5' }}>
          Send an encrypted message. Direct inquiry linked to <strong>kariimmohamed412-svg</strong>.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="form-input"
              required
            />
            {errors.email && <span style={{ fontSize: '0.75rem', color: '#f43f5e', padding: '0.2rem 0.5rem' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <textarea
              placeholder="Your Message..."
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="form-input"
              required
            />
            {errors.message && <span style={{ fontSize: '0.75rem', color: '#f43f5e', padding: '0.2rem 0.5rem' }}>{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send size={16} />
                <span>Initialize Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
