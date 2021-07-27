export type searchSummary = {
  isBeforeEllipsed: boolean;
  beforeText: string;
  keyword: string;
  afterText: string;
  isAfterEllipsed: boolean;
};

export const toSearchSummary = (props: {
  keyword: string;
  text: string;
}): searchSummary => {
  const { keyword, text } = props;
  const wholeLength = 100;
  const beforeLength = 40;

  const afterLength = wholeLength - beforeLength - keyword.length;
  const keywordIndex = text.indexOf(keyword);
  const beforeIndex = keywordIndex - beforeLength;
  const afterIndex = keywordIndex + keyword.length;
  const isNearTop = beforeIndex <= 0;

  return {
    isBeforeEllipsed: !isNearTop,
    beforeText: isNearTop
      ? text.substr(0, keywordIndex)
      : text.substr(beforeIndex, beforeLength),
    keyword: text.substr(keywordIndex, keyword.length),
    afterText: isNearTop
      ? text.substr(afterIndex, wholeLength - afterIndex)
      : text.substr(afterIndex, afterLength),
    isAfterEllipsed: beforeIndex + wholeLength < text.length,
  };
};
