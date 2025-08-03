import React from 'react';
import ChatBot from './components/ChatBot';
import AiHealthAssistant from './components/AiHealthAssistant';
import ChatBox from './components/ChatBox';

const Aichat = () => {
    return (
        <div>
            <ChatBot />
            <AiHealthAssistant />
            <ChatBox />
        </div>
    );
};

export default Aichat;