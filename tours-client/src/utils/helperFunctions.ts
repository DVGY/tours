export const addSortParams = (
  currentSortValue: string,
  prevSortValue: string | null
): string => {
  if (prevSortValue) {
    const sortParameters = prevSortValue.split(',');

    const indexOfCurrentValue = sortParameters.indexOf(currentSortValue);

    if (indexOfCurrentValue > -1) {
      return prevSortValue;
    }

    const valueToFind = currentSortValue.includes('-')
      ? currentSortValue.substring(1)
      : `-${currentSortValue}`;
    const indexOfRelatedParams = sortParameters.indexOf(valueToFind);

    if (indexOfRelatedParams > -1) {
      sortParameters.splice(indexOfRelatedParams, 1);
    }

    sortParameters.push(currentSortValue);
    return sortParameters.join(',');
  }

  return currentSortValue;
};

export const addDifficultyParams = (
  currentDifficultyValue: string,
  prevDifficultyValue: string[] | null
): string[] => {
  if (prevDifficultyValue) {
    let difficultyParams: string[] = [];

    difficultyParams = prevDifficultyValue;

    difficultyParams.push(currentDifficultyValue);
    return difficultyParams;
  }

  return [currentDifficultyValue];
};

export const removeDifficultyParams = (
  currentDifficultyValue: string,
  prevDifficultyValue: string[]
): string[] | null => {
  let difficultyParams: string[] = [];
  if (prevDifficultyValue.length == 1) {
    return null;
  }
  if (prevDifficultyValue.length > 0) {
    difficultyParams = prevDifficultyValue;
    const indexOfCurrentDifficultyValue = difficultyParams.indexOf(
      currentDifficultyValue
    );
    if (indexOfCurrentDifficultyValue > -1) {
      difficultyParams.splice(indexOfCurrentDifficultyValue, 1);
    }
    return difficultyParams;
  }
  return null;
};
