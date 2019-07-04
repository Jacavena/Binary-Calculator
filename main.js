
let concatBin = () => { // Concatenate Binary
  let baseBinary1 = document.getElementById("baseBinary1");
  let baseBinary2 = document.getElementById("baseBinary2");
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
  // Addition Binary
  document.getElementById("addBinary").textContent = addBin(
    baseBinary1.textContent, baseBinary2.textContent);
  // Subtraction Binary
  document.getElementById("subBinary").textContent = subBin(
    baseBinary1.textContent, baseBinary2.textContent);
  // Multiplication Binary
  document.getElementById('multBinary').textContent = multBin(
    baseBinary1.textContent, baseBinary2.textContent);
  // Division Binary
  document.getElementById('divBinary').textContent = divBin(
    baseBinary1.textContent, baseBinary2.textContent);
}

let bin2Dec = () => { // Binary to Decimal Conversion
  let baseDecimal1 = document.getElementById("baseDecimal1");
  let baseDecimal2 = document.getElementById("baseDecimal2");
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

let addBin = (binar1, binar2) => { // Binary Addition
  if(binar2 == undefined) {return binar1;}
  let arrBin1 = binar1.split('');
  arrBin1.unshift('0');
  let arrBin2 = binar2.split('');
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
  return sumBin
}

let subBin = (num1, num2) => { // Binary Subtraction
  let bin1 = num1.split('');
  let bin2 = num2.split('');
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
  return parseInt(diffBin, 10);
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

let multBin = (mult1, mult2) => {
  let bin1 = String(parseInt(mult1, 10));
  let bin2 = String(parseInt(mult2, 10));
  if(bin1 == '0' || bin2 == '0') {
    return '0';
  }
  let count1 = 0, count2 = 0;
  for(let i in bin1.split('')) { if(bin1[i] == '1') count1++;}
  for(let i in bin2.split('')) { if(bin2[i] == '1') count2++;}
  if(count1 == 1 || count2 == 1){return Number(bin1) * Number(bin2)}
  bin2 = bin2.split('');
  let sums = [];
  let zeros = 0;
  for(let i = bin2.length - 1; i >= 0; i--) {
    sums.push(Number((bin2[i]) * bin1)+'0'.repeat(zeros));
    zeros++;
  }
  let temp = 0;
  while (sums.length != 1) {
    sums = equalSize(sums);
    temp = addBin(String(sums[0]), String(sums[1]));
    sums = sums.slice(2);
    sums.push(String(temp));
  }
  let product = sums[0];
  product = product.replace(/^0+/, '').length == 0? 0:
    product.replace(/^0+/, '');
  return product;
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
      arr[i] = '0' + String(arr[i]);
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

let divBin = (b1, b2) => {
  let dividend = parseInt(b1, 10);
  let divisor = parseInt(b2, 10);
  let quotient = '';
  if(divisor == 0 && dividend == 0) return "NaN";
  if(divisor == 0 && dividend > 0) return "Infinity";
  if(divisor > dividend) return "0 R " + divisor;
  if(dividend == divisor && divisor != 0) return 1;
  dividend = String(dividend).split('');
  console.log(dividend, divisor);
  let toTest = '', i = dividend.length, remainder = '0';
  while (i >= 0) {
    console.log(dividend)
    if(Number(toTest) < Number(divisor)) {
      toTest += dividend.shift();
      quotient = quotient + '0';
    }
    else {
      quotient = quotient + '1';
      divisor = String(divisor);
      while(toTest.length > divisor.length) {divisor = '0' + divisor;}
      console.log(toTest, divisor);
      remainder = subBin(String(toTest), String(divisor));
      toTest = String(remainder);
      toTest += dividend.shift();
      divisor = String(divisor).replace(/^0+/, '');
    }
    i--;
  }
  quotient = String(parseInt(quotient, 10));
  return remainder == 0 ? quotient: quotient + " R " + remainder;
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
