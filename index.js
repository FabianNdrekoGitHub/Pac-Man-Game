document.addEventListener("DOMContentLoaded", ()=>{
    const width = 62;
    let score = 0;
    const grid = document.querySelector('.grid');
    const pacManSpeed = 200;

    // 62x18
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,4,4,1,1,1,0,0,1,1,1,0,0,0,0,1,0,0,0,1,4,4,1,1,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,1,0,0,1,
        1,0,0,0,1,1,4,4,4,1,0,1,0,3,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
        4,0,5,5,5,5,5,0,0,0,0,0,0,5,5,0,0,1,0,0,5,5,5,5,5,0,0,1,0,0,0,0,1,0,0,5,5,0,0,0,5,5,0,1,0,0,5,5,0,0,1,1,5,5,0,0,1,0,5,5,0,1,
        1,0,5,5,4,4,5,5,0,0,0,0,5,5,5,5,0,0,0,5,5,5,5,5,5,0,0,1,1,1,1,1,1,0,0,5,5,5,0,5,5,5,0,0,0,5,5,5,5,0,0,1,5,5,5,0,0,0,5,5,0,1,
        1,0,5,5,4,4,4,5,5,0,0,5,5,4,4,5,5,0,0,5,5,0,0,0,0,0,0,0,4,4,4,4,0,0,0,5,5,5,5,5,5,5,0,0,5,5,4,4,5,5,0,0,5,5,5,5,0,0,5,5,0,1,
        1,0,5,5,4,4,5,5,0,0,5,5,4,4,4,4,5,5,0,5,5,0,0,0,1,0,1,1,1,2,2,1,1,1,0,5,5,0,5,0,5,5,0,5,5,4,4,4,4,5,5,0,5,5,0,5,5,0,5,5,0,1,
        1,0,5,5,5,5,5,0,1,0,5,5,5,5,5,5,5,5,0,5,5,0,0,0,1,0,1,2,2,2,2,2,2,1,0,5,5,0,0,0,5,5,0,5,5,5,5,5,5,5,5,0,5,5,0,0,5,5,5,5,0,1,
        1,0,5,5,0,0,0,0,1,0,5,5,5,5,5,5,5,5,0,5,5,0,1,1,1,0,1,2,2,2,2,2,2,1,0,5,5,0,0,0,5,5,0,5,5,5,5,5,5,5,5,0,5,5,0,0,0,5,5,5,0,1,
        1,1,5,5,0,1,1,0,1,0,5,5,0,0,0,0,5,5,0,5,5,0,1,1,1,0,1,2,2,2,2,2,2,1,0,5,5,1,1,0,5,5,0,5,5,0,0,0,0,5,5,0,5,5,0,0,0,0,5,5,0,1,
        1,0,5,5,0,1,1,0,1,0,5,5,0,1,1,0,5,5,0,5,5,0,0,0,0,0,1,1,1,2,2,1,1,1,0,5,5,0,0,0,5,5,0,5,5,0,1,1,0,5,5,0,5,5,1,3,0,0,5,5,0,1,
        1,0,5,5,0,1,1,0,0,0,5,5,0,1,1,0,5,5,0,5,5,5,5,5,5,0,0,0,4,4,4,4,0,0,0,5,5,0,1,0,5,5,0,5,5,0,1,1,0,5,5,0,5,5,0,0,1,0,5,5,0,1,
        1,0,5,5,0,1,1,0,0,0,5,5,0,1,0,0,5,5,0,0,5,5,5,5,5,0,1,0,1,1,1,0,0,1,0,5,5,0,1,0,5,5,0,5,5,0,0,1,0,5,5,0,5,5,0,0,1,0,5,5,0,4,
        1,3,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,4,4,1,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,
        1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,4,1,1,3,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    ];

    /* 0 - pac-dots
       1 - wall
       2 - ghost-lair
       3 - power-pellet
       4 - empty
       5 - TALEAS */


    const squares = [];

    function createBoard(){
        for(let index=0; index < layout.length; index++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            if(layout[index] === 0){
                squares[index].classList.add("pac-dot");
            }
            if(layout[index] === 1){
                squares[index].classList.add("wall");
            }
            if(layout[index] === 2){
                squares[index].classList.add("ghost-lair");
            }
            if(layout[index] === 3){
                squares[index].classList.add("power-pellet");
            }
            if(layout[index] === 4){
                squares[index].classList.add("empty");
            }
            if(layout[index] === 5){
                squares[index].classList.add("taleas");
            }
        }
    }
    createBoard();

    let pacmanCurrentIndex = 900;
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    squares[pacmanCurrentIndex].classList.add("pac-man");

    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
            score++;
        }
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
        squares[pacmanCurrentIndex].classList.add("empty");
        document.getElementById("score").innerHTML = score;
    }

    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
            score += 10;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
        }
        squares[pacmanCurrentIndex].classList.remove("power-pellet");
        squares[pacmanCurrentIndex].classList.add("empty");
        document.getElementById("score").innerHTML = score;
    }

    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }


    
    var direction = "";
    var moveInterval;
    function movePacman(e){

        clearInterval(moveInterval);
        
        var oldDirection = direction;

        switch(e.key){
            case 'ArrowLeft':
                direction = "-left";

                // teleport
                if(squares[pacmanCurrentIndex] === squares[248]){
                    pacmanCurrentIndex = 867;
                    updatePacmanPosition();
                    break;
                }

                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex - 1].classList.contains("wall") && 
                        !squares[pacmanCurrentIndex - 1].classList.contains("taleas") && 
                        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex -= 1;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);

                break;
            case 'ArrowRight':
                direction = "-right";
                if(squares[pacmanCurrentIndex] === squares[867]){
                    pacmanCurrentIndex = 248;
                    updatePacmanPosition();
                    break;
                }
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex + 1].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex += 1;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
            case 'ArrowUp':
                direction = "-up";
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex - width].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex -= width;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
            case 'ArrowDown':
                direction = "-down";
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex + width].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex += width;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
        }
    }

    function updatePacmanPosition(){
        squares.forEach(square => square.classList.remove("pac-man"+direction));
        squares[pacmanCurrentIndex].classList.add("pac-man"+direction);
        pacDotEaten();
        powerPelletEaten();
        checkForWin();
    }

    document.addEventListener('keyup', movePacman); 

    class Ghost {
        constructor(className, startIndex, ghostRestartIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.ghostRestartIndex = ghostRestartIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.timerId = null;
        }
    }
    
    const ghosts = [
        new Ghost ("blinky", 200, 587,  500),
        new Ghost ("pinky", 830, 588, 400),
        new Ghost ("inky", 369, 589, 300),
        new Ghost ("clyde", 700, 590, 250),
    ];

    ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add(ghost.className, "ghost"));

    
    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost) {
        let pocDotOrEmpty = "empty";
        let powerPelletOrEmpty = "empty";
        let lastDirection = null; 
    
        ghost.timerId = setInterval(() => {
            let ghostDirection = null;
            let minDistance = Infinity;
    
            const directions = [-1, 1, width, -width];
            const validDirections = directions.filter(direction => {
                const nextIndex = ghost.currentIndex + direction;
                return (
                    !squares[nextIndex].classList.contains("wall") &&
                    !squares[nextIndex].classList.contains("ghost") &&
                    !squares[nextIndex].classList.contains("taleas") &&
                    direction !== -lastDirection 
                );
            });
    
            validDirections.forEach(direction => {
                const nextIndex = ghost.currentIndex + direction;
                const distanceToPacman = Math.abs(nextIndex % width - pacmanCurrentIndex % width) +
                                         Math.abs(Math.floor(nextIndex / width) - Math.floor(pacmanCurrentIndex / width));
                if (distanceToPacman < minDistance) {
                    minDistance = distanceToPacman;
                    ghostDirection = direction;
                }
            });
    
            if (ghostDirection !== null) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
    
                if (
                    !squares[ghost.currentIndex].classList.contains("ghost-lair") &&
                    !squares[ghost.currentIndex].classList.contains("empty")
                ) {
                    if (pocDotOrEmpty === "pac-dot") {
                        squares[ghost.currentIndex].classList.add("pac-dot");
                        pocDotOrEmpty = "empty";
                    }
                    if (powerPelletOrEmpty === "power-pellet") {
                        squares[ghost.currentIndex].classList.add("power-pellet");
                        powerPelletOrEmpty = "empty";
                    }
                }

                ghost.currentIndex += ghostDirection;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    
                lastDirection = ghostDirection;
    

                if (squares[ghost.currentIndex].classList.contains("pac-dot")) {
                    pocDotOrEmpty = "pac-dot";
                }
                if (squares[ghost.currentIndex].classList.contains("power-pellet")) {
                    powerPelletOrEmpty = "power-pellet";
                }
    
                squares[ghost.currentIndex].classList.remove("pac-dot");
            } else {
                lastDirection = null;
            }
    
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
    
                if (ghost.currentIndex === pacmanCurrentIndex) {
                    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                    ghost.currentIndex = ghost.ghostRestartIndex;
                    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    
                    score += 100;
                    ghost.isScared = false;
                }
            }
    
            if (!ghost.isScared) {
                checkForGameOver();
            }
    
        }, ghost.speed);
    }
    

    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains("ghost")){
            squares[pacmanCurrentIndex].classList.add("pac-man-eaten");
            ghosts.forEach(ghost => clearInterval(ghost.timerId));

            document.removeEventListener('keyup', movePacman);

            setTimeout(function(){ 

                const style = document.createElement('style');
                style.innerHTML = `
                    #grid {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }
                    #grid h1{
                        font-size: 60px;
                    }
                    #grid h1, #restart-btn {
                        color: #8F0B13;
                    }
                    #restart-btn {
                        background-color: #8F0B13;
                        border: 3px solid #380F17;
                        border-radius: 5px;
                        padding: 20px;
                        font-size: 18px;
                        color: #380F17;
                    }
                    #restart-btn:hover {
                        background-color: #ae0e18;
                        color: #380F17;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);

                document.getElementById('grid').innerHTML = `<h1>Not this time! Try again for a win! &#128640;</h1>  <button id="restart-btn">Restart</button>`;

                document.getElementById('restart-btn').addEventListener('click', function() {
                    location.reload(); 
                });
            } , 500);
        }
    }
    
    function checkForWin(){

        if(score >= 200){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function(){ 

                const style = document.createElement('style');
                style.innerHTML = `
                    #grid {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }
                    #grid h1{
                        font-size: 60px;
                    }
                    #grid h1, #restart-btn {
                        color: #8F0B13;
                    }
                    #restart-btn {
                        background-color: #8F0B13;
                        border: 3px solid #380F17;
                        border-radius: 5px;
                        padding: 20px;
                        font-size: 18px;
                        color: #380F17;
                    }
                    #restart-btn:hover {
                        background-color: #ae0e18;
                        color: #380F17;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);

                document.getElementById('grid').innerHTML = `<h1>You did it! Victory is yours! &#127884;</h1>  <button id="restart-btn">Play Again</button>`;

                document.getElementById('restart-btn').addEventListener('click', function() {
                    location.reload(); 
                });
            } , 100);
        }
    }
    
})