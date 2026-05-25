export type QuizItem = {
  name: string;
  /** Path under /public, e.g. "/games/wes/lion.jpg" */
  image: string;
};

// Drop the real list in here. Place image files under public/games/wes/.
export const ITEMS: QuizItem[] = [
  { image: '/games/wes/placeholder-1.svg', name: 'Lion' },
  { image: '/games/wes/placeholder-2.svg', name: 'Elmo' },
  { image: '/games/wes/placeholder-3.svg', name: 'Giraffe' },
];
