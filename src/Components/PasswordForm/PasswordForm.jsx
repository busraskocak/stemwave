import React, {useState, useEffect}from 'react'

function PasswordForm({ addNewPassword }) {
  const [deviceId, setDeviceId] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  // Rastgele şifre oluşturma fonksiyonu
  const generatePassword = () => {
    if (selectedProduct) {
      const newPassword = `${selectedProduct}-${Math.random().toString(36).slice(-8)}`;
      const newPasswordEntry = { 
        id: Date.now(), 
        deviceId, 
        serialNo, 
        customerName, 
        product: selectedProduct, 
        password: newPassword,
        timestamp: new Date().toLocaleString()
      };
      
      addNewPassword(newPasswordEntry);
      
      // Formları sıfırla
      setDeviceId("");
      setSerialNo("");
      setCustomerName("");
      setSelectedProduct("");
    }
  };

  return (
    <div className="form-card">
      <h3>Device Information</h3>
      
      <div className="form-group">
        <label htmlFor="deviceId">Device ID</label>
        <input
          type="text"
          id="deviceId"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="serialNo">Serial Number</label>
        <input
          type="text"
          id="serialNo"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Select Product</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="product"
              value="Handpiece"
              checked={selectedProduct === "Handpiece"}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
            Handpiece
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="product"
              value="Generator"
              checked={selectedProduct === "Generator"}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
            Generator
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="product"
              value="Electrode"
              checked={selectedProduct === "Electrode"}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
            Electrode
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="product"
              value="Product D"
              checked={selectedProduct === "Product D"}
              onChange={(e) => setSelectedProduct(e.target.value)}
            />
            Product D
          </label>
        </div>
      </div>
      
      <button
        className="generate-btn"
        onClick={generatePassword}
        disabled={!deviceId || !serialNo || !customerName || !selectedProduct}
      >
        Generate Password
      </button>
    </div>
  );
}

export default PasswordForm