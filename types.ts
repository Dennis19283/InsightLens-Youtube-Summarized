export interface FirstPrinciple {
  principle: string;
  explanation: string;
}

export interface VideoSummary {
  videoTitle: string;
  coreConcept: string; // Feynman explanation
  firstPrinciples: FirstPrinciple[];
  summaryPoints: string[];
  analogies: string[];
}