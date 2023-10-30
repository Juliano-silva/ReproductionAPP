var array = []
function Baixar() {
    location.reload()
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
}