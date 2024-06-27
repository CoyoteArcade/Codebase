// frontend/src/utilities/sortUtils.ts

import { Game } from '@/types';

export function sortByRelease(games: Game[]) {
  let sortedGames = games
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
  return sortedGames;
}

// test function by inputing 3 fake games
// console.log(
//   sortByRelease([
//     {
//       id: '1',
//       title: 'Game 1',
//       description: 'Description 1',
//       categories: ['category1', 'category2'],
//       developer: 'Developer 1',
//       rating: 4.5,
//       releaseDate: '2021-01-01',
//       images: ['image1', 'image2'],
//       platforms: ['platform1', 'platform2'],
//       tagline: 'Tagline 1',
//       video: 'video1',
//     },
//     {
//       id: '2',
//       title: 'Game 2',
//       description: 'Description 2',
//       categories: ['category1', 'category2'],
//       developer: 'Developer 2',
//       rating: 4.5,
//       releaseDate: '2021-02-01',
//       images: ['image1', 'image2'],
//       platforms: ['platform1', 'platform2'],
//       tagline: 'Tagline 2',
//       video: 'video2',
//     },
//     {
//       id: '3',
//       title: 'Game 3',
//       description: 'Description 3',
//       categories: ['category1', 'category2'],
//       developer: 'Developer 3',
//       rating: 4.5,
//       releaseDate: '2021-03-01',
//       images: ['image1', 'image2'],
//       platforms: ['platform1', 'platform2'],
//       tagline: 'Tagline 3',
//       video: 'video3',
//     },
//     {
//       id: '4',
//       title: 'Game 4',
//       description: 'Description 4',
//       categories: ['category1', 'category2'],
//       developer: 'Developer 4',
//       rating: 4.5,
//       releaseDate: '',
//       images: ['image1', 'image2'],
//       platforms: ['platform1', 'platform2'],
//       tagline: 'Tagline 4',
//       video: 'video4',
//     },
//   ])
// );
