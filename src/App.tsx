import { ChatProvider } from './contexts/ChatContext';
import ChatPage from './components/pages/ChatPage/ChatPage';

function App() {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

export default App;
