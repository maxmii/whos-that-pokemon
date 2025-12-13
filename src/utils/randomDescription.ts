function getRandomDescription(
  descriptions: string[] | undefined
): string | null {
  if (!descriptions || !descriptions.length) {
    return null;
  }

  const descLength = descriptions.length;
  const index = Math.floor(Math.random() * descLength);

  return descriptions[index];
}

export default getRandomDescription;
