const buttons = document.querySelectorAll(".box");
const status = document.querySelector(".status");
const resetbtn = document.querySelector(".reset");
const popup = document.querySelector('.Popup');
const closeBtn = document.getElementById('closeBtn');
const text=document.querySelector(".popup-text")

const win_positions=[
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,5,9],
  [3,5,7],
  [1,4,7],
  [2,5,8],
  [3,6,9]
];

let board = [
  "","","",
  "","","",
  "","",""
];

let current_turn=0

let X_span= document.querySelector(".X-score");
let O_span= document.querySelector(".O-score");

function reset() {
  buttons.forEach((box)=>{
    box.textContent="";
    box.disabled=false;
  });
  for (let i=0;i<9;i++){
    board[i]=""
  }
}

function check(){
  for (let position of win_positions){
   let pos1=position[0]-1;
   let pos2=position[1]-1;
   let pos3=position[2]-1;
   
   let a=board[pos1];
   let b=board[pos2];
   let c=board[pos3];
   
   if (a!="" && b!="" && c!=""){
   if (a==b && a==c){
     text.textContent=a+" won the game."
     let X_score=parseInt(X_span.innerText);
     let O_score=parseInt(O_span.innerText);

     if (a=="X") {
       X_span.textContent=X_score+1;
     }else{
       O_span.textContent=O_score+1;
     }
     popup.showModal();
     reset()
   }
  }
  }
  if (!board.includes("")) {
  text.textContent = "Its a draw";
  popup.showModal();
  reset()
  }
}

// name of the button stores the box number column.

buttons.forEach((box) => {
  box.addEventListener("click" , () => {
    const column=box.getAttribute("name");
    
    box.disabled=true;
    if (current_turn==0){
      box.textContent="X"
      board[column-1]="X"
      current_turn+=1
      status.textContent="O's turn"
    }else{
      box.textContent="O";
      board[column-1]="O"
      current_turn-=1
      status.textContent="X's turn"
    }
    check()
  });
});

closeBtn.addEventListener('click', () => {
   popup.close();
});

resetbtn.addEventListener("click",()=>{
  reset()
  current_turn = 0;
  status.textContent = "X's turn";
  X_span.textContent=0;
  O_span.textContent=0;
})
