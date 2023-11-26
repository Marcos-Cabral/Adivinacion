import React from 'react';

export interface AnswerDialogProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const AnswerDialog: React.FC<AnswerDialogProps> = ({ visible, message, onClose }) => {
    return (
        <div className='modal' style={{ display: visible ? 'flex' : 'none' }}>
            <div className='modal-content'>
                <span className='close-btn' onClick={onClose}>X</span>
                <p className='modal-msg'>{message}</p>
            </div>
        </div>
    );
};

export default AnswerDialog;