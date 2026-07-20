import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  FriendRequestContextType,
  FriendRequestReceiveType,
  FriendRequestSendType,
} from "@/types/type";
import { listenFriendEvents } from "@/lib/socket/socketEvents";
import {
  acceptFriendRequest,
  findFriendRequest,
  getRequestReceivedList,
  getRequestSentList,
  rejectFriendRequest,
  sendFriendRequest,
} from "@/lib/apis/friend";
import { showToast } from "@/lib/toast";

const FriendRequestContext = createContext<FriendRequestContextType | null>(
  null,
);

export const useFriend = () => {
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
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // for error or success messages
  const [search, setSearch] = useState([]); // search result

  const [receivedRequests, setReceivedRequests] = useState<
    FriendRequestReceiveType[]
  >([]);

  const [sentRequests, setSentRequests] = useState<FriendRequestSendType[]>([]);

  // find friend by name
  const findFriend = async (name: string) => {
    try {
      console.log("find friend hit");

      setLoading(true);
      let res = await findFriendRequest(name);
      // console.log("res" + JSON.stringify(res));

      if (!res.success) {
        setMsg(res.message);
        setSearch([]);
        setLoading(false);
        return;
      }
      setLoading(false);

      setSearch(res.data);
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      setMsg("Failed to search for friend");
    }
  };

  // fetch sent requests
  const fetchSentRequests = async () => {
    try {
      let res = await getRequestSentList();
      if (!res.success) {
        setMsg(res.message);
        return;
      }
      setSentRequests(res.data);
    } catch (error) {
      console.log(error);
      setMsg("Failed to add received request");
      throw new Error("Failed to add received request");
    }
  };

  // fetch received requests
  const fetchReceivedRequests = async () => {
    try {
      let res = await getRequestReceivedList();
      if (!res.success) {
        setMsg(res.message);
        return;
      }
      setReceivedRequests(res.data);
    } catch (error) {
      console.log(error);
      setMsg("Failed to add received request");
      throw new Error("Failed to add received request");
    }
  };

  // send new friend request
  const friendRequest = async (receiverId: string) => {
    try {
      let res = await sendFriendRequest(receiverId);
      if (!res.success) {
        setMsg(res.message);
        showToast(res.message);
        return;
      }

      showToast("Friend request sent");
      addSentRequest(res.data);
    } catch (error) {
      console.log(error);
      setMsg("Failed to send friend request");
      showToast("Failed to send friend request");
      throw new Error("Failed to send friend request");
    }
  };

  // accept friend request
  const acceptRequest = async (requestId: string) => {
    try {
      let res = await acceptFriendRequest(requestId);
      if (!res.success) {
        setMsg(res.message);
        showToast(res.message);
        return;
      }
      showToast("Friend request accepted");
      updateRequestStatus(requestId, "accepted");
    } catch (error) {
      console.log(error);
      setMsg("Failed to accept friend request");
      showToast("Failed to accept friend request");
      throw new Error("Failed to accept friend request");
    }
  };

  // reject friend request
  const rejectRequest = async (requestId: string) => {
    try {
      let res = await rejectFriendRequest(requestId);
      if (!res.success) {
        setMsg(res.message);
        showToast(res.message);
        return;
      }
      showToast("Friend request rejected");
      updateRequestStatus(requestId, "rejected");
    } catch (error) {
      console.log(error);
      setMsg("Failed to reject friend request");
      showToast("Failed to reject friend request");
      throw new Error("Failed to reject friend request");
    }
  };

  // new incoming request
  const addReceivedRequest = async (data: FriendRequestReceiveType) => {
    setReceivedRequests((prev) => {
      const exist = prev.find((item) => item._id === data._id);

      if (exist) return prev;

      return [data, ...prev];
    });
  };

  // add sent request
  const addSentRequest = (data: FriendRequestSendType) => {
    setSentRequests((prev) => {
      const exist = prev.find((item) => item._id === data._id);

      if (exist) return prev;

      return [data, ...prev];
    });
  };

  // accept/reject/cancel
  const updateRequestStatus = (requestId: string, status: string) => {
    setReceivedRequests((prev) =>
      prev.map((item) =>
        item._id === requestId
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );

    setSentRequests((prev) =>
      prev.map((item) =>
        item._id === requestId
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
      prev.filter((item) => item._id !== requestId),
    );

    setSentRequests((prev) => prev.filter((item) => item._id !== requestId));
  };

  // realtime socket listeners
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenFriendEvents({
      onNew: (data: any) => {
        console.log("new request", data);
        console.log(data);

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

  useEffect(() => {
    if (!user) return;

    fetchSentRequests();
    fetchReceivedRequests();
  }, [user]);

  return (
    <FriendRequestContext.Provider
      value={{
        search,
        loading,
        msg,
        findFriend,
        receivedRequests,

        sentRequests,

        addReceivedRequest,

        addSentRequest,

        updateRequestStatus,

        removeReceivedRequest,
        fetchSentRequests,
        fetchReceivedRequests,
        friendRequest,
        acceptRequest,
        rejectRequest,
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};
