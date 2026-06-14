import { getAllChats, getChatMessages, sendMessage } from "@/lib/apis/chat";
import { showToast } from "@/lib/toast";
import { listenChatEvents } from "@/socket/socketEvents";
import { ChatContextType, Chat, Message } from "@/types/type";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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

  // fetch messages of a chat
  const getMessages = async (chatId: string) => {
    setChat(chatId);
    setLoading(true);
    try {
      let res = await getChatMessages(chatId);
      console.log(res);

      if (!res.success) {
        setMsg(res.message);
        return;
      }
      setMessages(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      showToast("Failed to get messages");
      setMsg("Failed to get messages");
      setLoading(false);
    }
  };

  // send message to a chat
  const sendMessageToChat = async (chatId: string, content: string) => {
    try {
      let res = await sendMessage(chatId, content);
      console.log(res);

      if (!res.success) {
        showToast(res.message);
        setMsg(res.message);
        return;
      }
    } catch (error) {
      console.log(error);
      showToast("Failed to send message");
      setMsg("Failed to send message");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!chat) return;

    const unsubscribe = listenChatEvents({
      onNewMessage: (data: any) => {
        console.log("New message received: ", data);
        getMessages(chat);
      },
    });

    return unsubscribe;
  }, [chat]);

  return (
    <ChatContext.Provider
      value={{ chats, loading, msg, messages, getMessages, sendMessageToChat }}
    >
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
