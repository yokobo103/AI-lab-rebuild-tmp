import { labExperiments } from "./labExperiments";
import type { ResearchLog } from "./researchLogs";
import { routes } from "./routes";

const experimentLogRelations = [
  {
    experimentId: "DEST-001",
    logSlugs: ["world-seed-failure"],
  },
  {
    experimentId: "DEST-005",
    logSlugs: ["nyabit-pause-reaction"],
  },
  {
    experimentId: "DEST-007",
    logSlugs: ["voice-pitch-preprocess"],
  },
] as const;

export function getRelatedLogSlugs(experimentId: string) {
  return experimentLogRelations.find((relation) => relation.experimentId === experimentId)?.logSlugs ?? [];
}

export function getRelatedExperimentId(log: ResearchLog) {
  return experimentLogRelations.find((relation) => (relation.logSlugs as readonly string[]).includes(log.slug))?.experimentId ?? null;
}

export function getRelatedExperiment(log: ResearchLog) {
  const experimentId = getRelatedExperimentId(log);
  return experimentId ? (labExperiments.find((experiment) => experiment.id === experimentId) ?? null) : null;
}

export function getExperimentLogHref(experimentId: string) {
  return routes.readExperimentFilter(experimentId);
}

export function getExperimentLaunchHref(experimentId: string) {
  return routes.experimentAnchor(experimentId);
}
