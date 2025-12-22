import { useEffect } from "react";
import { X, Phone, Video, Bell, Image as ImageIcon, Trash2, ShieldBan } from "lucide-react";

/*
  UserSettingsPanel
  - Slide-over profile/settings panel for the active chat user
  - Tailwind-only styling; responsive and animated
  - Props:
    - open: boolean (controls visibility)
    - onClose: function (close handler)
    - user: object (selected user: {_id, name, picture, username?, email?})
    - online: boolean (online status for the user)
*/

const UserSettingsPanel = ({ open, onClose, user, online = false }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      {/* Backdrop */}
      <button
        aria-label="Close profile"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[380px] lg:w-[420px] bg-base-100 border-l border-base-300 shadow-xl
        transform transition-transform duration-300 ease-out translate-x-0`}
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-base-300 bg-base-100/95 backdrop-blur px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user?.picture || "/avatar.png"}
                alt={user?.name || "User"}
                className="h-12 w-12 rounded-full object-cover"
              />
              {online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-base-100" />
              )}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{user?.name || "User"}</div>
              <div className="text-xs text-zinc-500">{online ? "Online" : "Offline"}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full p-2 hover:bg-base-200"
            aria-label="Close"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="h-full overflow-y-auto p-4 space-y-6">
          {/* Profile section */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-500">Profile</h3>
            <div className="rounded-xl border border-base-300 bg-base-100">
              <div className="px-4 py-3 text-sm flex items-center justify-between">
                <span className="text-zinc-600">Display name</span>
                <span className="font-medium truncate ml-3">{user?.name || "—"}</span>
              </div>
              {user?.username && (
                <div className="px-4 py-3 text-sm flex items-center justify-between border-t border-base-300">
                  <span className="text-zinc-600">Username</span>
                  <span className="font-medium truncate ml-3">@{user.username}</span>
                </div>
              )}
              {user?.email && (
                <div className="px-4 py-3 text-sm flex items-center justify-between border-t border-base-300">
                  <span className="text-zinc-600">Email</span>
                  <span className="font-medium truncate ml-3">{user.email}</span>
                </div>
              )}
            </div>
          </section>

          {/* Quick actions */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-500">Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="group flex flex-col items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-3 hover:bg-base-200 transition">
                <span className="rounded-full bg-blue-500/10 p-2 text-blue-500"><Phone size={18} /></span>
                <span className="text-xs">Call</span>
              </button>
              <button className="group flex flex-col items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-3 hover:bg-base-200 transition">
                <span className="rounded-full bg-blue-500/10 p-2 text-blue-500"><Video size={18} /></span>
                <span className="text-xs">Video</span>
              </button>
              <button className="group flex flex-col items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-3 hover:bg-base-200 transition">
                <span className="rounded-full bg-amber-500/10 p-2 text-amber-500"><Bell size={18} /></span>
                <span className="text-xs">Mute</span>
              </button>
            </div>
          </section>

          {/* Media */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-500">Shared media</h3>
              <button className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-700">
                <ImageIcon size={14} /> View all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-base-200">
                  {/* placeholder tile */}
                </div>
              ))}
            </div>
          </section>

          {/* Danger zone */}
          <section>
            <h3 className="mb-2 text-sm font-semibold text-zinc-500">Privacy</h3>
            <div className="space-y-2">
              <button className="w-full inline-flex items-center justify-between rounded-lg border border-base-300 bg-base-100 px-4 py-2.5 text-sm hover:bg-base-200 transition">
                <span className="inline-flex items-center gap-2"><ShieldBan size={16} className="text-red-500" /> Block user</span>
                <span className="text-zinc-400">—</span>
              </button>
              <button className="w-full inline-flex items-center justify-between rounded-lg border border-base-300 bg-base-100 px-4 py-2.5 text-sm hover:bg-base-200 transition">
                <span className="inline-flex items-center gap-2"><Trash2 size={16} className="text-red-500" /> Delete conversation</span>
                <span className="text-zinc-400">—</span>
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
};

export default UserSettingsPanel;
