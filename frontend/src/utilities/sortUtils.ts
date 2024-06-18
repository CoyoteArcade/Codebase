// frontend/src/utilities/sortUtils.ts

export function sortByRelease(games: any[]) {
  return games
    .sort((a: any, b: any) => {
      const dateA: number = Date.parse(a.releaseDate);
      const dateB: number = Date.parse(b.releaseDate);

      if (isNaN(dateA) && isNaN(dateB)) {
        return 0;
      } else if (isNaN(dateA)) {
        return -1;
      } else if (isNaN(dateB)) {
        return 1;
      } else {
        return dateA - dateB;
      }
    })
    .reverse();
}
