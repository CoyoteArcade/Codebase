/**
 * This file contains all the types that are used in the frontend.
 * This is a good practice to keep all the types in one place.
 * This way, it is easier to manage and maintain the types.
 *
 */

/**
 * This type represents the game object.
 * It contains all the properties of a game.
 *
 * @property {string} id - The unique identifier of the game.
 * @property {string} title - The title of the game.
 * @property {string} description - The description of the game.
 * @property {string[]} categories - The categories of the game.
 * @property {string} developer - The developer of the game.
 * @property {number} rating - The rating of the game.
 * @property {string} releaseDate - The release date of the game.
 * @property {string[]} images - Array of image urls of the game.
 * @property {string[]} platforms - Array of platforms the game is available on.
 * @property {string} tagline - The tagline of the game.
 * @property {string} video - The url of the video of the game.
 */
export type Game = {
  id: string;
  title?: string;
  description?: string;
  categories?: string[];
  developer?: string;
  rating?: number;
  releaseDate?: string;
  images?: string[];
  platforms?: string[];
  tagline?: string;
  video?: string;
};

export interface ShopProps {
  titleCategories?: string;
  titleGrid?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
  title?: string;
  gameCategory?: string;
  sortBy?: string;
}
