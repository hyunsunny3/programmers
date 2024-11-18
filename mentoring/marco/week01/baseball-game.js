// javascript
// 1. 변수선언으로 숫자 입력을 받는다 (1,9 시작,종료 입력)
// 2. if else 1입력 시 게임 시작, 9입력 시 게임 종료
// 3. 변수 3개에 서로다른 숫자 3개를 받는다.
// 4. 컴퓨터가 정한 숫자 3개를 다른 변수에 받는다.
//컴퓨터가 3자리수를 랜덤하게 뽑는 함수
function computerNumFunc() {
    let numbers = [1,2,3,4,5,6,7,8,9];
    let randomNum = [];
    for(i = 0; i < 3; i++){
        let temp = Math.floor(Math.random() * 9 + 1);
        if(randomNum.indexOf(temp) === -1 ){
            randomNum.push(temp);
        }else{
            i--;
        }
    }
    console.log('randomNum : ' + randomNum);
    return randomNum;
}
function userNumber(user,answer){
    let strike = 0;
    let ball = 0;
    let nothing = 0;
    user.forEach((el,idx) => {
        if(el === answer[idx]){
            strike++;
        }else if(answer.includes(el)){
            ball++;
        }else{
            nothing++;
        }
    });
    return{strike,ball,nothing};
}
function playGame(){
    let startNum = prompt('1을 입력하면 시작, 9를 입력하면 종료합니다.');
    while(startNum == 1){
        let answer=computerNumFunc();
        console.log('컴퓨터가 숫자를 뽑았습니다.');
        do{
            let request = prompt("숫자를 입력해주세요. : ");
            let userInput = request.split('').map(Number);
            if(request === '2'){
                console.log("게임을 종료합니다!");
                break;
            }
            if(userInput.length != 3){
                console.log("세자리 수로 다시 입력해주세요!");
            }
            let {strike,ball,nothing}=userNumber(userInput,answer);
            console.log(`${strike} strike, ${ball} ball, ${nothing} nothing`);
            alert(`${strike} strike, ${ball} ball, ${nothing} nothing`);
            if(strike===3)
            {
                console.log("3개의 숫자를 모두 맞히셨습니다.");
                break;
            }
        }while(true);
        alert("-------게임 종료--------");
        startNum = prompt('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.');
    }
    alert("매플리케이션이 종료되었습니다.");
}
playGame();