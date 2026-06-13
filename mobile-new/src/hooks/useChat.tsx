import { getAllChats } from "@/lib/apis/chat";
import { showToast } from "@/lib/toast";
import { ChatContextType, Chat } from "@/types/type";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // for error or success messages

  // fetch all chats of the user
  const fetchChats = async () => {
    setLoading(true);
    try {
      let res = await getAllChats();
      console.log(res);

      if (!res.success) {
        setMsg(res.message);
        return;
      }
      setChats(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      showToast("Failed to get chats");
      setMsg("Failed to get chats");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatContext.Provider value={{ chats, loading, msg, messages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside ChatProvider");
  }

  return context;
};
