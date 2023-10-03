function Baixar() {
    var value = document.getElementById('AdicionarInput').value;
    $.ajax({
        url: '/AddMusic',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'value': value })
    });
}