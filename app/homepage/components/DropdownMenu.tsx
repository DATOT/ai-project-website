// app/homepage/components/DropdownMenu.tsx
const DropdownMenu = () => {
  return (
    <div className="dropdown bg-base-100/50 backdrop-blur-md">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>

      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100/50 backdrop-blur-md rounded-box mt-3 w-52 p-2 shadow-lg z-50"
      >
        <li><a href="/homepage" className="px-3 py-2 transition">Homepage</a></li>
        <li className="border-t border-gray-300"></li>
        <li><a href="/chats" className="px-3 py-2 transition">Chats</a></li>
        <li><a href="/ai-chats" className="px-3 py-2 transition">AI Chats</a></li>
        <li className="border-t border-gray-300"></li>
        <li><a href="/graphs" className="px-3 py-2 transition">Graphs</a></li>
        <li><a href="/notifications" className="px-3 py-2 transition">Notifications</a></li>
        <li className="border-t border-gray-300"></li>
        <li><a href="/settings" className="px-3 py-2 transition">Settings</a></li>
        <li className="border-t border-gray-300"></li>
        <li><a href="/help" className="px-3 py-2 transition">Help</a></li>
        <li><a href="/logout" className="px-3 py-2 text-red-500 transition">Logout</a></li>
      </ul>
    </div>
  )
}

export default DropdownMenu;
