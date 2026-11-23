import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './img/1.png';
import logoImage from './img/w-logo.jpeg';
const Index = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const SECRET_PASSWORD = 'eng.asso';
  const ADMIN_PAGE_ROUTE = '/admin';
  const MESSAGES_PAGE_ROUTE = '/messages';
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === SECRET_PASSWORD) {
      setErrorMessage('');
      setPasswordInput('');
      setShowPasswordModal(false);
      navigate(ADMIN_PAGE_ROUTE);
    } else {
      setErrorMessage('انتي مش وصال(눈_눈)');
    }
  };
  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setErrorMessage('');
  };
  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Cairo', sans-serif;
          }
          .white-pill-btn:hover {
            transform: scale(1.03);
            background-color: #ffffff !important;
          }
          .logo-btn:hover {
            transform: scale(1.07);
          }
          .confirm-password-btn:hover,
          .cancel-password-btn:hover {
            transform: scale(1.04);
            opacity: 0.95;
          }
          .website-link:hover {
            opacity: 0.85;
            text-decoration: underline !important;
          }
        `}
      </style>
      <button
        className="logo-btn"
        onClick={() => setShowPasswordModal(true)}
        style={styles.logoButton}
        title="خاص لوصالʕ ꈍᴥꈍʔ"
      >
        <img src={logoImage} alt="W Logo" style={styles.logoImg} />
      </button>
      <div style={styles.card}>
        <h1 style={styles.title}>م . وصال ميلاد السنوسي</h1>
        <p style={styles.poemText}>
          من الفكرة إلى التصميم،
          <br />
          ومن الأساس إلى اكتمال البناء ...
          <br />
          لكلّ إنجازٍ أساس،
          <br />
          ولكلّ حلمٍ تصميم،
          <br />
          واليوم أحتفي
          <br />
          بصرحٍ شيّدته بالعلم،
          <br />
          وثبّتُّ أركانه بالعزيمة.
        </p>
        <button
          className="white-pill-btn"
          onClick={() => navigate(MESSAGES_PAGE_ROUTE)}
          style={styles.whiteButton}
          aria-label="الانتقال إلى صفحة الرسائل"
        >
          شاركوني بملاحظاتكم
        </button>
      </div>
      <footer style={styles.footerContainer}>
        <div style={styles.footerText}>مصممة إنشائية | Civil Engineer</div>
        <a
          href="https://vogue-desing.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
          style={styles.websiteLink}
        >
          اضغط هنا لزيارتنا على موقعنا
        </a>
      </footer>
      {showPasswordModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <label htmlFor="indexSecretPassword" style={styles.modalTitle}>
                Password ميعرفاش الا وصال
            </label>
            <form onSubmit={handlePasswordSubmit} style={styles.modalForm}>
              <input
                id="indexSecretPassword"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                style={styles.passwordInput}
                autoFocus
              />
              {errorMessage && (
                <p style={styles.errorText}>{errorMessage}</p>
              )}

              <div style={styles.modalActions}>
                <button
                  type="submit"
                  className="confirm-password-btn"
                  style={styles.confirmButton}
                >
                  تاكيد
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-password-btn"
                  style={styles.cancelButton}
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
};
const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '20px',
    direction: 'rtl',
    overflow: 'hidden',
  },
  logoButton: {
    position: 'absolute',
    top: '22px',
    left: '22px',
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#f5f6fa',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
    transition: 'transform 0.2s ease',
    zIndex: 10,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  card: {
    marginTop: '65px',
    width: '90%',
    maxWidth: '370px',
    backgroundColor: 'rgba(138, 69, 69, 0.88)',
    border: '3px solid #000000',
    borderRadius: '85px',
    padding: '45px 25px 38px 25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.65)',
  },
  title: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: '#0d0606',
    marginBottom: '22px',
  },
  poemText: {
    fontSize: '1.08rem',
    fontWeight: '600',
    lineHeight: '1.75',
    color: '#140909',
    marginBottom: '32px',
  },
  whiteButton: {
    width: '78%',
    height: '52px',
    backgroundColor: '#f2f3f5',
    color: '#0d0606',
    fontSize: '1.05rem',
    fontWeight: '700',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '10px',
    zIndex: 5,
    textAlign: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
  },
  websiteLink: {
    color: '#f2e8e8',
    fontSize: '0.88rem',
    fontWeight: '600',
    textDecoration: 'none',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.85)',
    transition: 'opacity 0.2s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(215, 215, 215, 0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '16px',
    direction: 'rtl',
  },
  modalBox: {
    backgroundColor: '#8c4848',
    border: '3px solid #000000',
    borderRadius: '75px',
    width: '92%',
    maxWidth: '390px',
    padding: '32px 28px 34px',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.65)',
    textAlign: 'right',
  },
  modalTitle: {
    display: 'block',
    fontSize: '24px',
    fontWeight: '600',
    color: '#f2e8e8',
    marginBottom: '12px',
    paddingRight: '12px',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  passwordInput: {
    width: '100%',
    height: '68px',
    backgroundColor: '#f2e8e8',
    color: '#111111',
    border: 'none',
    borderRadius: '26px',
    padding: '12px 18px',
    fontSize: '20px',
    textAlign: 'right',
    outline: 'none',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '18px',
  },
  errorText: {
    color: '#ffe2e2',
    backgroundColor: 'rgba(45, 7, 7, 0.75)',
    padding: '6px 12px',
    borderRadius: '14px',
    fontWeight: '700',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '14px',
  },
  modalActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '18px',
    paddingRight: '16px',
  },
  confirmButton: {
    minWidth: '95px',
    height: '54px',
    backgroundColor: '#4c1717',
    color: '#f2e8e8',
    border: 'none',
    borderRadius: '22px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '0 18px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.15s ease, opacity 0.15s ease',
  },
  cancelButton: {
    minWidth: '95px',
    height: '54px',
    backgroundColor: '#260707',
    color: '#f2e8e8',
    border: 'none',
    borderRadius: '22px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '0 18px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.15s ease, opacity 0.15s ease',
  },
};

export default Index;