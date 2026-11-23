import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import bgImage from './img/1.png';
import logoImage from './img/w-logo.jpeg';

export default function MessagesInterface() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [statusNotice, setStatusNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageTextareaRef = useRef(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const SECRET_PASSWORD = 'eng.asso';
  const ADMIN_MESSAGES_ROUTE = '/admin';
  const INDEX_PAGE_ROUTE = '/';

  const adjustTextareaHeight = () => {
    const el = messageTextareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.max(54, el.scrollHeight)}px`;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() && !message.trim()) {
      setStatusNotice('من فضلكِ اكتب اسمك و رسالتك');
      return;
    }

    setIsSubmitting(true);
    setStatusNotice('');

    const newRow = {
      id: Date.now(),
      name: name.trim() || 'بدون اسم',
      message: message.trim(),
      sent_at: new Date().toISOString(),
      is_read: false,
    };

    const { error } = await supabase.from('messages').insert([newRow]);

    setIsSubmitting(false);

    if (error) {
      setStatusNotice('تعذر إرسال الرسالة، حاولي مرة أخرى');
      return;
    }

    setName('');
    setMessage('');
    setStatusNotice('');
    navigate(INDEX_PAGE_ROUTE);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === SECRET_PASSWORD) {
      setErrorMessage('');
      setPasswordInput('');
      setShowPasswordModal(false);
      navigate(ADMIN_MESSAGES_ROUTE);
    } else {
      setErrorMessage('انت مش وصال(눈_눈)');
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setErrorMessage('');
  };

  return (
    <div className="msg-page-wrapper" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Cairo', sans-serif;
        }
        .msg-page-wrapper {
          min-height: 100vh;
          width: 100%;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          padding: 22px 16px 18px;
          overflow-x: hidden;
        }
        .top-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }
        .w-top-btn {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background-color: #f5f6fa;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.2s ease;
          padding: 0;
        }
        .w-top-btn:hover {
          transform: scale(1.07);
        }
        .w-top-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .back-top-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(138, 69, 69, 0.9);
          border: 2.5px solid #0d0606;
          color: #0d0606;
          font-size: 24px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background-color 0.2s ease;
          line-height: 1;
        }
        .back-top-btn:hover {
          transform: scale(1.07);
          background-color: #f2f3f5;
        }
        .form-card {
          background-color: rgba(138, 69, 69, 0.88);
          border: 3px solid #000000;
          border-radius: 85px;
          width: 90%;
          max-width: 370px;
          padding: 40px 26px 36px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.65);
          position: relative;
          z-index: 2;
          margin: 18px 0;
          display: flex;
          flex-direction: column;
        }
        .field-group {
          margin-bottom: 18px;
        }
        .field-label {
          display: block;
          font-size: 20px;
          font-weight: 800;
          color: #0d0606;
          margin-bottom: 8px;
          padding-right: 10px;
          text-align: right;
        }
        .name-input {
          width: 100%;
          min-height: 50px;
          background-color: #f2e8e8;
          color: #111111;
          border: none;
          border-radius: 26px;
          padding: 10px 18px;
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.45;
          text-align: right;
          outline: none;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
        }
        .name-input::placeholder {
          color: rgba(17, 17, 17, 0.42);
          opacity: 1;
          text-align: right;
        }
        .message-textarea {
          width: 100%;
          min-height: 54px;
          background-color: #f2e8e8;
          color: #111111;
          border: none;
          border-radius: 26px;
          padding: 12px 18px;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.6;
          text-align: right;
          outline: none;
          resize: none;
          overflow: hidden;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
          display: block;
        }
        .message-textarea::placeholder {
          color: rgba(17, 17, 17, 0.42);
          opacity: 1;
          font-size: 14px;
          text-align: right;
        }
        .notice-text {
          color: #fff3f3;
          background-color: rgba(120, 15, 15, 0.85);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 12px;
        }
        .submit-btn {
          align-self: flex-start;
          background-color: #f2e8e8;
          color: #0d0606;
          border: none;
          border-radius: 22px;
          padding: 7px 26px;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease, background-color 0.2s ease;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #ffffff;
          transform: translateY(-2px);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .bottom-caption {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
          text-align: center;
          margin-bottom: 6px;
          z-index: 5;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(215, 215, 215, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
        }
        .modal-box {
          background-color: #8c4848;
          border: 3px solid #000000;
          border-radius: 75px;
          width: 92%;
          max-width: 390px;
          padding: 32px 28px 34px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.65);
          text-align: right;
        }
        .modal-title {
          display: block;
          font-size: 24px;
          font-weight: 600;
          color: #f2e8e8;
          margin-bottom: 12px;
          padding-right: 12px;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
        }
        .password-input {
          width: 100%;
          height: 68px;
          background-color: #f2e8e8;
          color: #111111;
          border: none;
          border-radius: 26px;
          padding: 12px 18px;
          font-size: 20px;
          text-align: right;
          outline: none;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
          margin-bottom: 18px;
        }
        .error-text {
          color: #ffe2e2;
          background-color: rgba(45, 7, 7, 0.75);
          padding: 6px 12px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          margin-bottom: 14px;
        }
        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 18px;
          padding-right: 16px;
        }
        .confirm-btn {
          min-width: 95px;
          height: 54px;
          background-color: #4c1717;
          color: #f2e8e8;
          border: none;
          border-radius: 22px;
          font-weight: 600;
          cursor: pointer;
          font-size: 20px;
          padding: 0 18px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .confirm-btn:hover {
          transform: scale(1.04);
          opacity: 0.95;
        }
        .cancel-btn {
          min-width: 95px;
          height: 54px;
          background-color: #260707;
          color: #f2e8e8;
          border: none;
          border-radius: 22px;
          font-weight: 600;
          cursor: pointer;
          font-size: 20px;
          padding: 0 18px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .cancel-btn:hover {
          transform: scale(1.04);
          opacity: 0.95;
        }
      `}</style>
      <div className="top-bar">
        <button
          type="button"
          className="w-top-btn"
          onClick={() => setShowPasswordModal(true)}
          title="خاص لوصالʕ ꈍᴥꈍʔ"
        >
          <img src={logoImage} alt="W Logo" />
        </button>
        <button
          type="button"
          className="back-top-btn"
          onClick={() => navigate(INDEX_PAGE_ROUTE)}
          title="الرجوع إلى الصفحة الرئيسية"
          aria-label="الرجوع إلى الصفحة الرئيسية"
        >
          ←
        </button>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="senderName" className="field-label">
            الاسم
          </label>
          <input
            id="senderName"
            type="text"
            className="name-input"
            maxLength={50}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (statusNotice) setStatusNotice('');
            }}
            placeholder="اترك اسمك لاعرف من شاركني بملاحظاته"
          />
        </div>
        <div className="field-group">
          <label htmlFor="senderMessage" className="field-label">
            ملاحظاتكم و رسائلكم تهمني
          </label>
          <textarea
            id="senderMessage"
            ref={messageTextareaRef}
            className="message-textarea"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (statusNotice) setStatusNotice('');
            }}
            placeholder="اكتب رسالتك او تعليقك هنا..."
          />
        </div>
        {statusNotice && <p className="notice-text">{statusNotice}</p>}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'جاري الإرسال...' : 'ارسال'}
        </button>
      </form>
      <footer className="bottom-caption">
        مصممة إنشائية | Civil Engineer
      </footer>
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <label htmlFor="secretPasswordInput" className="modal-title">
              Password ميعرفاش الا وصال
            </label>
            <form onSubmit={handlePasswordSubmit} className="modal-form">
              <input
                id="secretPasswordInput"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="password-input"
                autoFocus
              />
              {errorMessage && <p className="error-text">{errorMessage}</p>}
              <div className="modal-actions">
                <button type="submit" className="confirm-btn">
                  تاكيد
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-btn"
                >
                  الغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}