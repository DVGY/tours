export const addOrRemoveSortParams = (
  currentSortValue: string,
  prevSortValue: string | null
): string | null => {
  if (prevSortValue) {
    let sortParameters = prevSortValue.split(',');

    const indexOfCurrentValue = sortParameters.indexOf(currentSortValue);

    // sort parameter already exist
    if (indexOfCurrentValue > -1) {
      // So Remove the sort parameter

      sortParameters = sortParameters.filter(
        (sortValue) => sortValue !== currentSortValue
      );

      if (sortParameters.length > 0) {
        return sortParameters.join(',');
      }

      return null;
    }

    // Check whether sort order is asc or desc then add or remove accordingly
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

// const addSortParams = () => {};

export const addDifficultyParams = (
  currentDifficultyValue: string,
  prevDifficultyValue: string[] | null
): string[] => {
  if (prevDifficultyValue) {
    return [...prevDifficultyValue, currentDifficultyValue];
  }

  return [currentDifficultyValue];
};

export const removeDifficultyParams = (
  currentDifficultyValue: string,
  prevDifficultyValue: string[]
): string[] | null => {
  if (prevDifficultyValue.length == 1) {
    return null;
  }
  if (prevDifficultyValue.length > 0) {
    return prevDifficultyValue.filter((v) => v !== currentDifficultyValue);
  }
  return null;
};
