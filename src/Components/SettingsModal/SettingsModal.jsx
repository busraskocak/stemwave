import React, {useState, useEffect}from 'react'
import { IoIosClose } from "react-icons/io";
import "../SettingsModal/SettingsModal.css";

function SettingsModal({ isOpen, onClose, content }) {
    
    if (!isOpen) return null;

 

    return (
      <div className="settings-modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {content === "user" && "Kullanıcı Ayarları"}
            {content === "system" && "Sistem Ayarları"}
            {content === "other" && "Diğer Ayarlar"}
          </h3>
          <button className="close-modal" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="settings-menu">
            {content === "user" && (
              <ul>
                <button>Add User</button>   
                <button>Edit User</button>
                <button>Delete User</button>
              </ul>
            )}
          </div>
        </div>
        <div className="modal-footer">
          
        </div>
      </div>
    </div>
    );
    }

export default SettingsModal