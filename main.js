
let concatBin = () => {
  let binary = ""
  let dir = document.querySelectorAll('.binaryInput button');
  for(let i = 0; i < dir.length; i++) {
    binary += dir[i].textContent;
  }
  document.getElementById("baseBinary").innerText = binary;
}
window.onload = concatBin();

let toggle = (baseNum) => {
  baseValue = document.getElementById(baseNum);
  if (baseValue.innerText == 0)
    baseValue.innerText = 1;
  else
    baseValue.innerText = 0;
}