import React from 'react'
import './MessageContainer.css'
import Message from './Message'

const MessageContainer = ({error, message}) => {
  return (
    <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
    </div>
  )
}

export default MessageContainer