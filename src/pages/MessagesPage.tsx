import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { messages } from '../data/mockData';
import { Message } from '../types';
import { formatDistance } from 'date-fns';

const MessagesPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Messages - LocalMarket";
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // In a real app, this would fetch the user's messages from an API
    const filteredMessages = messages.filter(
      msg => msg.recipientId === user?.id || msg.senderId === user?.id
    );
    setUserMessages(filteredMessages);
    setIsLoading(false);
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
        
        {userMessages.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {userMessages.map((message, index) => (
              <div
                key={message.id}
                className={`p-4 ${index !== userMessages.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {message.listingTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {message.senderId === user?.id ? 'You' : message.senderName} →{' '}
                      {message.recipientId === user?.id ? 'You' : message.recipientName}
                    </p>
                    <p className="text-gray-600">{message.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  {!message.read && message.recipientId === user?.id && (
                    <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No messages yet</h2>
            <p className="text-gray-600">
              When you contact sellers or receive messages, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;