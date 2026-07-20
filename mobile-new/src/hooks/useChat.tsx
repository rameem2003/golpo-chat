import { AppState } from "react-native";
import { getAllChats, getChatMessages, sendMessage } from "@/lib/apis/chat";
import { showToast } from "@/lib/toast";
// import { listenChatEvents, listenFriendEvents } fro@/lib/socket/socketEventsnts";
import {
  listenChatEvents,
  listenFriendEvents,
} from "@/lib/socket/socketEvents";
import { ChatContextType, Chat, Message, MediaType } from "@/types/type";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [chat, setChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // for error or success messages
  const appState = useRef(AppState.currentState);

  // fetch all chats of the user
  const fetchChats = async () => {
    setLoading(true);
    try {
      let res = await getAllChats();
      // console.log(res);

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
    // console.log("Messages fetching", chatId);

    setChat(chatId);
    setLoading(true);
    try {
      let res = await getChatMessages(chatId);
      // console.log(res);

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
  const sendMessageToChat = async (
    chatId: string,
    content: string,
    media?: MediaType[],
  ) => {
    let formatedMedia: string[] = [];

    if (media) {
      media.forEach((item) => {
        formatedMedia.push(item.uri);
      });
    }
    let newMessage: Message = {
      chat: chatId,
      content,
      media: formatedMedia || [],
      sender: {
        _id: user?.id || "temp-id",
        name: user?.name || "temp-name",
        email: user?.email || "temp-email",
        avatar: user?.avatar || "temp-avatar",
      },
      createdAt: new Date().toISOString(),
    };

    try {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      let res = await sendMessage(chatId, content);
      // console.log(res);

      if (!res.success) {
        showToast(res.message);
        setMsg(res.message);
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg !== newMessage),
        );
        return;
      }

      await getMessages(chatId);
    } catch (error) {
      console.log(error);
      showToast("Failed to send message");
      setMsg("Failed to send message");
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg !== newMessage),
      );
    }
  };

  // Fetch chats on component mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Listen to socket events for new messages and friend requests
  useEffect(() => {
    if (!chat) return;

    const unsubscribe = listenChatEvents({
      onNewMessage: async (data: any) => {
        console.log("New message received: ", data);
        await getMessages(chat);
        await fetchChats();
      },
    });

    const unsubscribeFriendEvents = listenFriendEvents({
      onAccepted: async (data: any) => {
        console.log("Friend request accepted: ", data);
        await fetchChats();
      },
    });

    return () => {
      if (unsubscribe) unsubscribe();
      if (unsubscribeFriendEvents) unsubscribeFriendEvents();
    };
  }, [chat]);

  // Listen to app state changes to refresh chats when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === "active"
        ) {
          await fetchChats(); // Reload latest chat
        }

        appState.current = nextState;
        await fetchChats();
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        loading,
        msg,
        messages,
        fetchChats,
        getMessages,
        sendMessageToChat,
      }}
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
