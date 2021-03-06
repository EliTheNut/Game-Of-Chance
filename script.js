get("startForm").addEventListener("submit", function () {
  let type = get("gamemode").value;
  if (type === "Classic - Singleplayer") {
    classicSingle();
    anime({
      targets: "#startScreen",
      translateY: "-100vh",
      duration: 1500,
      easing: "easeInElastic(1, 1)",
    });
  } else {
    alert("This Gamemode is Currently Under Construction");
  }

  event.preventDefault();
});

function classicSingle() {
  /* define opponent cards */
  for (let i = 0; i < 3; i++) {
    let card = element("div", get("opponent"));
    let cardBack = element("div", card);
    let cardFront = element("div", card);
    cardFront.classList += "cardFront";
    cardBack.classList += "cardBack";
    let design = element("span", cardFront);
    card.classList += "card";
    design.classList += "cardDesign";
    let type;
    if (i === 0) {
      type = "Rock";
    } else if (i === 1) {
      type = "Paper";
    } else if (i === 2) {
      type = "Scissors";
    }
    let cardImg = element("img", design);
    card.setAttribute("Card", type);
    cardImg.src = "./css/" + type + ".png";
  }
  /* define player cards */
  for (let i = 0; i < 3; i++) {
    let card = element("div", get("player"));
    let design = element("span", card);
    card.classList += "card";
    card.addEventListener("click", function () {
      compSelect(i);
      event.preventDefault();
    });
    design.classList += "cardDesign";
    let type;
    if (i === 0) {
      type = "Rock";
    } else if (i === 1) {
      type = "Paper";
    } else if (i === 2) {
      type = "Scissors";
    }
    let cardImg = element("img", design);
    card.setAttribute("Card", type);
    cardImg.src = "./css/" + type + ".png";
  }
}

function compSelect(userVal) {
  let num = Math.floor(Math.random() * 3);
  let cards = get("opponent").getElementsByClassName("card");
  if (num === 0) {
    anime({
      targets: cards[0],
      translateY: "10vw",
      rotateY: 180,
      duration: 500,
    });
    cards[0].classList += " selected";
    testResults(0, userVal);
  } else if (num === 1) {
    anime({
      targets: cards[1],
      translateY: "10vw",
      rotateY: 180,
      duration: 500,
    });
    cards[1].classList += " selected";
    testResults(1, userVal);
  } else if (num === 2) {
    anime({
      targets: cards[2],
      translateY: "10vw",
      rotateY: 180,
      duration: 500,
    });
    cards[2].classList += " selected";
    testResults(2, userVal);
  }
}
function testResults(opp, user) {
  let results = 0;
  if (user === 0) {
    if (opp === 1) {
      results = -1;
    } else if (opp === 2) {
      results = 1;
    }
  } else if (user === 1) {
    if (opp === 0) {
      results = 1;
    } else if (opp === 2) {
      results = -1;
    }
  } else if (user === 2) {
    if (opp === 0) {
      results = -1;
    } else if (opp === 1) {
      results = 1;
    }
  }
  /* winning and losing */
  if (results === 1) {
    winPhase();
  } else if (results === -1) {
    losePhase();
  } else if (results === 0) {
    tiePhase();
  }
}

function winPhase() {
  const messages = ["Success!", "Boo-Yah", "Dub", "Victory Royale", "Bingo"];
  let num = Math.floor(Math.random() * messages.length);
  let text = element("h1", get("gameBoard"));
  text.classList += "text";
  text.innerHTML = "- " + messages[num] + " -";
  animeMessage(text);
  let pscore = parseInt(get("playerScore").innerHTML);
  get("playerScore").innerHTML = pscore + 1;
  setTimeout(() => {
    text.parentNode.removeChild(text);
  }, 2000);
  if (pscore === 100) {
    restart();
  }
}
function tiePhase() {
  const messages = ["Is This Possible", "No wayyy", "Tied Up", "Tie"];
  let num = Math.floor(Math.random() * messages.length);
  let text = element("h1", get("gameBoard"));
  text.classList += "text";
  text.innerHTML = "- " + messages[num] + " -";
  animeMessage(text);
  setTimeout(() => {
    text.parentNode.removeChild(text);
  }, 2000);
}
function losePhase() {
  const messages = [
    "Yikes!",
    "Defeat!",
    "Try Again",
    "Do Better",
    "Git Gud",
    "C'mon Man",
  ];
  let num = Math.floor(Math.random() * messages.length);
  let text = element("h1", get("gameBoard"));
  text.classList += "text";
  text.innerHTML = "- " + messages[num] + " -";
  animeMessage(text);
  let oscore = parseInt(get("opponentScore").innerHTML);
  get("opponentScore").innerHTML = oscore + 1;
  setTimeout(() => {
    text.parentNode.removeChild(text);
  }, 2000);
  if (oscore === 100) {
    restart();
  }
}

function resetCards() {
  let card = document.getElementsByClassName("selected")[0];
  anime({
    targets: card,
    translateY: "0vw",
    rotateY: 360,
    duration: 500,
  });
  card.classList.remove("selected");
}

function animeMessage(elem) {
  let message = anime.timeline({
    targets: elem,
    duration: 750,
  });
  message
    .add({
      translateY: "-5vw",
      opacity: 1,
    })
    .add(
      {
        translateY: "-10vw",
        opacity: 0,
      },
      1500
    );
  setTimeout(() => {
    resetCards();
  }, 1750);
}

function restart() {
  document.getElementById("playerScore").innerHTML = "0";
  document.getElementById("opponentScore").innerHTML = "0";
  let screenWipe = element("div", get("body", 0, "tag"));
  let loader = element("div", screenWipe);
  loader.classList += "loader";
  screenWipe.classList += "screenWipe";
  let wipe = anime.timeline({
    targets: screenWipe,
    duration: 750,
  });
  wipe
    .add({
      translateY: "-100vh",
    })
    .add(
      {
        translateY: "-210vh",
      },
      1500
    );
  setTimeout(() => {
    screenWipe.parentNode.removeChild(screenWipe);
  }, 1750);
}

setTimeout(() => {
  let playerName = document.getElementById("playerName").innerHTML;
  let response = prompt("Enter A Username:");
  if (response != "") {
    playerName = response;
  }
}, 100);
