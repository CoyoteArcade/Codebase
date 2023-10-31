import Hero from '../sections/Hero/Hero';
// import Navbar from '../sections/Navbar/Navbar';
import Shop from '../sections/Shop/Shop';
import { useContext } from 'react';
import { GamesContext } from './Root'; 

export default function Home() {
  const games:any = useContext(GamesContext);
  return (
    <>
      {/* <div>
        {games.length && games.map((game:any) => (
          <div key={game.id}>
            <h1>{game.Title}</h1>
            <p>{game.Description}</p>
          </div>
        ))}
      </div> */}
      <Hero />
      {/* Add Navbar */}
      <Shop />
    </>
  );
}
