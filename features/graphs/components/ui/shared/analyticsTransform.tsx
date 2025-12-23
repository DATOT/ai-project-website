export function buildCorrectData(analyses: any[]) {
  const correct = analyses.filter(a => a.is_correct === 1).length;
  return [
    { name: "Correct", value: correct },
    { name: "Incorrect", value: analyses.length - correct },
  ];
}

export function buildTopicData(analyses: any[]) {
  const map: Record<string, number> = {};
  analyses.forEach(a => {
    if (!a.topic) return;
    a.topic.split(" ").forEach((t: string) => {
      map[t] = (map[t] || 0) + 1;
    });
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function buildScoreData(analyses: any[]) {
  return analyses.map(a => ({
    date: new Date(Number(a.created_at)).toLocaleDateString(),
    score: a.score ?? 0,
  }));
}

export function buildErrorData(analyses: any[]) {
  const map: Record<string, number> = {};
  analyses.forEach(a => {
    const errs = JSON.parse(a.errors_json || "[]");
    errs.forEach((e: { type: string }) => {
      map[e.type] = (map[e.type] || 0) + 1;
    });
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
}

export function transformAnalytics(raw: any[]) {
  return {
    scoreTimeline: raw.map((a, i) => ({
      x: i,
      y: a.score ?? 0,
    })),

    correctVsWrong: {
      correct: raw.filter(a => a.is_correct).length,
      wrong: raw.filter(a => !a.is_correct).length,
    },

    topicDistribution: raw.reduce((acc: any, a) => {
      acc[a.topic] = (acc[a.topic] || 0) + 1;
      return acc;
    }, {}),

    errorTypes: raw.reduce((acc: any, a) => {
      if (!a.error_type) return acc;
      acc[a.error_type] = (acc[a.error_type] || 0) + 1;
      return acc;
    }, {}),
  };
}
