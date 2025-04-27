import React, {useState, useEffect}from 'react'
import { IoIosClose } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PasswordTable.css";

function PasswordTable({ passwords,setPasswords }) {

 const [searchTerm, setSearchTerm] = useState("");
 const [sortColumn, setSortColumn] = useState("timestamp");
 const [sortDirection, setSortDirection] = useState("desc");




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
    const filteredAndSortedPasswords = [...passwords]
      .filter(item => 
        item.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.password.toLowerCase().includes(searchTerm.toLowerCase()) 
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
    
    <div className="table-wrapper">
      <table className="passwords-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("deviceId")}>
              Device ID {sortColumn === "deviceId" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("serialNo")}>
              Serial Number {sortColumn === "serialNo" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("customerName")}>
              Customer Name {sortColumn === "customerName" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("product")}>
              Product {sortColumn === "product" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("password")}>
              Password {sortColumn === "password" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("timestamp")}>
              Timestamp {sortColumn === "timestamp" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPasswords.length > 0 ? (
            filteredAndSortedPasswords.map((item) => (
              <tr key={item.id}>
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
              <td colSpan="7" className="no-data">No passwords generated yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default PasswordTable