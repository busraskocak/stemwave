import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API URL'sini burada tanımlayın
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state'leri
  const [formData, setFormData] = useState({
    site: '',
    username: '',
    password: '',
    notes: ''
  });
  
  // Şifreleri getirme fonksiyonu
  const fetchPasswords = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      
      // API URL'i ile birleştirin - bu çok önemli!
      const response = await axios.get(`${API_URL}/api/passwords`);
      
      console.log('API yanıtı:', response.data);
      
      if (response.data) {
        setPasswords(response.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Şifreler alınamadı:', error);
      
      // Detaylı hata mesajı
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Şifreler yüklenirken bir hata oluştu.';
      
      setErrorMessage(errorMsg);
      setLoading(false);
    }
  };
  
  // Sayfa yüklendiğinde şifreleri getir
  useEffect(() => {
    fetchPasswords();
  }, []);
  
  // Form verilerini güncelleyen fonksiyon
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Yeni şifre ekleme fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setErrorMessage('');
      
      await axios.post(`${API_URL}/api/passwords`, formData);
      
      // Formu temizle
      setFormData({
        site: '',
        username: '',
        password: '',
        notes: ''
      });
      
      // Şifreleri yeniden yükle
      fetchPasswords();
    } catch (error) {
      console.error('Şifre eklenirken hata:', error);
      
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      'Şifre eklenirken bir hata oluştu.';
      
      setErrorMessage(errorMsg);
      setLoading(false);
    }
  };
  
  // Şifre silme fonksiyonu
  const handleDelete = async (id) => {
    if (window.confirm('Bu şifreyi silmek istediğinizden emin misiniz?')) {
      try {
        setLoading(true);
        
        await axios.delete(`${API_URL}/api/passwords/${id}`);
        
        // Şifreleri yeniden yükle
        fetchPasswords();
      } catch (error) {
        console.error('Şifre silinirken hata:', error);
        
        const errorMsg = error.response?.data?.message || 
                        error.message || 
                        'Şifre silinirken bir hata oluştu.';
        
        setErrorMessage(errorMsg);
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="password-manager">
      <h1>Şifre Yöneticisi</h1>
      
      {/* Hata mesajı */}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>Kapat</button>
        </div>
      )}
      
      {/* Şifre Ekleme Formu */}
      <div className="password-form">
        <h2>Yeni Şifre Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Site:</label>
            <input
              type="text"
              name="site"
              value={formData.site}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Kullanıcı Adı:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Şifre:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Notlar:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Ekleniyor...' : 'Şifre Ekle'}
          </button>
        </form>
      </div>
      
      {/* Şifre Listesi */}
      <div className="password-list">
        <h2>Şifreler</h2>
        
        {loading ? (
          <p>Yükleniyor...</p>
        ) : passwords.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Site</th>
                <th>Kullanıcı Adı</th>
                <th>Şifre</th>
                <th>Notlar</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((item) => (
                <tr key={item._id}>
                  <td>{item.site}</td>
                  <td>{item.username}</td>
                  <td>
                    <span className="password-field">******</span>
                    <button onClick={() => alert(item.password)}>Göster</button>
                  </td>
                  <td>{item.notes}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Kayıtlı şifre bulunamadı</p>
        )}
        
        <button onClick={fetchPasswords} disabled={loading}>
          {loading ? 'Yükleniyor...' : 'Şifreleri Yenile'}
        </button>
      </div>
    </div>
  );
}

export default PasswordManager;