export type SearchQuery = {
  keyword?: string;
  tag?: string;
};

// export const newSearchQuery = (searchStr: string): SearchQuery => {
//   const commandRegex = /\w+:\S+/g;
//   const keyword = searchStr.replace(commandRegex, '').trim();
//   const commands = searchStr.match(commandRegex)?.reduce((acc, commandStr) => {
//     const [key, value] = commandStr.split(':');
//     return { ...acc, [key]: value };
//   }, {}) as { [key: string]: string };

//   return {
//     keyword,
//     tag: commands?.tag,
//   };
// };
