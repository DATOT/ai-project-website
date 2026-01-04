const GuestDropdown = () => (
  <ul
    tabIndex={-1}
    className="menu menu-sm dropdown-content bg-base-100/50 backdrop-blur-md rounded-box mt-3 w-52 p-2 shadow-lg z-50"
  >
    <li><a href="/homepage" className="px-3 py-2 transition">Homepage</a></li>
    <li className="border-t border-gray-300"></li>
    <li><a href="/login" className="px-3 py-2 transition">Login</a></li>
    <li><a href="/register" className="px-3 py-2 transition">Register</a></li>
    <li className="border-t border-gray-300"></li>
    <li><a href="/help" className="px-3 py-2 transition">Help</a></li>
    <li><a href="/about" className="px-3 py-2 transition">About</a></li>
  </ul>
);

export default GuestDropdown;
