import React, { useState, useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import "./PasswordTable.css";
import axios from 'axios'; 

function PasswordTable({ passwords = [], setPasswords, userRole }) {
  // Her kolon için ayrı arama terimleri
  const [searchTerms, setSearchTerms] = useState({
    deviceId: "",
    serialNo: "",
    customerName: "",
    modusProduct: "",
    product: "",
    password: "",
    timestamp: "",
    ipAddress: ""
  });
  
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // IP adresini almak için
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        setLoading(false);
      })
      .catch(error => {
        console.error('IP adresi alınamadı:', error);
        setLoading(false);
      });
  }, []);

  // Veritabanından şifreleri almak için
  useEffect(() => {
    fetchPasswords();
  }, []);

  // Veritabanından şifreleri çeken fonksiyon
  const fetchPasswords = async () => {
    try {
      setLoading(true);
      // Burada API URL'inizi ve endpoint'inizi ayarlayın
      const response = await axios.get('/api/passwords');
      setPasswords(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Şifreler alınamadı:', error);
      
      setLoading(false);
    }
  };

  // Arama terimlerini güncelleme fonksiyonu
  const handleSearchChange = (column, value) => {
    setSearchTerms({
      ...searchTerms,
      [column]: value
    });
  };
  
  // Şifre silme fonksiyonu
  const handleDeletePassword = async (id) => {
    if (window.confirm('Bu şifreyi silmek istediğinizden emin misiniz?')) {
      try {
        setDeleteLoading(true);
        // API URL'inizi ve endpoint'inizi ayarlayın
        await axios.delete(`/api/passwords/${id}`);
        
        // UI'dan da sil
        setPasswords(passwords.filter(p => p.id !== id));
        setDeleteLoading(false);
      } catch (error) {
        console.error('Şifre silinemedi:', error);
        setErrorMessage('Şifre silinirken bir hata oluştu.');
        setDeleteLoading(false);
      }
    }
  };

  const handleCreatePassword = async (passwordData) => {
    // IP adresini al
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      // Yeni şifre nesnesini oluştur
      const newPassword = {
        ...passwordData,
        timestamp: new Date().toLocaleString(),
        ipAddress: data.ip
      };
      
      // API'ye gönder
      const saveResponse = await axios.post('/api/passwords', newPassword);
      
      
      setPasswords(prevPasswords => [...prevPasswords, saveResponse.data]);
    } catch (error) {
      console.error('Şifre kaydedilemedi:', error);
      setErrorMessage('Şifre kaydedilirken bir hata oluştu.');
    }
  };

  // Tablo sıralama fonksiyonu
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sıralanmış ve filtrelenmiş verileri hesapla
  const filteredAndSortedPasswords = (passwords && passwords.length ? [...passwords] : [])
    .filter(item => 
      (item.deviceId?.toLowerCase() || "").includes(searchTerms.deviceId.toLowerCase()) &&
      (item.serialNo?.toLowerCase() || "").includes(searchTerms.serialNo.toLowerCase()) &&
      (item.customerName?.toLowerCase() || "").includes(searchTerms.customerName.toLowerCase()) &&
      (item.product?.toLowerCase() || "").includes(searchTerms.product.toLowerCase()) &&
      (item.modusProduct?.toLowerCase() || "").includes(searchTerms.modusProduct.toLowerCase()) &&
      (item.password?.toLowerCase() || "").includes(searchTerms.password.toLowerCase()) &&
      (!searchTerms.timestamp || (item.timestamp?.toLowerCase() || "").includes(searchTerms.timestamp.toLowerCase())) &&
      (!searchTerms.ipAddress || ((item.ipAddress || ipAddress)?.toLowerCase() || "").includes(searchTerms.ipAddress.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });
  
  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Generated Passwords</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      
      <div className="table-wrapper">
        {loading ? (
          <div className="loading-indicator">Yükleniyor...</div>
        ) : (
          <table className="passwords-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("ipAddress")}>
                  IP Address {sortColumn === "ipAddress" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search IP..."
                      value={searchTerms.ipAddress || ""}
                      onChange={(e) => handleSearchChange("ipAddress", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("deviceId")}>
                  Device ID {sortColumn === "deviceId" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Device ID..."
                      value={searchTerms.deviceId}
                      onChange={(e) => handleSearchChange("deviceId", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("serialNo")}>
                  Serial Number {sortColumn === "serialNo" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Serial No..."
                      value={searchTerms.serialNo}
                      onChange={(e) => handleSearchChange("serialNo", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("customerName")}>
                  Customer Name {sortColumn === "customerName" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Customer..."
                      value={searchTerms.customerName}
                      onChange={(e) => handleSearchChange("customerName", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("modusProduct")}>
                  Modus Product {sortColumn === "modusProduct" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Modus Product..."
                      value={searchTerms.modusProduct}
                      onChange={(e) => handleSearchChange("modusProduct", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("product")}>
                  Product {sortColumn === "product" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Product..."
                      value={searchTerms.product}
                      onChange={(e) => handleSearchChange("product", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
              
                <th onClick={() => handleSort("password")}>
                  Password {sortColumn === "password" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Password..."
                      value={searchTerms.password}
                      onChange={(e) => handleSearchChange("password", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>
                <th onClick={() => handleSort("timestamp")}>
                  Timestamp {sortColumn === "timestamp" && (sortDirection === "asc" ? "▲" : "▼")}
                  <div className="column-search">
                    <input
                      type="text"
                      placeholder="Search Date..."
                      value={searchTerms.timestamp}
                      onChange={(e) => handleSearchChange("timestamp", e.target.value)}
                      className="search-input"
                    />
                  </div>
                </th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedPasswords.length > 0 ? (
                filteredAndSortedPasswords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.ipAddress || ipAddress}</td>
                    <td>{item.deviceId}</td>
                    <td>{item.serialNo}</td>
                    <td>{item.customerName}</td>
                    <td>{item.modusProduct}</td>
                    <td>{item.product}</td>
                    <td>{item.password}</td>
                    <td>{item.timestamp}</td>
                 
                    <td className="action-buttons">
                      <button 
                        className="icon-btn delete-btn" 
                        onClick={() => handleDeletePassword(item.id)}
                        disabled={deleteLoading}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">No passwords generated yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PasswordTable