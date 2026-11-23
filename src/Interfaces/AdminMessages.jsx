import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './img/1.png';
export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const INDEX_PAGE_ROUTE = '/';
  useEffect(() => {
    try {
      const savedList = JSON.parse(localStorage.getItem('receivedMessages') || '[]');
      const latestSingle = JSON.parse(localStorage.getItem('latestMessageSubmission') || 'null');
      let normalizedList = Array.isArray(savedList) ? savedList : [];
      if (
        latestSingle &&
        (latestSingle.message || latestSingle.name) &&
        !normalizedList.some((item) => item.id === latestSingle.id)
      ) {
        normalizedList = [latestSingle, ...normalizedList];
      }
      const formattedList = normalizedList
        .map((item, idx) => ({
          id: item.id ?? Date.now() + idx,
          name: item.name && item.name.trim() ? item.name.trim() : 'بدون اسم',
          message: item.message || '',
          sentAt: item.sentAt || new Date().toISOString(),
          isRead: Boolean(item.isRead),
        }))
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt) || b.id - a.id);
      setMessages(formattedList);
    } catch {
      setMessages([]);
    }
  }, []);
  const persistMessages = (updatedList) => {
    setMessages(updatedList);
    localStorage.setItem('receivedMessages', JSON.stringify(updatedList));
  };
  const handleOpenMessage = (msg) => {
    const updatedList = messages.map((item) =>
      item.id === msg.id ? { ...item, isRead: true } : item
    );
    persistMessages(updatedList);
    setSelectedMessage({ ...msg, isRead: true });
  };
  const handleDeleteMessage = (idToDelete) => {
    const updatedList = messages.filter((item) => item.id !== idToDelete);
    persistMessages(updatedList);
    if (selectedMessage && selectedMessage.id === idToDelete) {
      setSelectedMessage(null);
    }
  };
  const cardMinHeight = messages.length <= 1 ? 155 : Math.min(115 + messages.length * 76, 520);
  return (
    <div className="inbox-page-wrapper" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Cairo', sans-serif;
        }
        .inbox-page-wrapper {
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
          justify-content: flex-end;
          z-index: 10;
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
        .inbox-main-card {
          background-color: rgba(138, 69, 69, 0.9);
          border: 3px solid #000000;
          border-radius: 85px;
          width: 90%;
          max-width: 370px;
          max-height: 520px;
          padding: 34px 24px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.65);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 18px 0;
          transition: min-height 0.25s ease;
          scrollbar-width: thin;
          scrollbar-color: #4c1717 rgba(242, 232, 232, 0.25);
        }
        .inbox-main-card.has-multiple {
          justify-content: flex-start;
        }
        .inbox-main-card::-webkit-scrollbar {
          width: 6px;
        }
        .inbox-main-card::-webkit-scrollbar-thumb {
          background-color: #4c1717;
          border-radius: 10px;
        }
        .empty-state-text {
          color: #f2e8e8;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .name-pill-btn {
          width: 100%;
          min-height: 56px;
          background-color: #f2e8e8;
          color: #111111;
          border: none;
          border-radius: 28px;
          padding: 10px 18px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          transition: transform 0.15s ease, background-color 0.2s ease;
          flex-shrink: 0;
        }
        .name-pill-btn:hover {
          background-color: #ffffff;
          transform: scale(1.02);
        }
        .sender-name-label {
          flex: 1;
          text-align: center;
          font-size: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sender-name-label.unread {
          font-weight: 800;
          color: #0d0606;
        }
        .sender-name-label.read {
          font-weight: 400;
          color: #2b2626;
        }
        .unread-red-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #e11d48;
          box-shadow: 0 0 6px rgba(225, 29, 72, 0.75);
          flex-shrink: 0;
        }
        .dot-placeholder {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
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
        .msg-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.68);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 120;
          padding: 16px;
          backdrop-filter: blur(2px);
        }
        .msg-modal-box {
          background-color: #8c4848;
          border: 3px solid #000000;
          border-radius: 48px;
          width: 92%;
          max-width: 380px;
          max-height: 80vh;
          padding: 26px 22px;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.75);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .msg-modal-header {
          font-size: 20px;
          font-weight: 800;
          color: #0d0606;
          text-align: center;
          border-bottom: 1.5px solid rgba(13, 6, 6, 0.25);
          padding-bottom: 8px;
          word-break: break-word;
        }
        .msg-modal-body {
          background-color: #f2e8e8;
          color: #111111;
          border-radius: 24px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.7;
          text-align: right;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-y: auto;
          max-height: 45vh;
        }
        .msg-modal-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .close-msg-btn {
          flex: 1;
          padding: 10px;
          background-color: #4c1717;
          color: #f2e8e8;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .delete-msg-btn {
          padding: 10px 18px;
          background-color: #260707;
          color: #ffd6d6;
          border: none;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
      <div className="top-bar">
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
      <div
        className={`inbox-main-card ${messages.length > 1 ? 'has-multiple' : ''}`}
        style={{ minHeight: `${cardMinHeight}px` }}
      >
        {messages.length === 0 ? (
          <p className="empty-state-text">لا توجد رسائل واردة بعد</p>
        ) : (
          messages.map((item) => (
            <button
              key={item.id}
              type="button"
              className="name-pill-btn"
              onClick={() => handleOpenMessage(item)}
            >
              <span className="dot-placeholder" />
              <span
                className={`sender-name-label ${item.isRead ? 'read' : 'unread'}`}
              >
                {item.name}
              </span>
              {!item.isRead ? (
                <span className="unread-red-dot" title="رسالة غير مقروءة" />
              ) : (
                <span className="dot-placeholder" />
              )}
            </button>
          ))
        )}
      </div>
      <footer className="bottom-caption">
        مصممة إنشائية | Civil Engineer
      </footer>
      {selectedMessage && (
        <div
          className="msg-modal-overlay"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="msg-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="msg-modal-header">{selectedMessage.name}</div>
            <div className="msg-modal-body">
              {selectedMessage.message || 'لا يوجد نص للرسالة.'}
            </div>
            <div className="msg-modal-actions">
              <button
                type="button"
                className="close-msg-btn"
                onClick={() => setSelectedMessage(null)}
              >
                إغلاق
              </button>
              <button
                type="button"
                className="delete-msg-btn"
                onClick={() => handleDeleteMessage(selectedMessage.id)}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}