import { generateSummaryEntity, SummaryEntity } from 'search-summary';

export type searchSummary = SummaryEntity;

export const newSearchSummary = (props: {
  keyword: string;
  text: string;
}): searchSummary => {
  const { keyword, text } = props;
  return generateSummaryEntity(text, keyword, {
    maxLength: 100,
    beforeLength: 40,
  }) as searchSummary; // TODO: allow undefined
};
