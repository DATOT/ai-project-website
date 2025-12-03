// app/homepage/components/DropdownMenu.tsx
import { createApi, User } from "@/shared/lib/api";
import { useEffect, useState } from "react";
import GuestDropdown from "./Dropdowns/GuestDropdown";
import UserDropdown from "./Dropdowns/UserDropdown";

const DropdownMenu = () => {
  const [user, setUser] = useState<User | null>(null);
  let api = createApi();
  useEffect(() => {
    api.currentUser().then(setUser).catch(() => setUser(null));
  }, []);
  return (
    <div className="dropdown bg-base-100/50 backdrop-blur-md">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle transition"
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

      {user ? <UserDropdown /> : <GuestDropdown />}
    </div>
  );
}

export default DropdownMenu;
