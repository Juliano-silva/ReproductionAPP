
var array = []
// URL
function Salvar() {
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

document.addEventListener( 'DOMContentLoaded', function () {
    new Splide('#splide', {
      type: 'loop',
      perPage: 3,
      focus: 'center',
      autoplay: false,
      interval: 8000,
      flickMaxPages: 3,
      updateOnMove: true,
      pagination: false,
      padding: '10%',
      throttle: 300,
      breakpoints: {
        1440: {
          perPage: 1,
          padding: '30%'
        }
      }
    }).mount();
  });
  

// Os Dois
if(localStorage.Nota){
function Localizar() {
    var LocalBK = localStorage.getItem("Nota")
    var BKCORPO = document.getElementById("BackgroundsC")
    var JSONBK = JSON.parse(LocalBK).length
    for (var i = 0; i < JSONBK; i++) {
        var imgBKM = document.createElement("img")
        var List = document.createElement("li")
        List.classList = "splide__slide"
        imgBKM.src = JSON.parse(LocalBK)[i]
        Terminou = imgBKM.src.endsWith(".jpg") || imgBKM.src.endsWith(".jpeg") || imgBKM.src.endsWith(".png") || imgBKM.src.endsWith(".gif") || imgBKM.src.endsWith(".bmp") || imgBKM.src.endsWith("==") || imgBKM.src.endsWith("=") || imgBKM.src.endsWith(".webp")
        if (Terminou == true) {
            imgBKM.id = `IMGSidebar${i}`
            imgBKM.classList = `IMGSidebar`
        } else {
            imgBKM.id = "IMGSidebarError"
            imgBKM.style.display = "none"
        }
        List.append(imgBKM)
        BKCORPO.append(List)
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