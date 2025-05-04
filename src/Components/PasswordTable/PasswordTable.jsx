import React, {useState, useEffect}from 'react'
import { IoIosClose } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PasswordTable.css";

function PasswordTable({ passwords = [], setPasswords }) {
  // Her kolon için ayrı arama terimleri
  const [searchTerms, setSearchTerms] = useState({
    deviceId: "",
    serialNo: "",
    customerName: "",
    product: "",
    password: "",
    timestamp: "",
    ipAddress: ""
  });
  
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Arama terimlerini güncelleme fonksiyonu
  const handleSearchChange = (column, value) => {
    setSearchTerms({
      ...searchTerms,
      [column]: value
    });
  };
  const handleCreatePassword = async () => {
    // IP adresini al
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      // Yeni şifre nesnesini oluştur
      const newPassword = {
        id: generateId(), // Bir ID oluşturma fonksiyonunuz
        deviceId: deviceId,
        serialNo: serialNo,
        customerName: customerName,
        product: product,
        password: generatedPassword,
        timestamp: new Date().toLocaleString(),
        ipAddress: data.ip // IP adresini kaydet
      };
      
      // Şifreyi kaydet - setPasswords'u kullanarak veya API'nize göndererek
      setPasswords(prevPasswords => [...prevPasswords, newPassword]);
    } catch (error) {
      console.error('IP adresi alınamadı:', error);
      
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
      </div>
      
      <div className="table-wrapper">
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
                  <td>{item.product}</td>
                  <td>{item.password}</td>
                  <td>{item.timestamp}</td>
               
                  <td className="action-buttons">
                    <button className="icon-btn edit-btn" onClick={() => setPasswords(passwords.filter(p => p.id !== item.id))}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => setPasswords(passwords.filter(p => p.id !== item.id))}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No passwords generated yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PasswordTable