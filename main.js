let baseBinary1 = document.getElementById("baseBinary1");
let baseBinary2 = document.getElementById("baseBinary2");
let baseDecimal1 = document.getElementById("baseDecimal1");
let baseDecimal2 = document.getElementById("baseDecimal2");

let concatBin = () => { // Concatenate Binary
  //Input 1
  let binary1 = ""
  let dir1 = document.querySelectorAll('.binaryInput1 button');
  for(let i = 0; i < dir1.length; i++) {
    binary1 += dir1[i].textContent;
  }
  baseBinary1.textContent = binary1;
  //Input 2
  let binary2 = ""
  let dir2 = document.querySelectorAll('.binaryInput2 button');
  for(let i = 0; i < dir2.length; i++) {
    binary2 += dir2[i].textContent;
  }
  baseBinary2.textContent = binary2;
  bin2Dec(); // Convert to Decimal
  addBin(); // Perform Addition
  subBin(); // Subtract Binary
}

let bin2Dec = () => { // Binary to Decimal Conversion
  // Input 1
  let binary1 = baseBinary1.textContent;
  let arr1 = binary1.split('');
  let decimal1 = 0;
  for(let i in arr1) {
    decimal1 += Number(arr1[i]*(2**(arr1.length-i-1)))
  }
  baseDecimal1.textContent = decimal1;
  // Input 2
  let binary2 = baseBinary2.textContent;
  let arr2 = binary2.split('');
  let decimal2 = 0;
  for(let i in arr2) {
    decimal2 += Number(arr2[i]*(2**(arr2.length-i-1)))
  }
  baseDecimal2.innerText = decimal2;
  opDec('add'); // Perform Addition
  opDec('sub'); // Perform Subtraction
  opDec('mult'); // Perform Multiplication
  opDec('div'); // Perform Division
}

let opDec = (operator) => {
  let baseDec1 = operator == 'div' ? parseFloat(baseDecimal1.textContent): 
    Number(baseDecimal1.textContent);
  let baseDec2 = operator == 'div' ? parseFloat(baseDecimal2.textContent):
    Number(baseDecimal2.textContent);
  let ansDec = operator == 'add'? baseDec1 + baseDec2: operator == 'sub' ?
    baseDec1 - baseDec2: operator == 'mult' ? baseDec1 * baseDec2:
    Math.round((baseDec1 / baseDec2) * 100) / 100;
  let id = operator == 'add' ? 'addDecimal': operator == 'sub' ? 'subDecimal':
    operator == 'mult' ? 'multDecimal': 'divDecimal';
  document.getElementById(id).textContent = ansDec;
}

let addBin = () => { // Binary Addition
  let binary1 = baseBinary1.textContent;
  let binary2 = baseBinary2.textContent;
  let arrBin1 = binary1.split('');
  arrBin1.unshift('0');
  let arrBin2 = binary2.split('');
  arrBin2.unshift('0');
  let sumBin = [];
  for (let i = arrBin1.length-1; i >=0; i--) {
    let ele1 = Number(arrBin1[i]), ele2 = Number(arrBin2[i]);
    let sum = ele1 + ele2;
    if(sum == 2) {arrBin1[i-1] = Number(arrBin1[i-1]) + 1; sum = 0;}
    if(sum == 3) {arrBin1[i-1] = Number(arrBin1[i-1]) + 1; sum = 1;}
    sumBin.unshift(sum);
  }
  sumBin = sumBin.join('')
  document.getElementById("addBinary").textContent = parseInt(sumBin, 10)
}

let subBin = () => { // Binary Subtraction
  let bin1 = baseBinary1.textContent.split('');
  let bin2 = baseBinary2.textContent.split('');
  let check = checkHigher(bin1, bin2);
  let diffBin = [];
  if(check == 'equal') {
    for (let i in bin1) {
      diffBin.push('0');
    }
  } else if(check == 'arr1') diffBin = subOperation(bin1, bin2);
  else if(check == 'arr2') {
    diffBin = subOperation(bin2, bin1);
    diffBin.unshift('-');
  }
  diffBin = diffBin.join('');
  document.getElementById('subBinary').textContent = parseInt(diffBin, 10);
  multBin(); // Multiply Binary
}

let subOperation = (arr1, arr2) => {
  let arr = [];
  for(let i = arr1.length - 1; i >= 0; i--) {
    let diff = Number(arr1[i])-Number(arr2[i]);
    if(diff == -1) {arr1[i-1] = Number(arr1[i-1]-1);diff = 1;}
    if(diff == -2) {arr1[i-1] = Number(arr1[i-1]-1);diff = 0;}
    arr.unshift(diff);
  }
  return arr;
}

let multBin = () => {
  let bin1 = baseBinary1.textContent.replace(/^0+/,'') == ''?
    '0':baseBinary1.textContent.replace(/^0+/,'');
  let bin2 = baseBinary2.textContent.replace(/^0+/,'') == ''?
    '0':baseBinary2.textContent.replace(/^0+/,'');
  console.log(bin1 + ' / ' + bin2);
  bin2 = bin2.split('');
  let sums = [];
  let zeros = 0;
  for(let i = bin2.length - 1; i >= 0; i--) {
    sums.push(Number((bin2[i]) * bin1)+'0'.repeat(zeros));
    zeros++;
  }
  sums = equalSize(sums);
  console.log(sums);
}

let getHighestLength = (arr) => {
  let highest = 0;
  for (let i in arr) {
    if(arr[i].length > highest) highest = arr[i].length;
  }
  return highest;
}

let equalSize = (arr) => {
  highest = getHighestLength(arr);
  for(let i in arr) {
    while (arr[i].length < highest) {
      arr[i] = '0' + arr[i];
    }
  }
  arr = cleansing(arr);
  return arr;
}

let cleansing = (arr) => {
  arr = arr.filter(str => {
    return /[1-9]/.test(str);
  });
  return arr;
}

let divBin = () => {

}

let checkHigher = (arr1, arr2) => {
  for (let i in arr1) {
    if(arr1[i] > arr2[i]) return 'arr1';
    else if(arr1[i] < arr2[i]) return 'arr2';
  }
  return 'equal';
}

let toggle = (baseNum) => {
  baseValue = document.getElementById(baseNum);
  if (baseValue.innerText == 0)
    baseValue.innerText = 1;
  else
    baseValue.innerText = 0;
  concatBin();
}

let changeAll = (num) => {
  let but1 = document.querySelectorAll('.binaryInput1 button');
  for(let i = 0; i < but1.length; i++) {
    but1[i].textContent = num;
  }
  let but2 = document.querySelectorAll('.binaryInput2 button');
  for(let i = 0; i < but2.length; i++) {
    but2[i].textContent = num;
  }
  concatBin();
}

window.onload = concatBin();
window.onload = bin2Dec();