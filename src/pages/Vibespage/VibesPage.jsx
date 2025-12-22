

// import { useChatStore } from "./store/useChatStore";

// import Sidebar from "./components/Sidebar";
// import NoChatSelected from "./components/NoChatSelected";
// import ChatContainer from "./components/ChatContainer";

// const VibesPage = () => {
//   const { selectedUser } = useChatStore();
//   console.log(localStorage.getItem("token"));

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center justify-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
//           <div className="flex h-full rounded-lg overflow-hidden">
//             <Sidebar />

//             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VibesPage;










import { useEffect, useState } from "react";
import { useChatStore } from "./store/useChatStore";

import Sidebar from "./components/Sidebar";
import NoChatSelected from "./components/NoChatSelected";
import ChatContainer from "./components/ChatContainer";

const VibesPage = () => {
  const { selectedUser } = useChatStore();

  const [isImmersive, setIsImmersive] = useState(false);

  // Lock body scroll while immersive overlay is active
  useEffect(() => {
    const body = document.body;
    if (isImmersive) {
      const prev = body.style.overflow;
      body.dataset.prevOverflow = prev;
      body.style.overflow = "hidden";
    } else {
      if (body.dataset.prevOverflow !== undefined) {
        body.style.overflow = body.dataset.prevOverflow;
        delete body.dataset.prevOverflow;
      } else {
        body.style.overflow = "";
      }
    }
    return () => {
      // cleanup in case component unmounts while immersive
      body.style.overflow = "";
      if (body.dataset.prevOverflow !== undefined) delete body.dataset.prevOverflow;
    };
  }, [isImmersive]);

  const toggleImmersive = () => setIsImmersive((v) => !v);

  return (
    <div className={`${isImmersive ? "fixed inset-0 z-[9999]" : ""} h-screen w-full bg-base-200`} style={isImmersive ? { background: "#000000ff" } : { marginTop: "70px" }}>
      <div className="mx-auto h-full max-w-6xl px-0 sm:px-4">
        <div className="h-full sm:h-[calc(100vh-3rem)] sm:mt-6 sm:rounded-xl bg-base-100 shadow-sm sm:shadow-md border sm:border-base-300 overflow-hidden">
          {/* Fullscreen toggle bar */}
          <div className="sticky top-0 z-20 bg-base-100/90 backdrop-blur border-b border-base-300 px-3 py-2 flex items-center justify-end">
            <button
              onClick={toggleImmersive}
              className="inline-flex items-center gap-2 rounded-full bg-base-200 hover:bg-base-300 px-3 py-1.5 text-sm transition"
              aria-label={isImmersive ? "Exit immersive" : "Enter immersive"}
              title={isImmersive ? "Exit immersive" : "Enter immersive"}
            >
              <span className="hidden sm:inline-block">{isImmersive ? "Exit Immersive" : "Enter Immersive"}</span>
              <span className="sm:hidden">{isImmersive ? "Exit" : "Imm"}</span>
            </button>
          </div>

          {/* Two-column layout on desktop; chat takes full width on mobile */}
          <div className="flex h-[calc(100%-2.75rem)] sm:h-[calc(100%-2.75rem)]">
            {/* Sidebar behavior: full-width (full-screen within container) on small, fixed width on desktop */}
            <div className={`${selectedUser ? "hidden sm:block" : "block"} w-full sm:w-[360px] border-r border-base-300 bg-base-100`}
            >
              <Sidebar />
            </div>

            {/* Chat panel: hidden on small when no chat selected; visible otherwise */}
            <div className={`${selectedUser ? "flex" : "hidden sm:flex"} flex-1 min-w-0 bg-base-100`}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VibesPage;