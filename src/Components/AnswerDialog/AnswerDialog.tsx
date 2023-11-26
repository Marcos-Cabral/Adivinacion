import React from 'react';
import ResultMessage from '../ResultMessage/ResultMessage';

export interface AnswerDialogProps {
    visible: boolean;
    title: string;
    guessed: boolean;
}

const AnswerDialog: React.FC<AnswerDialogProps> = ({ guessed, visible, title }) => {
    return (
        <div className='modal' style={{ display: visible ? 'flex' : 'none' }}>
            <div className='modal-content'>
                <ResultMessage guessed={guessed} title={title} />
            </div>
        </div>
    );
};

export default AnswerDialog;