const obj1 = {}
const obj2 = { message : "하이"}

console.log(Object.keys(obj1)) // []
console.log(Object.keys(obj2)) // ['message']

console.log(Object.keys(obj1).length === 0); // true
console.log(Object.keys(obj2).length === 0); // false


const str1 = ""
const str2 = "one" // 문자열도 객체

console.log(isEmpty(str1)); // true
console.log(isEmpty(str2)); // false

function isEmpty(obj){
  // if(obj.constructor === Object) // 객체인지 확인
  if(Object.keys(obj).length === 0){
    return true;
  }else{
    return false;
  }
}