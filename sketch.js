let size=100;
let board;
let turn="X";
let game=true;
function setup(){
    createCanvas(300,300);
    board=new Board();
}
function draw(){
    background(0);
    board.show();
}
function mousePressed(){
    if(!game){
        return;
    }
    for(let i in board.cells){
        // 5 is used to avoid clicking on lines
        if(collidePointRect(mouseX,mouseY,board.cells[i].x+5,board.cells[i].y+5,size-5,size-5) && !board.cells[i].status){
            board.cells[i].status=turn;
            // if(turn==="X")
            //     turn="O";
            // else
            //     turn="X";
        }
    }
    let state=getState();
    let win=winCheck(state);
    if(win==="X"){
        alert("X Won!!");
        noLoop();
        game=false;
        return;
    }
    else if(win==="O"){
        alert("O Won!!");
        noLoop();
        game=false;
        return;
    }
    else if(win==="D"){
        alert("Game Over");
        noLoop();
        game=false;
        return;
    }
    // console.log(state);
    let newState=computerMove(state,true)[1];
    let index=0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            board.cells[index].status=newState[i][j];
            index++;
        }
    }
    state=getState();
    win=winCheck(state);
    if(win==="X"){
        alert("X Won!!");
        noLoop();
        game=false;
        return;
    }
    else if(win==="O"){
        alert("O Won!!");
        noLoop();
        game=false;
        return;
    }
    else if(win==="D"){
        alert("Game Over");
        noLoop();
        game=false;
        return;
    }
}
function winCheck(state){
    if((state[0][2]=="X" && state[1][1]=="X" && state[2][0]=="X") ||(state[0][0]=="X" && state[1][1]=="X" && state[2][2]=="X") ||(state[0][0]=="X" && state[0][1]=="X" && state[0][2]=="X") || (state[1][0]=="X" && state[1][1]=="X" && state[1][2]=="X") || (state[2][0]=="X" && state[2][1]=="X" && state[2][2]=="X") ||(state[0][0]=="X" && state[1][0]=="X" && state[2][0]=="X") || (state[0][1]=="X" && state[1][1]=="X" && state[2][1]=="X") || (state[0][2]=="X" && state[1][2]=="X" && state[2][2]=="X") ){
        return "X";
    }
    else if((state[0][2]=="O" && state[1][1]=="O" && state[2][0]=="O") ||(state[0][0]=="O" && state[1][1]=="O" && state[2][2]=="O") ||(state[0][0]=="O" && state[0][1]=="O" && state[0][2]=="O") || (state[1][0]=="O" && state[1][1]=="O" && state[1][2]=="O") || (state[2][0]=="O" && state[2][1]=="O" && state[2][2]=="O") ||(state[0][0]=="O" && state[1][0]=="O" && state[2][0]=="O") || (state[0][1]=="O" && state[1][1]=="O" && state[2][1]=="O") || (state[0][2]=="O" && state[1][2]=="O" && state[2][2]=="O") ){
        return "O";
    }
    if(isBoardFilled(state)){
        return "D";
    }
    return false;
}
function isBoardFilled(state){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(state[i][j]==null)
                return false;
        }
    }
    return true;
}
function getState(){
    let state=[];
    let index=0;
    for(let i=0;i<3;i++){
        let temp=[];
        for(let j=0;j<3;j++){
            temp.push(board.cells[index].status);
            index++;
        }
        state.push(temp);
    }
    return state;
}
function computerMove(state,max){
    // minimax logic goes here
    let win=winCheck(state);
    if(win==="X"){
        return [-10];
    }
    else if(win==="O"){
        return [10];
    }
    else if(win==="D"){
        return [0];
    }
    if(max){
        let maxState;
        let maxScore=-9999;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(state[i][j]==null){
                    state[i][j]="O";
                    let temp=computerMove(state,false);
                    if(temp[0]>maxScore){
                        maxScore=temp[0];
                        maxState=JSON.parse(JSON.stringify(state));
                    }
                    state[i][j]=null;
                }
            }
        }
        return [maxScore,maxState];
    }
    else{
        let minState;
        let minScore=9999;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(state[i][j]==null){
                    state[i][j]="X";
                    let temp=computerMove(state,true);
                    if(temp[0]<minScore){
                        minScore=temp[0];
                        minState=JSON.parse(JSON.stringify(state));
                    }
                    state[i][j]=null;
                }
            }
        }
        return [minScore,minState];
    }
}