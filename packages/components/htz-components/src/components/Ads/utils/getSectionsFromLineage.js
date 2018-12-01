/**
 * Extracts [section, subSection] pair from lineage.
 * @param lineage - an array ordered from path-end to path-start (articleId to root)
 * @returns array of 2 or less strings, the first is the section and the second is the subSection
 * @example (order-only) [ articleId, section3, section2, section1, root ] => [ section1, section2 ]
 */
const getSectionPairFromLineage = lineage => lineage
// 1. remove articleId
  .slice(1)
// 2. change order from most-specific to least-specific
  .reverse()
// 3. leave only section and subSection
  .slice(1, 3)
// 4. extract just the pathSegment
  .map(x => x.pathSegment);

export default getSectionPairFromLineage;
