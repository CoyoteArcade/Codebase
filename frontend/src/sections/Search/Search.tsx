import React, { useContext } from 'react';
import { GamesContext } from '@/pages/Root';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function Search() {
    const { query }:any = useParams();
    const games = useContext(GamesContext);
    const filteredGames = games.filter((game:any) => game.Title.toLowerCase().includes(query.toLowerCase()));
    if(!filteredGames.length) {
        return (
            <div>
                <h1>Search Results</h1>
                <div style={{backgroundColor:"aliceblue"}}>
                    <p>No Games Found</p>
                </div>
            </div>
        );
    }



    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <div style={{backgroundColor:"aliceblue"}}>
                {filteredGames.map((game:any) => (
                    <div key={game.id}>
                        <Link to={`/games/${game.id}`}>
                            <h1>{game.Title}</h1>
                        </Link>
                            <p>{game.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}