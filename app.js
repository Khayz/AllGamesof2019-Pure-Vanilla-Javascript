// Variables
const $games = document.querySelector(".games");
const $moreGames = document.querySelector(".more-games");
const $lessGames = document.querySelector(".more-games");
const $inputGame = document.querySelector("input");
let count = 2;
// Functions
const getVideoGames = () => {
  getData();
};

$moreGames.addEventListener("click", () => {
  getData(count);
  count++;
});

const getData = async (page = 1) => {
  const resolved = await fetch(
    `https://api.rawg.io/api/games?dates=2019-01-01%2C2019-12-31&ordering=-added&page=${page}`
  );
  const data = await resolved.json();
  console.log(data);
  createElementsAndInyectData(data);
};

const createElementsAndInyectData = data => {
  for (let x = 0; x < data.results.length; x++) {
    // Creating the variables for create the elements
    const $article = document.createElement("article");

    const $div = document.createElement("div");
    const $img = document.createElement("img");
    const $h3 = document.createElement("h3");
    const $h4 = document.createElement("h4");

    const $logoAndPlatformGame = document.createElement("div");
    const $trailerGame = document.createElement("video");
    const $seeTrailer = document.createElement("a");
    const $ps4Icon = document.createElement("i");
    const $xboxIcon = document.createElement("i");
    const $pcIcon = document.createElement("i");
    const $nintendoIcon = document.createElement("i");
    const $ps4Text = document.createElement("p");
    const $xboxText = document.createElement("p");
    const $pcText = document.createElement("p");
    const $nintendoText = document.createElement("p");

    const gameImage = data.results[x].background_image;
    const gameName = data.results[x].name;
    const genresArray = [];
    let text1 = "";
    let text2 = "";
    let text3 = "";
    let text4 = "";
    // Functions
    const insertDataToGame = platform => {
      if (platform == "PlayStation 4") {
        $ps4Icon.setAttribute("class", "fab fa-playstation");
        const gameInfo = platform;
        text1 += `${gameInfo}`;
        $ps4Text.textContent = text1;
      }
      if (platform == "Xbox One") {
        $xboxIcon.setAttribute("class", "fab fa-xbox");
        const gameInfo = platform;
        text2 += `${gameInfo}`;
        $xboxText.textContent = text2;
      }
      if (platform == "PC") {
        $pcIcon.setAttribute("class", "fab fa-steam");
        const gameInfo = platform;
        text3 += `${gameInfo}`;
        $pcText.textContent = text3;
      }
      if (platform == "Nintendo Switch") {
        $nintendoIcon.setAttribute("class", "fas fa-gamepad");
        const gameInfo = platform;
        text4 += `${gameInfo}`;
        $nintendoText.textContent = text4;
      }
    };
    // Events

    // Loop FOR, this iterate the results and inyect in an array for show the data
    for (let y = 0; y < 3; y++) {
      if (data.results[x].genres[y]) {
        const gameInfo = data.results[x].genres[y].name;
        genresArray.push(gameInfo);
      }
    }

    for (let z = 0; z < 4; z++) {
      if (data.results[x].platforms[z]) {
        insertDataToGame(data.results[x].platforms[z].platform.name);
      }
    }

    if (data.results[x].clip.clips.full) {
      const video = data.results[x].clip.clip;
      $seeTrailer.setAttribute("href", video);
      $seeTrailer.setAttribute("target", "_blank");
    }

    // Inyecting the data in the elements of DOM
    $img.setAttribute("src", gameImage);
    $logoAndPlatformGame.setAttribute("class", "logo");
    $h3.textContent = gameName;
    $h4.textContent = genresArray.join(" ");
    $seeTrailer.textContent = `See Clip`;
    $games.appendChild($article);
    $article.appendChild($img);
    $article.appendChild($h3);
    $article.appendChild($div);
    $article.appendChild($logoAndPlatformGame);
    $div.appendChild($h4);
    $div.appendChild($seeTrailer);
    $logoAndPlatformGame.appendChild($ps4Icon);
    $logoAndPlatformGame.appendChild($xboxIcon);
    $logoAndPlatformGame.appendChild($pcIcon);
    $logoAndPlatformGame.appendChild($nintendoIcon);
    $ps4Icon.appendChild($ps4Text);
    $xboxIcon.appendChild($xboxText);
    $pcIcon.appendChild($pcText);
    $nintendoIcon.appendChild($nintendoText);
  }
};

getVideoGames();
