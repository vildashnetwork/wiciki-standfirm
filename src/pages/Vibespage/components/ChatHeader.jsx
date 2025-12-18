import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import styles from "./hatHeader.module.css";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // return (
  //   <div className="p-2.5 border-b border-base-300">
  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center gap-3">
  //         {/* Avatar */}
  //         <div className="avatar">
  //           <div className="size-10 rounded-full relative">
  //             <img src={selectedUser.picture || "/avatar.png"} alt={selectedUser.name} />
  //           </div>
  //         </div>

  //         {/* User info */}
  //         <div>
  //           <h3 className="font-medium">{selectedUser.name}</h3>
  //           <p className="text-sm text-base-content/70">
  //             {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
  //           </p>
  //         </div>
  //       </div>

  //       {/* Close button */}
  //       <button onClick={() => setSelectedUser(null)}>
  //         <X />
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.userSection}>
          {/* Avatar */}
          <div className={styles.avatar}>
            <div className={styles.avatarWrapper}>
              <img
                src={selectedUser.picture || "/avatar.png"}
                alt={selectedUser.name}
                className={styles.avatarImage}
              />
            </div>
          </div>

          {/* User info */}
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{selectedUser.name}</h3>
            <p className={styles.status}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className={styles.closeButton}
          aria-label="Close chat"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;