"use client";

import { useEffect, useState } from "react";
import { ApiClient } from "@/shared/lib/api";
import { transformAnalytics } from "../shared/analyticsTransform";

export function useTeacherAnalytics(studentId: number | null) {
  const api = new ApiClient();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!studentId) return;

    api.getAIAnalysis({ user_id: studentId }).then(res => {
      setData(transformAnalytics(res.analyses));
    });
  }, [studentId]);

  return data;
}
