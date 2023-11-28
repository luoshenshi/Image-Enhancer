const ranges = document.querySelectorAll(".ranges");
const downImg = document.getElementById("downimg");
const choose_file = document.getElementById("choose_file");
const button_select_photo = document.getElementById("button_select_photo");
const canvas = document.createElement("canvas");
const context2D = canvas.getContext("2d");
const edited = new Image();
edited.width = 600;
let rangeBox = new Array(ranges);
ranges.forEach((range) => {
  range.addEventListener("ionInput", function () {
    edited.style.filter = `
            blur(${rangeBox[0][0].value}px) 
            brightness(${rangeBox[0][1].value})
            contrast(${rangeBox[0][2].value})
            grayscale(${rangeBox[0][3].value})
            hue-rotate(${rangeBox[0][4].value}deg)
            invert(${rangeBox[0][5].value})
            opacity(${rangeBox[0][6].value})
            saturate(${rangeBox[0][7].value})
            sepia(${rangeBox[0][8].value})
            `;
    canvas.width = getComputedStyle(edited).width.replace("px", "");
    canvas.height = getComputedStyle(edited).height.replace("px", "");
    context2D.filter = getComputedStyle(edited).filter;
    context2D.drawImage(edited, 0, 0, canvas.width, canvas.height);
  });
});
edited.onload = () => {
  canvas.width = getComputedStyle(edited).width.replace("px", "");
  canvas.height = getComputedStyle(edited).height.replace("px", "");
  context2D.filter = getComputedStyle(edited).filter;
  context2D.drawImage(edited, 0, 0, canvas.width, canvas.height);
  downImg.style.opacity = "1";
  downImg.style.pointerEvents = "auto";
  ranges.forEach((element) => {
    element.style.opacity = "1";
    element.style.pointerEvents = "auto";
  });
};

downImg.addEventListener("click", function () {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "Image - " + new Date().getUTCMilliseconds();
  a.click();
});

button_select_photo.addEventListener("click", function () {
  choose_file.click();
});

choose_file.addEventListener("change", function () {
  if (!this.files[0]) return;
  button_select_photo.style.display = "none";
  document.getElementById("try_title").style.display = "none";
  edited.src = URL.createObjectURL(this.files[0]);
  document.querySelector(".sec1").append(edited);
});
