var Musicas = document.getElementById("Musicas")
var API_KEY = '36367067-43a20686ec62df15e47b5919d';
// COM WIFI
if (navigator.onLine) {
fetch("/DadosMusic").then(function (response) {
    response.json().then(async (data) => {
        var MinhasMusicas = JSON.parse(JSON.stringify(data))
        for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
            // Creates Elements
            var Titulo = document.createElement("h1")
            var Box = document.createElement("div")
            var music = document.createElement("audio")
            var PlayePause = document.createElement("input")
            var LabelPlayePause = document.createElement("label")
            var CaixadeTexto = document.createElement("div")
            var s = document.createElement("button")
            var Image = document.createElement("img")
            var Remove = document.createElement("input")
            var IDNum = document.createElement("h3")
            // Get Elements
            var Recomeçar = document.getElementById("Recomeçar")
            var Mais5 = document.getElementById("Mais5")
            var Menos5 = document.getElementById("Menos5")
            var Volume = document.getElementById("Volume")
            var MuteeDismute = document.getElementById("MuteeDismute")
            var BtnMute = document.getElementById("BtnMute")
            var BtnVolume = document.getElementById("BtnVolume")
            var Randomizando = document.getElementById("Randomizando")
            var ORIGINAL = document.getElementById("ORIGINAL")
            var FecharPrincipal = document.getElementById("FecharPrincipal")
            var TPImage = document.getElementById("TPImage")
            // Valores
            var MusicReplace = MinhasMusicas.Name_Music[i].replace("SnapSave.io - ", "").replace(".mp3", "").replace("(128 kbps)", "").replace(".m4a", "").replace(".mp4", "").replace("SnapInsta.io -", "")
            // API VAGALUME
            var Key = "666888f22b401b1859e2d405495c47ee"
            // Artista
            var artistas = MusicReplace.toLowerCase().replace("amv", "")
            var MusicTirar = artistas
            var ArtistRenovado = MusicTirar?.trim()
            var Renovado = ArtistRenovado.slice(0, ArtistRenovado.indexOf("-")).replace(/\s/, "-").replace(/ /g, "")
            // Música
            var Musics = MusicReplace.toLowerCase().replace("mp3", "")
            var MusicsTirar = Musics
            var MusicRodar = MusicsTirar.slice().replace(".", "").replace(/[0-9]/g, "").replace("_", "")
            var MusicDefinit = MusicRodar?.trim()
            var MusicRenovada = MusicDefinit.slice(ArtistRenovado.indexOf("-"), ArtistRenovado.length).replace(/\s/, "-").replace(/ /g, "-").replace("--", "")
            if (Renovado.slice(-1) == "-") {
                Renovado = Renovado.slice(0, -1)
            }
            if (MusicRenovada.indexOf("(")) {
                var MusicAchar = MusicRenovada.indexOf("(")
                MusicRenovada = MusicRenovada.slice(MusicRenovada, MusicAchar)
            }
            if (MusicRenovada.slice(-1) == "-") {
                MusicRenovada = MusicRenovada.slice(0, -1)
            }
            // Link da Api do Vagalume
            var LINKVAGALUME = "https://api.vagalume.com.br/search.php" + "?art=" + Renovado + "&mus=" + MusicRenovada + `&apikey=${Key}`
            const respose = await fetch(LINKVAGALUME)
            const jsonData = await respose.json()
            var Dados = document.createElement("h2")
            var Letra = document.createElement("h3")
            Dados.innerText = jsonData?.art?.name
            if (jsonData?.art?.name === undefined || jsonData?.art?.name === "undefined") {
                Dados.innerHTML = "Desconhecido"
            }
            Letra.innerText = jsonData?.mus?.[0]?.text
            if (jsonData?.mus?.[0]?.text === undefined || jsonData?.mus?.[0]?.text === "undefined") {
                Letra.innerHTML = `Letra desconhecida`
            }
            var Id = i
            Dados.id = `Dados${Id}`
            Letra.id = `LetraMusic${Id}`
            Letra.className = `LetraMusic`
            // Caixa de Texto
            CaixadeTexto.id = `CaixaTexto`
            // ID Num
            IDNum.innerHTML = Id
            IDNum.id = "IDss"
            // Remove
            Remove.value = "🗑️"
            Remove.type = "submit"
            Remove.id = MinhasMusicas.Name_Music[i]
            // Titulo
            Titulo.innerHTML = MusicReplace
            Titulo.id = `Titulos${Id}`
            s.id = `${Id}`
            // Box
            Box.id = `Boxs`
            // music
            music.id = `Music${Id}`
            // Play e Pause
            PlayePause.type = "checkbox"
            PlayePause.id = `PPause${Id}`
            // Icone
            LabelPlayePause.setAttribute("for", `PPause${Id}`)
            LabelPlayePause.id = `Labeis${Id}`
            // Imagens
            Image.id = `Image${Id}`
            Image.className = "Image"
            var BuscarImageLocal = localStorage.getItem("Musicas")
            var ImageLocal = JSON.parse(BuscarImageLocal)[i]
            var ImageRenovado = ImageLocal.replace("https://www.youtube.com/watch?v=","").replace("https://music.youtube.com/watch?v=","").slice(0,11)
            var EscolhaImg = Math.floor(Math.random() * MinhasMusicas.Galeria.length)
            TPImage.src = ImagesPrincipal.src = Image.src = `http://img.youtube.com/vi/${ImageRenovado}/mqdefault.jpg` || "/Fotos/" + MinhasMusicas.Galeria[EscolhaImg]
            // Play e Pause Function
            var Contador = localStorage.getItem("Tocandas")
            if (Contador < 0 || Contador === null) {
                var count = 0
            } else {
                var count = Contador
            }
            // Recomeçar Function
            Recomeçar.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime = 0);
            })
            // Mais 5 Function
            Mais5.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime += 1);
            })
            // Menos 5 Function
            Menos5.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime -= 1);
            })
            // Volume Function
            Volume.addEventListener("change", function () {
                var VolumeValor = Volume.value
                document.querySelectorAll('audio').forEach(el => el.volume = VolumeValor);
            })
            // Pausar e Play Function
            var Pause2 = document.getElementById("Pausar2")
            var Play2 = document.getElementById("play2")
            Pause2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.pause());
                Play2.style.display = "flex"
                Pause2.style.display = "none"
            })
            Play2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.play());
                Play2.style.display = "none"
                Pause2.style.display = "flex"
            })
            // Remove Function
            Remove.addEventListener("click", Remover)
            function Remover() {
                location.reload()
                var RemoverLocal;
                if (localStorage.getItem("Musicas") == null) {
                    RemoverLocal = []
                } else {
                    RemoverLocal = JSON.parse(localStorage.getItem("Musicas"))
                }
                var value = this.id;
                RemoverLocal.splice(Id - 1,1)
                localStorage.setItem("Musicas", JSON.stringify(RemoverLocal))
                $.ajax({
                    url: '/RemoveFunc',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'value': value })
                });
            }
            // Velocidade
            var PlayBack = document.getElementById("PlayBack")
            document.getElementById("NormalPlayBack").addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.playbackRate = 1)
                document.getElementById("PlayBack").value = "5"
            })
            PlayBack.addEventListener("change", function () {
                var ValorPlay = PlayBack.value
                document.querySelectorAll('audio').forEach(el => el.playbackRate = ValorPlay)
            })
            var NormalVolume = document.getElementById("NormalVolume")
            NormalVolume.addEventListener("click", function () {
                Volume.value = "0.5"
                document.querySelectorAll('audio').forEach(el => el.volume = "0.5");
            })
            // Mute
            MuteeDismute.addEventListener("click", function () {
                if (document.getElementById(this.id).checked == true) {
                    document.querySelectorAll('audio').forEach(el => el.muted = true);
                    BtnMute.style.display = "inline-block"
                    BtnVolume.style.display = "none"
                }
                else {
                    document.querySelectorAll('audio').forEach(el => el.muted = false);
                    BtnMute.style.display = "none"
                    BtnVolume.style.display = "inline-block"
                }
            })
            // Play e Pause Event
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause()
                document.getElementById("BtnPauseEvent").style.display = "none"
                document.getElementById("BtnPlayEvent").style.display = "inline-block"
            })
            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play()
                document.getElementById("BtnPauseEvent").style.display = "inline-block"
                document.getElementById("BtnPlayEvent").style.display = "none"
            })
            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play()
            })
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause()
            })
            var progressed = document.getElementById("progressed")
            var progress_bar = document.getElementById("progress_bar")

            ORIGINAL.ontimeupdate = function () {
                progressed.style.width = Math.floor(ORIGINAL.currentTime * 100 / ORIGINAL.duration) + "%";
            }

            progress_bar.onclick = function (e) {
                ORIGINAL.currentTime = ((e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration)
            }

            // Random Music
            Randomizando.addEventListener("click", function () {
                var MusicRandom = Math.floor(Math.random() * MinhasMusicas.Name_Music.length)
                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicRandom]}`
                ORIGINAL.play()
                document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicRandom].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
            })
            // Doc Principal
            PlayePause.addEventListener("click", function () {
                localStorage.setItem("Tocandas", count)
                count++
                // Junção
                var MusicIDs = this.id.replace("PPause", '')
                var ImageLocal = JSON.parse(BuscarImageLocal)[MusicIDs]
                var ImageRenovado = ImageLocal.replace("https://www.youtube.com/watch?v=","").replace("https://music.youtube.com/watch?v=","").slice(0,11)
                TPImage.src = ImagesPrincipal.src = Image.src = `http://img.youtube.com/vi/${ImageRenovado}/maxresdefault.jpg` || "/Fotos/" + MinhasMusicas.Galeria[EscolhaImg]
                var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("kbps", "").replace("(", "").replace(")", "")
                // AddPlaylist
                if (localStorage.Playlist) {
                    var LocalPlaylist = localStorage.getItem("Playlist")
                    var SelectPlay = document.createElement("ol")
                    var PlaylistH1 = document.createElement("h1")
                    PlaylistH1.innerText = "Playlist Adicionar"
                    SelectPlay.append(PlaylistH1)
                    for (var Play = 0; Play < JSON.parse(LocalPlaylist).length; Play++) {
                        var OptionPlay = document.createElement("li")
                        OptionPlay.innerText = JSON.parse(LocalPlaylist)[Play].Name
                        OptionPlay.id = MusicIDs
                        OptionPlay.className = Play
                        SelectPlay.id = "Playlist_List"
                        OptionPlay.addEventListener("click", function () {
                            alert("Música Adicionada com Sucesso")
                            var Edit;
                            if (localStorage.getItem("Playlist") == null) {
                                Edit = []
                            } else {
                                Edit = JSON.parse(localStorage.getItem("Playlist"))
                            }
                            Edit[this.className].Lista += this.id + ","
                            localStorage.setItem("Playlist", JSON.stringify(Edit))
                        })
                        SelectPlay.append(OptionPlay)
                        document.getElementById("PlaylistHome").append(SelectPlay)
                    }
                }
                FecharPrincipal.addEventListener("click", function () {
                    document.getElementById("MusicaPrincipal").style.display = "none"
                    document.getElementById("Templete").style.display = "block"
                })
                if (document.getElementById(this.id).checked == true) {
                    ORIGINAL.src = Junção
                    ORIGINAL.play()
                    // Tempo da música
                    ORIGINAL.addEventListener("loadedmetadata", function () {
                        duration = ORIGINAL.duration
                    })
                    // Passar Próxima e Frente Event
                    document.getElementById("Frente").addEventListener("click", Frente)
                    document.getElementById("FrenteP").addEventListener("click", Frente)
                    ORIGINAL.addEventListener("ended", Frente)
                    // Trás Events
                    document.getElementById("TrásP").addEventListener("click", Tras)
                    document.getElementById("Trás").addEventListener("click", Tras)
                    // Frente function
                    ORIGINAL.addEventListener("error",function(){
                        alert("Tivemos um Problema")
                        location.reload()
                    })
                    function Frente() {
                        localStorage.setItem("Tocandas", count)
                        count++
                        if (MusicIDs < MinhasMusicas.Name_Music.length) {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        } else {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                            console.log(MusicIDs);
                        }
                        var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        document.getElementById("TextosPrincipal").innerHTML = BuscarMusicIds
                        document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                        document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        ORIGINAL.play()
                        var ImageLocal = JSON.parse(BuscarImageLocal)[MusicIDs]
                        var ImageRenovado = ImageLocal.replace("https://www.youtube.com/watch?v=","").replace("https://music.youtube.com/watch?v=","").slice(0,11)
                        TPImage.src = ImagesPrincipal.src = Image.src = `http://img.youtube.com/vi/${ImageRenovado}/maxresdefault.jpg` || "/Fotos/" + MinhasMusicas.Galeria[EscolhaImg]
                    }
                    // Trás Function
                    function Tras() {
                        localStorage.setItem("Tocandas", count)
                        count++
                        if (MusicIDs >= 0) {
                            MusicIDs--
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        } else {
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        }
                        var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                        document.getElementById("TextosPrincipal").innerText = BuscarMusicIds
                        document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        ORIGINAL.play()
                        var ImageLocal = JSON.parse(BuscarImageLocal)[MusicIDs]
                        var ImageRenovado = ImageLocal.replace("https://www.youtube.com/watch?v=","").replace("https://music.youtube.com/watch?v=","").slice(0,11)
                        TPImage.src = ImagesPrincipal.src = Image.src = `http://img.youtube.com/vi/${ImageRenovado}/maxresdefault.jpg` || "/Fotos/" + MinhasMusicas.Galeria[EscolhaImg]
                    }
                    document.getElementById("MusicaPrincipal").style.display = "block";
                    const parent = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "")
                    const Author = document.getElementById(`Dados${MusicIDs}`).innerText
                    const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                    TextosPrincipal.innerText = parent
                    ArtistaPrincipal.innerHTML = Author
                    LetraMusics.innerHTML = LetraId
                }
                else {
                    ORIGINAL.pause()
                    document.getElementById("MusicaPrincipal").style.display = "none"
                }
            })
            // Append
            CaixadeTexto.append(Titulo, Dados, Letra, Remove)
            Box.append(IDNum, PlayePause, Image, CaixadeTexto, music)
            LabelPlayePause.append(Box)
            Musicas.append(LabelPlayePause)
        }
    })
})
// Sem WIFI
}else{
    console.log("OFF");
    fetch("/DadosMusic").then(function (response) {
        response.json().then((data) => {
            var MinhasMusicas = JSON.parse(JSON.stringify(data))
            for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
                // Creates Elements
                var Titulo = document.createElement("h1")
                var Box = document.createElement("div")
                var music = document.createElement("audio")
                var PlayePause = document.createElement("input")
                var LabelPlayePause = document.createElement("label")
                var CaixadeTexto = document.createElement("div")
                var s = document.createElement("button")
                var Image = document.createElement("img")
                var Remove = document.createElement("input")
                var IDNum = document.createElement("h3")
                // Get Elements
                var Recomeçar = document.getElementById("Recomeçar")
                var Mais5 = document.getElementById("Mais5")
                var Menos5 = document.getElementById("Menos5")
                var Volume = document.getElementById("Volume")
                var MuteeDismute = document.getElementById("MuteeDismute")
                var BtnMute = document.getElementById("BtnMute")
                var BtnVolume = document.getElementById("BtnVolume")
                var Randomizando = document.getElementById("Randomizando")
                var ORIGINAL = document.getElementById("ORIGINAL")
                var FecharPrincipal = document.getElementById("FecharPrincipal")
                var TPImage = document.getElementById("TPImage")
                // Valores
                var MusicReplace = MinhasMusicas.Name_Music[i].replace("SnapSave.io - ", "").replace(".mp3", "").replace("(128 kbps)", "").replace(".m4a", "").replace(".mp4", "").replace("SnapInsta.io -", "")
                // API VAGALUME
                var Key = "666888f22b401b1859e2d405495c47ee"
                // Artista
                var artistas = MusicReplace.toLowerCase().replace("amv", "")
                var MusicTirar = artistas
                var ArtistRenovado = MusicTirar?.trim()
                var Renovado = ArtistRenovado.slice(0, ArtistRenovado.indexOf("-")).replace(/\s/, "-").replace(/ /g, "")
                // Música
                var Musics = MusicReplace.toLowerCase().replace("mp3", "")
                var MusicsTirar = Musics
                var MusicRodar = MusicsTirar.slice().replace(".", "").replace(/[0-9]/g, "").replace("_", "")
                var MusicDefinit = MusicRodar?.trim()
                var MusicRenovada = MusicDefinit.slice(ArtistRenovado.indexOf("-"), ArtistRenovado.length).replace(/\s/, "-").replace(/ /g, "-").replace("--", "")
                if (Renovado.slice(-1) == "-") {
                    Renovado = Renovado.slice(0, -1)
                }
                if (MusicRenovada.indexOf("(")) {
                    var MusicAchar = MusicRenovada.indexOf("(")
                    MusicRenovada = MusicRenovada.slice(MusicRenovada, MusicAchar)
                }
                if (MusicRenovada.slice(-1) == "-") {
                    MusicRenovada = MusicRenovada.slice(0, -1)
                }
                Dados.innerHTML = "Desconhecido"
                Letra.innerHTML = `Letra desconhecida`
                var Id = i
                Dados.id = `Dados${Id}`
                Letra.id = `LetraMusic${Id}`
                Letra.className = `LetraMusic`
                // Caixa de Texto
                CaixadeTexto.id = `CaixaTexto`
                // ID Num
                IDNum.innerHTML = Id
                IDNum.id = "IDss"
                // Remove
                Remove.value = "🗑️"
                Remove.type = "submit"
                Remove.id = MinhasMusicas.Name_Music[i]
                // Titulo
                Titulo.innerHTML = MusicReplace
                Titulo.id = `Titulos${Id}`
                s.id = `${Id}`
                // Box
                Box.id = `Boxs`
                // music
                music.id = `Music${Id}`
                // Play e Pause
                PlayePause.type = "checkbox"
                PlayePause.id = `PPause${Id}`
                // Icone
                LabelPlayePause.setAttribute("for", `PPause${Id}`)
                LabelPlayePause.id = `Labeis${Id}`
                // Imagens
                Image.id = `Image${Id}`
                Image.className = "Image"
                var EscolhaImg = Math.floor(Math.random() * MinhasMusicas.Galeria.length)
                var ImageLocal = JSON.parse(BuscarImageLocal)[i]
                var ImageRenovado = ImageLocal.replace("https://www.youtube.com/watch?v=","").replace("https://music.youtube.com/watch?v=","").slice(0,11)
                TPImage.src = ImagesPrincipal.src = Image.src =  `http://img.youtube.com/vi/${ImageRenovado}/mqdefault.jpg` || "/Fotos/" + MinhasMusicas.Galeria[EscolhaImg]
                // Play e Pause Function
                var Contador = localStorage.getItem("Tocandas")
                if (Contador < 0 || Contador === null) {
                    var count = 0
                } else {
                    var count = Contador
                }
                // Recomeçar Function
                Recomeçar.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.currentTime = 0);
                })
                // Mais 5 Function
                Mais5.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.currentTime += 1);
                })
                // Menos 5 Function
                Menos5.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.currentTime -= 1);
                })
                // Volume Function
                Volume.addEventListener("change", function () {
                    var VolumeValor = Volume.value
                    document.querySelectorAll('audio').forEach(el => el.volume = VolumeValor);
                })
                // Pausar e Play Function
                var Pause2 = document.getElementById("Pausar2")
                var Play2 = document.getElementById("play2")
                Pause2.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.pause());
                    Play2.style.display = "flex"
                    Pause2.style.display = "none"
                })
                Play2.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.play());
                    Play2.style.display = "none"
                    Pause2.style.display = "flex"
                })
                // Remove Function
                Remove.addEventListener("click", Remover)
                function Remover() {
                    location.reload()
                    var value = this.id;
                    $.ajax({
                        url: '/RemoveFunc',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ 'value': value })
                    });
                }
                // Velocidade
                var PlayBack = document.getElementById("PlayBack")
                document.getElementById("NormalPlayBack").addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.playbackRate = 1)
                    document.getElementById("PlayBack").value = "5"
                })
                PlayBack.addEventListener("change", function () {
                    var ValorPlay = PlayBack.value
                    document.querySelectorAll('audio').forEach(el => el.playbackRate = ValorPlay)
                })
                var NormalVolume = document.getElementById("NormalVolume")
                NormalVolume.addEventListener("click", function () {
                    Volume.value = "0.5"
                    document.querySelectorAll('audio').forEach(el => el.volume = "0.5");
                })
                // Mute
                MuteeDismute.addEventListener("click", function () {
                    if (document.getElementById(this.id).checked == true) {
                        document.querySelectorAll('audio').forEach(el => el.muted = true);
                        BtnMute.style.display = "inline-block"
                        BtnVolume.style.display = "none"
                    }
                    else {
                        document.querySelectorAll('audio').forEach(el => el.muted = false);
                        BtnMute.style.display = "none"
                        BtnVolume.style.display = "inline-block"
                    }
                })
                // Play e Pause Event
                document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                    ORIGINAL.pause()
                    document.getElementById("BtnPauseEvent").style.display = "none"
                    document.getElementById("BtnPlayEvent").style.display = "inline-block"
                })
                document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                    ORIGINAL.play()
                    document.getElementById("BtnPauseEvent").style.display = "inline-block"
                    document.getElementById("BtnPlayEvent").style.display = "none"
                })
                document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                    ORIGINAL.play()
                })
                document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                    ORIGINAL.pause()
                })
                var progressed = document.getElementById("progressed")
                var progress_bar = document.getElementById("progress_bar")
    
                ORIGINAL.ontimeupdate = function () {
                    progressed.style.width = Math.floor(ORIGINAL.currentTime * 100 / ORIGINAL.duration) + "%";
                }
    
                progress_bar.onclick = function (e) {
                    ORIGINAL.currentTime = ((e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration)
                }
    
                // Random Music
                Randomizando.addEventListener("click", function () {
                    var MusicRandom = Math.floor(Math.random() * MinhasMusicas.Name_Music.length)
                    ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicRandom]}`
                    ORIGINAL.play()
                    document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicRandom].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                })
                // Doc Principal
                PlayePause.addEventListener("click", function () {
                    localStorage.setItem("Tocandas", count)
                    count++
                    // Junção
                    var MusicIDs = this.id.replace("PPause", '')
                    var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                    document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("kbps", "").replace("(", "").replace(")", "")
                    // AddPlaylist
                    if (localStorage.Playlist) {
                        var LocalPlaylist = localStorage.getItem("Playlist")
                        var SelectPlay = document.createElement("ol")
                        var PlaylistH1 = document.createElement("h1")
                        PlaylistH1.innerText = "Playlist Adicionar"
                        SelectPlay.append(PlaylistH1)
                        for (var Play = 0; Play < JSON.parse(LocalPlaylist).length; Play++) {
                            var OptionPlay = document.createElement("li")
                            OptionPlay.innerText = JSON.parse(LocalPlaylist)[Play].Name
                            OptionPlay.id = MusicIDs
                            OptionPlay.className = Play
                            SelectPlay.id = "Playlist_List"
                            OptionPlay.addEventListener("click", function () {
                                alert("Música Adicionada com Sucesso")
                                var Edit;
                                if (localStorage.getItem("Playlist") == null) {
                                    Edit = []
                                } else {
                                    Edit = JSON.parse(localStorage.getItem("Playlist"))
                                }
                                Edit[this.className].Lista += this.id + ","
                                localStorage.setItem("Playlist", JSON.stringify(Edit))
                            })
                            SelectPlay.append(OptionPlay)
                            document.getElementById("PlaylistHome").append(SelectPlay)
                        }
                    }
                    FecharPrincipal.addEventListener("click", function () {
                        document.getElementById("MusicaPrincipal").style.display = "none"
                        document.getElementById("Templete").style.display = "block"
                    })
                    if (document.getElementById(this.id).checked == true) {
                        ORIGINAL.src = Junção
                        ORIGINAL.play()
                        // Tempo da música
                        ORIGINAL.addEventListener("loadedmetadata", function () {
                            duration = ORIGINAL.duration
                        })
                        // Passar Próxima e Frente Event
                        document.getElementById("Frente").addEventListener("click", Frente)
                        document.getElementById("FrenteP").addEventListener("click", Frente)
                        ORIGINAL.addEventListener("ended", Frente)
                        // Trás Events
                        document.getElementById("TrásP").addEventListener("click", Tras)
                        document.getElementById("Trás").addEventListener("click", Tras)
                        // Frente function
                        ORIGINAL.addEventListener("error",function(){
                            alert("Tivemos um Problema")
                            location.reload()
                        })
                        function Frente() {
                            localStorage.setItem("Tocandas", count)
                            count++
                            if (MusicIDs < MinhasMusicas.Name_Music.length) {
                                MusicIDs++
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                                document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                            } else {
                                MusicIDs++
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                                document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                            }
                            var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                            document.getElementById("TextosPrincipal").innerHTML = BuscarMusicIds
                            document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                            document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                            document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                            ORIGINAL.play()
                        }
                        // Trás Function
                        function Tras() {
                            localStorage.setItem("Tocandas", count)
                            count++
                            if (MusicIDs >= 0) {
                                MusicIDs--
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                                document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                            } else {
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                                document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                            }
                            var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                            document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                            document.getElementById("TextosPrincipal").innerText = BuscarMusicIds
                            document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                            document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                            ORIGINAL.play()
                        }
                        document.getElementById("MusicaPrincipal").style.display = "block";
                        const parent = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "")
                        const Author = document.getElementById(`Dados${MusicIDs}`).innerText
                        const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        TextosPrincipal.innerText = parent
                        ArtistaPrincipal.innerHTML = Author
                        LetraMusics.innerHTML = LetraId
                    }
                    else {
                        ORIGINAL.pause()
                        document.getElementById("MusicaPrincipal").style.display = "none"
                    }
                })
                // Append
                CaixadeTexto.append(Titulo, Dados, Letra, Remove)
                Box.append(IDNum, PlayePause, Image, CaixadeTexto, music)
                LabelPlayePause.append(Box)
                Musicas.append(LabelPlayePause)
            }
        })
    })
}
// Background
var EscolhaBK = localStorage.getItem("BackgroundEscolhido")
document.querySelector("body").style.backgroundImage = `url(${EscolhaBK})`