import React, {useState, useEffect}from 'react'

function PasswordForm({ addNewPassword }) {
  const [deviceId, setDeviceId] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedModusProduct, setSelectedModusProduct] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  // IP adresini al
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
      })
      .catch(error => {
        console.error('IP adresi alınamadı:', error);
      });
  }, []);

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
        modusProduct: selectedModusProduct, 
        password: newPassword,
        timestamp: new Date().toLocaleString(),
        ipAddress: ipAddress // IP adresini ekledik
      };
      
      addNewPassword(newPasswordEntry);
      
      // Formları sıfırla
      setDeviceId("");
      setSerialNo("");
      setCustomerName("");
      setSelectedProduct("");
      setSelectedModusProduct("");
    }
  };

  // Radio buton seçildiğinde çağrılan fonksiyon
  const handleProductChange = (value) => {
    setSelectedProduct(value);
    
  };

  const handleModusChange = (value) => {
    setSelectedModusProduct(value);
    
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
      
      {/* Modus F ve Modus Portable F için ayrı grup */}
      <div className="form-group modus-group">
        <label>Modus Devices</label>
        <div className="radio-group vertical-radio">
          <label className="radio-label">
            <input
              type="radio"
              name="modus-product"
              value="Modus F"
              checked={selectedModusProduct === "Modus F"}
              onChange={() => handleModusChange("Modus F")}
            />
            <span>Modus F</span>
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              name="modus-product"
              value="Modus Portable F"
              checked={selectedModusProduct=== "Modus Portable F"}
              onChange={() => handleModusChange("Modus Portable F")}
            />
            <span>Modus Portable F</span>
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Select Product</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="standard-product"
              value="Handpiece"
              checked={selectedProduct === "Handpiece"}
              onChange={() => handleProductChange("Handpiece")}
            />
            Handpiece
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="standard-product"
              value="Generator"
              checked={selectedProduct === "Generator"}
              onChange={() => handleProductChange("Generator")}
            />
            Generator
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="standard-product"
              value="Electrode"
              checked={selectedProduct === "Electrode"}
              onChange={() => handleProductChange("Electrode")}
            />
            Electrode
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="standard-product"
              value="Product D"
              checked={selectedProduct === "Product D"}
              onChange={() => handleProductChange("Product D")}
            />
            Product D
          </label>
        </div>
      </div>
      
      <button
        className="generate-btn"
        onClick={generatePassword}
        disabled={!deviceId || !serialNo || !customerName || !selectedModusProduct || !selectedProduct}
      >
        Generate Password
      </button>
    </div>
  );
}

export default PasswordForm