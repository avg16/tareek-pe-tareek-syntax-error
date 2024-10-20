import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../../utilities/navbar-main';


function ChatPage() {
  const { username1,username2 } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);
  const initializedRef = useRef(false);
  const typingTimeoutRef = useRef(null);
  const unsavedMessagesRef = useRef([]);

  const initializeWebSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const roomName = `chat_${[username1, username2].sort().join('_')}`;
    const socketUrl = `${protocol}://${window.location.hostname}:8000/ws/${username1}/${username2}/`;

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socketRef.current.onmessage = (event) => {
        console.log(event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: data.user, content: data.message , username : data.user,},
      ]);

      // Scroll to bottom after receiving new message
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    };
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = async (event) => {
      console.log('WebSocket connection closed', event);

      if (unsavedMessagesRef.current.length > 0) {
        // Send unsaved messages and then close the WebSocket
        await sendUnsavedMessages();
      }

      // Now it is safe to close the WebSocket
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  };
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Delay the WebSocket close to ensure all messages are sent
      const delayClose = async () => {
        if (unsavedMessagesRef.current.length > 0) {
          await sendUnsavedMessages();
        }
        // if (socketRef.current) {
        //   socketRef.current.close();
        // }
      };

      delayClose();
    };
  }, [messages]);

  const fetchMessages = async () => {
    const roomName = `chat_${[username1, username2].sort().join('_')}`;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/chats/get/${roomName}/`);
      setMessages(response.data.messages);

      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  if (!initializedRef.current) {
    initializedRef.current = true;
    initializeWebSocket();
    fetchMessages();
  }

  const sendUnsavedMessages = async () => {
    if (unsavedMessagesRef.current.length > 0) {
      try {
        await Promise.all(
          unsavedMessagesRef.current.map(async (message) => {
            const messageData = {
              body: message.content,
              username: message.username,
              room: `chat_${[username1,username2].sort().join('_')}`,
              time_added: new Date().toISOString(),
            };
            await axios.post(`http://127.0.0.1:8000/chats/store/`, messageData);
          })
        );
        console.log('Unsaved messages sent to the backend');
        unsavedMessagesRef.current = []; // Clear after successful save
      } catch (error) {
        console.error('Error sending unsaved messages:', error);
      }
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      content: newMessage,
      username: username1,
      room_slug: `chat_${[username1, username2].sort().join('_')}`,
      time_added: new Date().toISOString(),
      isLocal: true,
      user: username1
    };
    setNewMessage('');

    unsavedMessagesRef.current.push(messageData);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: newMessage }));
    } else {
      console.error('WebSocket is not open');
    }

    resetTypingTimeout();
  };

  const resetTypingTimeout = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendUnsavedMessages();
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Delay the WebSocket close to ensure all messages are sent
      const delayClose = async () => {
        if (unsavedMessagesRef.current.length > 0) {
          await sendUnsavedMessages();
        }
      };

      delayClose();
    };
  }, [messages]);
  const HeartAnimation = () => (
    <motion.div
      className="absolute"
      initial={{ scale: 0, x: Math.random() * window.innerWidth, y: window.innerHeight }}
      animate={{
        scale: [0, 1, 0],
        y: [window.innerHeight, 0, -100],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, repeatDelay: Math.random() * 2 }}
    >
      <span className="text-pink-500 text-4xl">❤️</span>
    </motion.div>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-pink-100">
      {[...Array(5)].map((_, i) => <HeartAnimation key={i} />)}
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-10 lg:p-20 text-center"
      >
        <h1 className="text-4xl lg:text-5xl text-pink-600 font-bold">
          Chat with {username2}
        </h1>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:w-2/4 w-full mx-4 lg:mx-auto p-4 bg-white rounded-2xl shadow-lg border border-pink-200"
      >
        <div
          className="chat-messages space-y-3 overflow-y-auto max-h-96 p-4"
          ref={chatMessagesRef}
        >
          {messages.map((msg, index) => {
            const isOwnMessage = msg.user === username1 || msg.username === username1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} w-full`}
              >
                <div
                  className={`${
                    isOwnMessage
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } rounded-lg p-3 max-w-xs lg:max-w-md break-words shadow-md`}
                >
                  <b>{msg.user}</b>: {msg.content}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-2/4 w-full mt-6 mx-4 lg:mx-auto p-4 bg-white rounded-2xl shadow-lg border border-pink-200"
      >
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              resetTypingTimeout();
            }}
            className="flex-1 px-4 py-3 mr-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Your message..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-5 py-3 rounded-xl text-white bg-pink-600 hover:bg-pink-700 transition-all duration-200 shadow-lg"
          >
            Send
          </motion.button>
        </form>
      </motion.div>
    </div>
    </>
  );
}

export default ChatPage;
