import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBolt, faPalette, faGlobe, faComments, faPaperPlane, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const AIAssistant = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your StitchArc AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Fixed: Scroll to bottom of chat container only
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending message to N8n webhook
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = { sender: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const n8nWebhookUrl = 'https://burhankhan.app.n8n.cloud/webhook/ai-assistant';
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: {
            userType: 'customer',
            productCategory: 'sportswear'
          }
        }),
      });

      const data = await response.json();
      console.log('N8n Response:', data);
      setMessages(prev => [...prev, { sender: 'bot', text: data.output }]);

    } catch (error) {
      console.error('Error calling N8n webhook:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* AI Assistant Section */}
      <section className="py-16 bg-white overflow-hidden"> 
        <div className="container mx-auto px-4"> 
          <div className="flex flex-col md:flex-row items-center gap-8"> 
            <div className="md:w-1/2"> 
              <h2 className="text-3xl font-bold mb-4 animate-fade-in flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#0033A0] text-white flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faRobot} className="text-xl" />
                </div>
                24/7 AI Assistant
              </h2> 
              <p className="text-gray-600 mb-6 animate-fade-in delay-100">Our AI-powered assistant is available round the clock to answer your questions, provide product recommendations, and help with order processing.</p> 
              
              <div className="space-y-4 mb-8"> 
                <div className="flex items-start group animate-fade-in delay-200 hover:scale-[1.02] transition-transform duration-300"> 
                  <div className="bg-[#0033A0] text-white p-2 rounded-full mr-4 group-hover:rotate-12 transition-transform duration-300"> 
                    <FontAwesomeIcon icon={faBolt} /> 
                  </div> 
                  <div> 
                    <h4 className="font-bold">Instant MOQ Estimates</h4> 
                    <p className="text-gray-600">Get minimum order quantity information instantly</p> 
                  </div> 
                </div> 
                
                <div className="flex items-start group animate-fade-in delay-300 hover:scale-[1.02] transition-transform duration-300"> 
                  <div className="bg-[#0033A0] text-white p-2 rounded-full mr-4 group-hover:rotate-12 transition-transform duration-300"> 
                    <FontAwesomeIcon icon={faPalette} /> 
                  </div> 
                  <div> 
                    <h4 className="font-bold">Design Suggestions</h4> 
                    <p className="text-gray-600">Receive AI-generated design recommendations</p> 
                  </div> 
                </div> 
                
                <div className="flex items-start group animate-fade-in delay-400 hover:scale-[1.02] transition-transform duration-300"> 
                  <div className="bg-[#0033A0] text-white p-2 rounded-full mr-4 group-hover:rotate-12 transition-transform duration-300"> 
                    <FontAwesomeIcon icon={faGlobe} /> 
                  </div> 
                  <div> 
                    <h4 className="font-bold">Export Compliance</h4> 
                    <p className="text-gray-600">Understand regulations for your target market</p> 
                  </div> 
                </div> 
              </div> 
              
              <button 
                onClick={() => setShowChat(!showChat)}
                className="gradient-btn text-white px-6 py-3 rounded-full font-bold flex items-center animate-fade-in delay-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              > 
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Chat with AI Assistant
              </button> 
            </div> 
            
            <div className="md:w-1/2 animate-fade-in delay-600"> 
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"> 
                <div className="flex items-center mb-4"> 
                  <div className="w-12 h-12 rounded-full bg-[#0033A0] text-white flex items-center justify-center mr-3 animate-pulse"> 
                    <FontAwesomeIcon icon={faRobot} className="text-xl" /> 
                  </div> 
                  <h3 className="font-bold text-xl">StitchArc AI Assistant</h3> 
                </div> 
                
                <div 
                  ref={chatContainerRef}
                  className="bg-white rounded-lg p-4 mb-4 h-64 overflow-y-auto chat-container"
                > 
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : ''} animate-message-in`}
                    > 
                      <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-[#0033A0] text-white' : 'bg-gray-100'}`}> 
                        <p>{msg.text}</p> 
                      </div> 
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex mb-4 animate-message-in">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <FontAwesomeIcon icon={faEllipsis} className="animate-pulse" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div> 
                
                <div className="flex"> 
                  <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..." 
                    className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0033A0] transition-all duration-300 focus:border-[#0033A0]"
                    disabled={isLoading}
                  /> 
                  {/* FIXED: Send button with proper styling */}
                  <button 
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-[#0033A0] text-white px-4 py-2 rounded-r-lg hover:bg-[#0033A0]/90 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
                  > 
                    <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" /> 
                  </button> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </section>
      
      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="bg-[#0033A0] text-white p-4 font-medium flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              Premium AI Assistant
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div 
            ref={chatContainerRef}
            className="p-4 h-64 overflow-y-auto bg-gray-50 chat-container"
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                <div className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' ? 'bg-[#0033A0] text-white' : 'bg-white border border-gray-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex mb-4">
                <div className="bg-white rounded-lg p-3 max-w-xs border border-gray-200">
                  <FontAwesomeIcon icon={faEllipsis} className="animate-pulse" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                disabled={isLoading}
              />
              {/* FIXED: Modal send button with proper styling */}
              <button 
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-3 py-2 bg-[#0033A0] text-white rounded-md hover:bg-[#0033A0]/90 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;