var Sidebar = document.getElementById("Sidebar")
var Check = document.getElementById("BtnSidebarCheck")
var EscolherBK = document.getElementById("EscolherBK")
var CorpoBk = document.getElementById("Corpo_Backgrounds")
Check.addEventListener("click", function () {
    if(Check.checked == true){
        Sidebar.style.transform = "translate(0vh)"
    }else{
        Sidebar.style.transform = "translate(100vh)"
    }
    CorpoBk.style.display = "none"
})
EscolherBK.addEventListener("click",function(){
    CorpoBk.style.display = "block"
})