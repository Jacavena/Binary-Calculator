
let concatBin = () => {
  //Input 1
  let binary1 = ""
  let dir1 = document.querySelectorAll('.binaryInput1 button');
  for(let i = 0; i < dir1.length; i++) {
    binary1 += dir1[i].textContent;
  }
  document.getElementById("baseBinary1").innerText = binary1;
  //Input 2
  let binary2 = ""
  let dir2 = document.querySelectorAll('.binaryInput2 button');
  for(let i = 0; i < dir2.length; i++) {
    binary2 += dir2[i].textContent;
  }
  document.getElementById("baseBinary2").innerText = binary2;
}

window.onload = concatBin();

let bin2Dec = () => {
  // Input 1
  let binary1 = document.getElementById("baseBinary1").innerText;
  let arr1 = binary1.split('');
  let decimal1 = 0;
  for(let i in arr1) {
    decimal1 += Number(arr1[i]*(2**(arr1.length-i-1)))
  }
  document.getElementById("baseDecimal1").innerText = decimal1;
  // Input 2
  let binary2 = document.getElementById("baseBinary2").innerText;
  let arr2 = binary2.split('');
  let decimal2 = 0;
  for(let i in arr2) {
    decimal2 += Number(arr2[i]*(2**(arr2.length-i-1)))
  }
  document.getElementById("baseDecimal2").innerText = decimal2;
}
window.onload = bin2Dec

let addBin = () => {

}

let addDec = () => {

}

let toggle = (baseNum) => {
  baseValue = document.getElementById(baseNum);
  if (baseValue.innerText == 0)
    baseValue.innerText = 1;
  else
    baseValue.innerText = 0;
  concatBin();
  bin2Dec();
}