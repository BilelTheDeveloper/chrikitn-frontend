import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { Send, Shield, Trash2, ArrowLeft, User } from 'lucide-react';

// ✅ CONFIG INTEGRATION:
import { API_BASE_URL, SOCKET_URL } from '../../config/config';

// Connect to the socket tunnel using the global SOCKET_URL
const socket = io(SOCKET_URL, { withCredentials: true });

const ChatRoom = ({ connectionId: propId }) => {
  // Logic: Use ID from Props (Split-view) OR from URL (Full-page)
  const { connectionId: urlId } = useParams();
  const activeId = propId || urlId;

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // 1. Initial Load: Fetch History & Join Room
  useEffect(() => {
    // Prevent execution if no ID is present yet
    if (!activeId) return;

    const fetchChatData = async () => {
      try {
        // ✅ UPDATED: Uses API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}/chat/${activeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data.data);

        // Join the unique socket room for this connection
        socket.emit('join_room', activeId); 
      } catch (err) {
        console.error("Access Denied or Connection Error", err);
        // Only navigate away if it's a 403/401, not just a loading state
        if (err.response?.status === 403) navigate('/main/notifications');
      }
    };

    fetchChatData();

    // Listen for incoming live messages
    socket.on('receive_message', (data) => {
      // Only add message if it belongs to this active room
      if (data.chatRoomId === activeId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [activeId, token, navigate]);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. Send Message Protocol
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeId) return;

    const messageData = {
      connectionId: activeId,
      chatRoomId: activeId,
      sender: {
        _id: currentUser._id,
        identityImage: currentUser.identityImage,
        name: currentUser.name
      },
      content: newMessage,
      createdAt: new Date()
    };

    try {
      // ✅ UPDATED: Save to DB using API_BASE_URL
      await axios.post(`${API_BASE_URL}/chat/send`, {
        connectionId: activeId,
        content: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Emit to socket for real-time delivery
      socket.emit('send_message', messageData);

      // Update local UI
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (err) {
      console.error("Transmission failed", err);
    }
  };

  if (!activeId) return null;

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* CHAT FEED */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar bg-slate-950/20">
        {messages.map((msg, index) => {
          const isMine = msg.sender?._id === currentUser._id || msg.sender === currentUser._id;
          const senderData = typeof msg.sender === 'object' ? msg.sender : null;
          
          return (
            <div key={index} className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* SENDER AVATAR */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-slate-800 overflow-hidden mb-1">
                {senderData?.identityImage ? (
                  <img 
                    src={
                      senderData.identityImage.startsWith('http') 
                      ? senderData.identityImage 
                      : `${SOCKET_URL}${senderData.identityImage.startsWith('/') ? '' : '/'}${senderData.identityImage}`
                    } 
                    alt="avatar" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://ui-avatars.com/api/?name=" + (senderData.name || "U");
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <User size={14} />
                  </div>
                )}
              </div>

              {/* MESSAGE BUBBLE */}
              <div className={`max-w-[75%] p-3 lg:p-4 rounded-2xl text-sm ${
                isMine 
                ? 'bg-amber-500 text-black font-bold rounded-br-none shadow-lg shadow-amber-500/10' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/5'
              }`}>
                {msg.content}
                <div className={`text-[8px] mt-1 uppercase font-black opacity-50 ${isMine ? 'text-black' : 'text-slate-500'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* INPUT AREA */}
      <form onSubmit={handleSendMessage} className="p-4 lg:p-6 bg-slate-900/80 border-t border-white/5 flex gap-3">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Transmit secure message..."
          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600"
        />
        <button 
          type="submit"
          disabled={!newMessage.trim()}
          className="p-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-black rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;