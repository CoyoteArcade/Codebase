const { getGames, getCategory } = require("./index.js");

// getGames().then(games => {
//     console.log(games);
// });

// let q = {
//     prop: "Title",
//     val: "Cyberpunk 2077"
// };

// getGames(q).then(games => {
//     console.log("Query:", q.prop, "==", q.val);
//     console.log(games);
// });

const main = async () => {
    const games = await getGames();
    let arrayThing = games;
    // console.log(arrayThing[1]);
    const actionGames = await getCategory("Multiplayer");
    console.log(actionGames[0]);
    process.exit(0);
}

main();