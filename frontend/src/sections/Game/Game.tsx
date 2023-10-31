import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '@/pages/Root';

export function Game() {
    const games:any = useContext(GamesContext);
    const { id } = useParams();
    const game = games.find((game:any) => game.id === id) || {};

    return (
        <div>
            <h1>Title: {game.Title || 'Unknown'}</h1>
            <p>Description: {game.Description || 'Unknown'}</p>
            <p>Release Date: {game['Release Date'] || 'Unknown'}</p>
            <p>Developer: {game['Publisher/Developer'] || 'Unknown'}</p>
            <p>Rating: {game.Rating || 'Unknown'}</p>
            <div>
            <h2>System Requirements</h2>
                <ul>
                    <li>Graphics: {game['System Requirements'].Graphics || 'Unknown'}</li>
                    <li>OS: {game['System Requirements'].OS || 'Unknown'}</li>
                    <li>Storage: {game['System Requirements'].Storage || 'Unknown'}</li>
                    <li>Memory: {game['System Requirements'].Memory || 'Unknown'}</li>
                    <li>Processor: {game['System Requirements'].Processor || 'Unknown'}</li>
                </ul>
            </div>
        </div>
    );
}
