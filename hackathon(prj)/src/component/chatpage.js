import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const ChatApp = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    });
    return () => unsubscribe(); // Clean up the listener on unmount
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage(""); // Clear input after sending the message
  };

  return (
    <div className="chat-app">
      {/* Chat Header */}
      <div className="chat-header">
        <h2>{room}</h2>
      </div>

      {/* Chat Messages */}
      <div className="chat-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${message.user === auth.currentUser.displayName ? "sent" : "received"}`}
          >
            <h4>{message.user}</h4>
            <p className="chat-text">{message.text}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
