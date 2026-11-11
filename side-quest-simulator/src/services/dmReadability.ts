/** Reject obvious fragments and generation loops. This is not a semantic grammar checker. */
export const readableDmLine = (line: string): boolean => {
  const words = line.toLowerCase().match(/[a-z]+(?:['’-][a-z]+)*/g) ?? [];
  if (words.length < 6 || words.length > 30 || line.length > 180 || !/[.!?]["”']?$/.test(line)) return false;
  if (!/^["“']?[A-Z]/.test(line) || /\b(?:as an ai|language model|lorem ipsum)\b/i.test(line)) return false;
  const triples = words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(' '));
  if (new Set(triples).size !== triples.length) return false;
  return /\b(?:is|are|was|were|has|have|had|can|could|will|would|should|must|may|might|do|does|did|seems?|looks?|keeps?|wants?|needs?|asks?|says?|said|calls?|called|finds?|found|files?|filed|refuses?|refused|makes?|made|gets?|got|takes?|took|agrees?|agreed|pays?|paid|lets?|let|runs?|ran|stops?|stopped|means?|meant|knows?|knew|tries?|tried|waits?|waited|works?|worked|remains?|remained|comes?|came|goes?|went|leaves?|left)\b/i.test(line);
};
