import React, { useState } from "react";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
import PasswordForm from "../PasswordForm/PasswordForm";
import PasswordTable from "../PasswordTable/PasswordTable";
import SettingsModal from "../SettingsModal/SettingsModal";


function Dashboard() {
  const [passwords, setPasswords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const addNewPassword = (passwordEntry) => {
    setPasswords([...passwords, passwordEntry]);
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  return (
    <div className="dashboard">
      <Navbar 
        setIsModalOpen={setIsModalOpen} 
        setModalContent={setModalContent} 
      />

      <div className="dashboard-content">
        <PasswordForm addNewPassword={addNewPassword} />
        <PasswordTable 
          passwords={passwords} 
          deletePassword={deletePassword} 
        />
      </div>

      <SettingsModal
         isOpen={isModalOpen}        // Modal'ın açık olup olmadığını kontrol et
         onClose={() => setIsModalOpen(false)} // Modal'ı kapat
         content={modalContent}    
      />
    </div>
  );
}

export default Dashboard;