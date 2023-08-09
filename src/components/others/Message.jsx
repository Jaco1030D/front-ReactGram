import './Message.css'

const Message = ({msg, type}) => (

    <div className={`message ${type}`}>
        <p>{msg}</p>
    </div>
  )

export default Message