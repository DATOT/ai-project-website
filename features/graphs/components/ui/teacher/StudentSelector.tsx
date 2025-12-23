"use client";

import { useEffect, useState } from "react";
import { ApiClient, TeacherStudent } from "@/shared/lib/api";

export default function StudentSelector({
  onSelect,
}: {
  onSelect: (id: number) => void;
}) {
  const api = new ApiClient();
  const [students, setStudents] = useState<TeacherStudent[]>([]);

  useEffect(() => {
    api.getMyStudents().then(setStudents);
  }, []);

  return (
    <select onChange={e => onSelect(Number(e.target.value))}>
      <option value="">Select student</option>
      {students.map(s => (
        <option key={s.id} value={s.id}>
          {s.username}
        </option>
      ))}
    </select>
  );
}
