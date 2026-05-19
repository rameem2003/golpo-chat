import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { FriendRequestContextType, FriendRequestType } from "@/types/type";
import { listenFriendEvents } from "@/socket/socketEvents";

const FriendRequestContext = createContext<
  FriendRequestContextType | undefined
>(undefined);

export const useFriendRequest = () => {
  const context = useContext(FriendRequestContext);

  if (!context) {
    throw new Error(
      "useFriendRequest must be used within FriendRequestProvider",
    );
  }

  return context;
};

export const FriendRequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const [receivedRequests, setReceivedRequests] = useState<FriendRequestType[]>(
    [],
  );

  const [sentRequests, setSentRequests] = useState<FriendRequestType[]>([]);

  // new incoming request
  const addReceivedRequest = (data: FriendRequestType) => {
    setReceivedRequests((prev) => {
      const exist = prev.find((item) => item.requestId === data.requestId);

      if (exist) return prev;

      return [data, ...prev];
    });
  };

  // add sent request
  const addSentRequest = (data: FriendRequestType) => {
    setSentRequests((prev) => {
      const exist = prev.find((item) => item.requestId === data.requestId);

      if (exist) return prev;

      return [data, ...prev];
    });
  };

  // accept/reject/cancel
  const updateRequestStatus = (requestId: string, status: string) => {
    setReceivedRequests((prev) =>
      prev.map((item) =>
        item.requestId === requestId
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );

    setSentRequests((prev) =>
      prev.map((item) =>
        item.requestId === requestId
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
  };

  // remove request
  const removeReceivedRequest = (requestId: string) => {
    setReceivedRequests((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );

    setSentRequests((prev) =>
      prev.filter((item) => item.requestId !== requestId),
    );
  };

  // realtime socket listeners
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenFriendEvents({
      onNew: (data: any) => {
        console.log("new request", data);

        addReceivedRequest(data);
      },

      onAccepted: (data: any) => {
        console.log("accepted", data);

        updateRequestStatus(data.requestId, "accepted");
      },

      onRejected: (data: any) => {
        console.log("rejected", data);

        updateRequestStatus(data.requestId, "rejected");
      },

      onCancelled: (data: any) => {
        console.log("cancelled", data);

        removeReceivedRequest(data.requestId);
      },
    });

    return unsubscribe;
  }, [user]);

  return (
    <FriendRequestContext.Provider
      value={{
        receivedRequests,

        sentRequests,

        addReceivedRequest,

        addSentRequest,

        updateRequestStatus,

        removeReceivedRequest,
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};
