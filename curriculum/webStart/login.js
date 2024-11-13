function compareVariable(){
  let num1;
  const num2 = 30;
}

// ID란에 입력된 값을 팝업창에 띄우기
function idVal(){
  let userId = document.getElementById('txtId').value;

  // if( userId == "" ){
  if( !userId ){
    alert('아이디를 입력해주세요.')
  } else {
    alert(userId);
  }
}

/* 나만의 함수 만들고 클릭 시 호출하기 */
function hsFunc(){
  alert("1");
  alert("2");
  alert("3");
}