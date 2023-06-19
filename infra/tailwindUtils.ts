import { twMerge } from 'tailwind-merge';

/**
 * 渡されたクラス名の文字列から、ホバーエフェクトを追加した新しいクラス名の文字列を作成する
 *
 * @param {string} className - ホバーエフェクトを追加したいクラス名のリスト(スペース区切り)
 * @returns {string} ホバーエフェクトが追加された新しいクラス名のリスト(スペース区切り)
 *
 * @example ライトモードとダークモードの背景色にホバーエフェクトを追加する
 * const className = "bg-gray-200 dark:bg-gray-700";
 * const newClassName = addHoverEffect(className);
 * console.log(newClassName); // "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
 */
export const addHoverEffect = (className: string): string => {
  // prettier-ignore
  const levels = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const classes = className.split(' ');

  const hoverClasses = classes.map((c) => {
    const lightBg = 'bg-';
    if (c.startsWith(lightBg) && !c.startsWith('bg-gradient')) {
      const colorAndLevel = c.slice(lightBg.length); // gray-500
      const [color, level] = colorAndLevel.split('-');
      const levelIndex = levels.indexOf(level);

      // Check if the colorAndLevel has a valid level that can be darkened
      if (levelIndex !== -1 && levelIndex < levels.length - 1) {
        return `hover:bg-${color}-${levels[levelIndex + 1]}`;
      }
    }

    const darkBg = 'dark:bg-';
    if (c.startsWith(darkBg) && !c.startsWith('dark:bg-gradient')) {
      const colorAndLevel = c.slice(darkBg.length);
      const [color, level] = colorAndLevel.split('-');
      const levelIndex = levels.indexOf(level);

      // Check if the colorAndLevel has a valid level that can be lightened
      if (levelIndex !== -1 && levelIndex > 0) {
        return `dark:hover:bg-${color}-${levels[levelIndex - 1]}`;
      }
    }

    return '';
  });

  return twMerge(classes, hoverClasses);
};

export const generateHoverSafelist = () => {
  const colors = ['emerald', 'gray', 'red' /* other color names */];
  const darkLevels = ['600', '700', '800', '900'];
  const lightLevels = ['300', '400', '500'];

  return colors.flatMap((color) => [
    ...lightLevels.map((level) => `hover:bg-${color}-${level}`),
    ...darkLevels.map((level) => `dark:hover:bg-${color}-${level}`),
  ]);
};
