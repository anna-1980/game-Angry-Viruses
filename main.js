const playerName = document.querySelector(".playerName");
const addButton = document.querySelector(".addButton");



//eventListeners

addButton.addEventListener('click', (e) => {
  console.log('button was clicked')
});
playerName.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      console.log('new player enter');
      // addPlayer();
    }
  });

//functions
function addPlayer(event) {
    // console.log(playerName.value);
    // event.preventDefault();
    const player = playerName.value;
    localStorage.setItem('Player-Name', player);
    playerName.value = "";
    
    addButton.classList.add(
      "hideMe", 
    );
    playerName.classList.add(
      "hideMe", 
    );
  }
function ifNoCurrentPlayer() {
     if(!Player-Name || playerName.value('')) {
      addButton.classList.remove(
        "showMe", 
      );
      playerName.classList.remove(
        "showMe", 
      );
      console.log('change to green')
     }
}
ifNoCurrentPlayer();
// classList.add(
//   "list-group-item",
//   "border-0",
//   "d-flex",
//   "align-todos-center",
//   "ps-0"
// );