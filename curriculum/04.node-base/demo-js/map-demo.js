// map 함수 (메서드) vs foreach 차이
const arr = [1, 2, 3, 4, 5]

const foreachArr = arr.forEach(function(a, b, c){
  // console.log(`a: ${a} / b: ${b} / c: ${c}`);
  return a * 2
})
console.log(arr);


const mapArr = arr.map(function(a, b, c){
  // console.log(`a: ${a} / b: ${b} / c: ${c}`);
  return a * 2
})
console.log(arr);

console.log(`foreachArr로 return하면 ${foreachArr} \n mapArr로 return하면 ${mapArr}`);
