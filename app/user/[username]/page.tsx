"use client"

import { createApi } from "@/shared/lib/api";
import { useParams } from "next/navigation";
// app/user/[username]/page.tsx

let api = createApi()
let user = await api.currentUser();

const UserPage = () => {
  const params = useParams();

  return (
    <div>{params.username}</div>
  )
}

export default UserPage;
