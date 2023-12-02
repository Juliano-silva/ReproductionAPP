
var array = []
// URL
function Salvar() {
  location.reload()
  var value = document.getElementById('BackgroundsText').value;
  $.ajax({
    url: '/AddURL',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'value': value })
  });
  if (localStorage.Nota) {
    array = JSON.parse(localStorage.getItem('Nota'));
  }
  var BackgroundsLinks = document.getElementById("BackgroundsText").value
  array.push(BackgroundsLinks)
  localStorage.Nota = JSON.stringify(array)
  document.getElementById('BackgroundsText').value = ""
}
// File
function previewFile() {
  if (localStorage.Nota) {
    array = JSON.parse(localStorage.getItem('Nota'));
  }
  var file = document.getElementById("BackgroundsFile").files[0]
  var reader = new FileReader();
  reader.onloadend = function () {
    var Resultado = reader.result
    array.push(Resultado)
    localStorage.Nota = JSON.stringify(array)
    location.reload()
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}


// Carrossel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.getElementById("BackgroundsC"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");

let imageIndex = 1,
  intervalId;

const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};

const slideImage = () => {
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

const updateClick = (e) => {
  clearInterval(intervalId);
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  autoSlide();
};

buttons.forEach((button) => button.addEventListener("click", updateClick));

wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);

// Os Dois
if (localStorage.Nota) {
  function Localizar() {
    var LocalBK = localStorage.getItem("Nota")
    var BKCORPO = document.getElementById("BackgroundsC")
    var JSONBK = JSON.parse(LocalBK).length
    for (var i = 0; i < JSONBK; i++) {
      var imgBKM = document.createElement("img")
      imgBKM.src = JSON.parse(LocalBK)[i]
      Terminou = imgBKM.src.endsWith(".jpg") || imgBKM.src.endsWith(".jpeg") || imgBKM.src.endsWith(".png") || imgBKM.src.endsWith(".gif") || imgBKM.src.endsWith(".bmp") || imgBKM.src.endsWith("==") || imgBKM.src.endsWith("=") || imgBKM.src.endsWith(".webp")
      if (Terminou == true) {
        imgBKM.id = `IMGSidebar${i}`
        imgBKM.classList = `IMGSidebar`
      } else {
        imgBKM.id = "IMGSidebarError"
        imgBKM.style.display = "none"
      }
      BKCORPO.append(imgBKM)
      imgBKM.addEventListener("click", function () {
        var IDBK = this.id.replace("IMGSidebar", "")
        var NewVersion = JSON.parse(LocalBK)[IDBK]
        localStorage.setItem("BackgroundEscolhido", NewVersion)
        location.reload()
      })
    }
    var EscolhaBK = localStorage.getItem("BackgroundEscolhido")
    document.querySelector("body").style.backgroundImage = `url(${EscolhaBK})`
  }

  document.onload = Localizar()
}