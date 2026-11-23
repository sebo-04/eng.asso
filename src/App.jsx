import 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// تأكدي من صحة مسار مجلد Interfaces بالنسبة لملف App.jsx
import MainInterface from './Interfaces/index';
import MessagesInterface from './Interfaces/MessagesInterface';
import AdminMessages from './Interfaces/AdminMessages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* الواجهة الرئيسية (index.jsx) */}
        <Route path="/" element={<MainInterface />} />

        {/* واجهة الرسائل (MessagesInterface.jsx) */}
        <Route path="/messages" element={<MessagesInterface />} />

        {/* صفحة استقبال الرسائل المحمية بكلمة السر (AdminMessages.jsx) */}
        <Route path="/admin" element={<AdminMessages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;