var array = []
function Baixar() {
    // location.reload()
    var value = document.getElementById('AdicionarInput').value;
    if(value.indexOf("https://")){
        console.log("Não Tem");
    }else{
         if(localStorage.Musicas){
            array = JSON.parse(localStorage.getItem("Musicas"))
        }
        var value = document.getElementById('AdicionarInput').value;
        $.ajax({
            url: '/AddMusic',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 'value': value })
        });
        array.push(value)
        localStorage.Musicas = JSON.stringify(array)
        document.getElementById('AdicionarInput').value = ""
    }
}