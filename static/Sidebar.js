var Sidebar = document.getElementById("Sidebar")
var Check = document.getElementById("BtnSidebarCheck")
var EscolherBK = document.getElementById("EscolherBK")
var CorpoBk = document.getElementById("Corpo_Backgrounds")
Check.addEventListener("click", function () {
    if (Check.checked == true) {
        Sidebar.style.transform = "translate(0vh)"
    } else {
        Sidebar.style.transform = "translate(100vh)"
    }
    CorpoBk.style.display = "none"
    Sidebar.style.display = "block"
})
EscolherBK.addEventListener("click", function () {
    CorpoBk.style.display = "block"
    Sidebar.style.display = "none"
})

var Tocandas = localStorage.getItem("Tocandas")
Quantidade.innerHTML = Tocandas + " Vezes"

var Data = new Date()
var hh = Data.getHours()
var mm = Data.getMinutes()
var ss = Data.getSeconds()


setInterval(function Timer() {
    ss++
    if (ss >= 60) {
        mm++
        ss = 0
    }
    if (mm >= 60) {
        hh++
        mm = 0
    }
    var Valor = (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss)
    document.getElementById("Tempo").innerText = Valor
}, 1000)

