const UserDropdown = () => (
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
);

export default UserDropdown;
