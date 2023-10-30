import Header from '../sections/Header/Header';
// import Hero from '../sections/Hero/Hero';
// import Navbar from '../sections/Navbar/Navbar';
// import Shop from '../sections/Shop/Shop';
import Footer from '../sections/Footer/Footer';
import { Outlet, useLoaderData } from 'react-router-dom';
import React from 'react';

export async function getGames() {
  let games = [];
  const gamesResponse = await fetch('https://delightful-sombrero-slug.cyclic.app/games');
  const gamesJson = await gamesResponse.json();
  if(gamesJson.length) {
    games = gamesJson;
    console.log(games);
  }
  return games;
}

export async function loader() {
  const games = await getGames();
  return games;
}

export const GamesContext = React.createContext([]);

export default function RootPage() {
  const games:any = useLoaderData();

  return (
      <GamesContext.Provider value={games}>
        <Header />
        <Outlet />
        <Footer />
      </GamesContext.Provider>
  );
}
