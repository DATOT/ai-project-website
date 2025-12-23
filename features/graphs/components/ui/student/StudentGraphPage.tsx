"use client";

import { useEffect, useState } from "react";
import { ApiClient } from "@/shared/lib/api";
import CorrectChart from "../shared/charts/CorrectChart";
import TopicPie from "../shared/charts/TopicPie";
import ScoreLine from "../shared/charts/ScoreLine";
import ErrorBar from "../shared/charts/ErrorBar";
import { transformAnalytics } from "../shared/analyticsTransform";

export default function StudentGraphPage({ userId }: { userId: number }) {
  const api = new ApiClient();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getAIAnalysis({ user_id: userId }).then(res => {
      setData(transformAnalytics(res.analyses));
      console.log(data);
    });
  }, [userId]);

  if (!data) return <div>Loading analytics...</div>;

  return (
    <>
      <ScoreLine data={data.scoreTimeline} />
      <CorrectChart data={data.correctVsWrong} />
      <TopicPie data={data.topicDistribution} />
      <ErrorBar data={data.errorTypes} />
    </>
  );
}
