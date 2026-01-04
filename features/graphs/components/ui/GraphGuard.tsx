"use client";

import { useEffect, useState } from "react";
import { ApiClient, User } from "@/shared/lib/api";
import StudentGraphPage from "./student/StudentGraphPage";
import TeacherGraphPage from "./teacher/TeacherGraphPage";

interface Props {
  userId: number;
}

export default function GraphGuard({ userId }: Props) {
  const [me, setMe] = useState<User | null>(null);
  const api = new ApiClient();

  useEffect(() => {
    api.currentUser().then(setMe).catch(console.error);
  }, []);

  if (!me) return <div>Loading...</div>;

  if (me.is_teacher) {
    return <TeacherGraphPage teacher={me} />;
  }

  return <StudentGraphPage userId={userId} />;
}
