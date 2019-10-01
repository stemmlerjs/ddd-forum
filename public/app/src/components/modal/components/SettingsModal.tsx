
import React from 'react'
import "../styles/SettingsModal.sass"
import { Button } from '../../button';

interface SettingsModalProps {
  onChangeApprovalRequired: () => void;
  approvalRequired: boolean;
  onClose: () => void;
  isModalOpen: boolean;
  saveChanges: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => (
  <div className={`settings-modal ${props.isModalOpen ? 'open' : ''}`}>
    <div 
      onClick={() => props.onClose()} 
      className="settings-modal-overlay">
    </div>
    <div className="settings-modal-content">
      <h2>App settings</h2>
      <hr/>
      <div className="checkbox-container">
        <input defaultChecked={props.approvalRequired} onClick={props.onChangeApprovalRequired} type="checkbox"/>
        <div>Auto-approve enabled?</div>
      </div>
      <br/>
      <Button text="Save" onClick={() => props.saveChanges()}/>
    </div>
  </div>
)

export default SettingsModal;