import { GamesContext } from "@/pages/Root";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export function Game() {

    const games:any = useContext(GamesContext);
    const { id } = useParams();
    const game = games.find((game:any) => game.id === id) || {};

    return (
        <div>
            <h1>Title: {game.Title}</h1>
            <p>Description: {game.Description}</p>
            <p>Release Date: {game["Release Date"]}</p>
            <p>Developer: {game["Publisher/Developer"]}</p>
            <p>Rating: {game.Rating}</p>
            <div>
            <h2>System Requirements</h2>
                <ul>
                    <li>Graphics: {game["System Requirements"].Graphics}</li>
                    <li>OS: {game["System Requirements"].OS}</li>
                    <li>Storage: {game["System Requirements"].Storage}</li>
                    <li>Memory: {game["System Requirements"].Memory}</li>
                    <li>Processor: {game["System Requirements"].Processor}</li>
                </ul>
            </div>
        </div>
    )
}
