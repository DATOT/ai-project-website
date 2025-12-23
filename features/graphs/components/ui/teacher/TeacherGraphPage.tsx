"use client";

import { useState } from "react";
import StudentSelector from "./StudentSelector";
import { useTeacherAnalytics } from "./useTeacherAnalytics";
import CorrectChart from "../shared/charts/CorrectChart";
import TopicPie from "../shared/charts/TopicPie";
import ScoreLine from "../shared/charts/ScoreLine";
import ErrorBar from "../shared/charts/ErrorBar";
import { User } from "@/shared/lib/api";

export default function TeacherGraphPage({ teacher }: { teacher: User }) {
  const [studentId, setStudentId] = useState<number | null>(null);
  const data = useTeacherAnalytics(studentId);

  return (
    <>
      <h2>Teacher Analytics</h2>
      <StudentSelector onSelect={setStudentId} />

      {data && (
        <>
          <ScoreLine data={data.scoreTimeline} />
          <CorrectChart data={data.correctVsWrong} />
          <TopicPie data={data.topicDistribution} />
          <ErrorBar data={data.errorTypes} />
        </>
      )}
    </>
  );
}
