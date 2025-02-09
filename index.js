let direction={x:0,y:0}
const fs=new Audio('food.mp3')
const gv=new Audio('gameover.mp3')
const mv=new Audio('move.mp3')
const mu=new Audio('music.mp3')
score=0;


let lastpainttime=0;
let sarr=[{x:13,y:15}]
let food={x:6,y:7}
let speed=5;

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastpainttime)/1000<(1/speed)){
        return;
    }
    lastpainttime=ctime;
    gameengine();
}
function isCollide(snakearr){
 for(let i=1;i<sarr.length;i++){
if((snakearr[i].x===snakearr[0].x)&&(snakearr[i].y===snakearr[0].y)){
    return true;
}

 }
 if (snakearr[0].x > 18 || snakearr[0].x < 0 || snakearr[0].y > 18 || snakearr[0].y < 0) {
    return true;
}

 return false;
}
let hiscoreval=0;
function   gameengine(){
    board.innerHTML="";
    if(isCollide(sarr)){
        gv.play();
        mu.pause();
        direction={x:0,y:0};
        alert("game over press any key to play again");
        sarr=[{x:13,y:15}]
        mu.play();
        score=0; }
        if (sarr[0].x === food.x && sarr[0].y === food.y) {
        sarr.unshift({x:sarr[0].x+direction.x,y:sarr[0].y+direction.y})
        fs.play();
        let a=2;
        let b=16;
        score++;
        speed++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            highscoreBox.innerHTML="Highest score:"+hiscoreval;

        }
        scoreBox.innerHTML="Score:"+score;

        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }let i;
    for( i=sarr.length-2;i>=0;i--)
        {

            
            sarr[i+1]={...sarr[i]};
    }
    sarr[0].x+=direction.x;
    sarr[0].y+=direction.y;
    sarr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
if(index===0){
    snakeElement.classList.add('head');
}
else{
    snakeElement.classList.add('snake');
}
        
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;

        foodElement.classList.add('food');
        board.appendChild(foodElement);

}
window.requestAnimationFrame(main);
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
   
    highscoreBox.innerHTML = "HighScore: " + hiscoreval;
}
window.addEventListener('keydown',e=>{
    direction={x:0,y:1}
    mv.play();
    switch(e.key){
        case "ArrowUp":
            direction.x=0;
            direction.y=-1;
            break;
            case "ArrowDown":
            direction.x=0;
            direction.y=1;
            break;
            case "ArrowLeft":
                direction.x=-1;
                direction.y=0;
                break;
                case "ArrowRight":
    direction.x = 1;
    direction.y = 0;
    break;

    }

})