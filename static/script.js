var Musicas = document.getElementById("Musicas")
var API_KEY = '36367067-43a20686ec62df15e47b5919d';
fetch("/DadosMusic").then(function (response) {
    response.json().then(async (data) => {
        var MinhasMusicas = JSON.parse(JSON.stringify(data))
        for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
            // Creates Elements
            var Titulo = document.createElement("h1")
            var Box = document.createElement("div")
            var Name = document.createElement("h2")
            var music = document.createElement("audio")
            var PlayePause = document.createElement("input")
            var LabelPlayePause = document.createElement("label")
            var CaixadeTexto = document.createElement("div")
            var s = document.createElement("button")
            var Image = document.createElement("img")
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
            // Valores
            var MusicReplace = MinhasMusicas.Name_Music[i].replace("SnapSave.io - ", "").replace(".mp3", "").replace("(128 kbps)", "").replace(".m4a", "").replace(".mp4", "").replace("SnapInsta.io -", "")
            // API VAGALUME
            var Key = "666888f22b401b1859e2d405495c47ee"
            // Artista
            var artistas = MusicReplace.toLowerCase().replace("amv", "")
            var MusicTirar = artistas
            if (MusicTirar.match(/-/)) {
                var MusicArrumada = MusicTirar.slice(0, MusicTirar.indexOf("-"))
            }
            if (MusicTirar.match('_')) {
                var Achar = MusicTirar.indexOf("_")
                MusicArrumada = MusicTirar.slice(Achar).replace("_", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "")
            }
            if (MusicTirar.match("¦")) {
                Achar = MusicTirar.indexOf("¦")
                MusicArrumada = MusicTirar.slice(Achar).replace(/¦/g, "")
            }
            if (MusicTirar.match(",")) {
                Achar = MusicTirar.indexOf(",")
                MusicArrumada = MusicTirar.slice(0, Achar).replace(/,/g, "")
            }
            var ArtistRenovado = MusicArrumada?.trim().replace(/\s/, "-").replace("yun-li", "yung-lixo").replace("mc-vv", "yung-lixo")
            // Música
            var Musics = MusicReplace.toLowerCase().replace("mp3", "")
            var MusicsTirar = Musics
            var MusicRodar = MusicsTirar.slice().replace(MusicArrumada, "").replace(".", "").replace(/[0-9]/g, "").replace("_", "")
            if (MusicRodar.match(/-/)) {
                MusicRodar = MusicsTirar.slice(MusicsTirar.indexOf("-")).replace("amv", "").replace("-", "").replace(/\[.*\]/g, '').replace(/\(.*?\)/g, '').replace("ft", "part")
            }
            if (MusicRodar.match(/¦/)) {
                var MusicAchar = MusicsTirar.indexOf("¦")
                var MusicRodar = MusicTirar.slice(0, MusicAchar).replace(/!/g, "")
            }
            var MusicDefinit = MusicRodar?.trim().replace(/\s/g, "-")
            Name.id = `Names${Id}`
            // Link da Api do Vagalume
            var LINKVAGALUME = "https://api.vagalume.com.br/search.php" + "?art=" + ArtistRenovado + "&mus=" + MusicDefinit + `&apikey=${Key}`
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
            // Titulo
            Titulo.innerHTML = Id + ". " + MusicReplace
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
            ImagesPrincipal.src = Image.src = `/Fotos/${MinhasMusicas.Galeria[EscolhaImg]}`
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
            // Pausar Function
            var Pause2 = document.getElementById("Pausar2")
            var Play2 = document.getElementById("play2")
            Pause2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.pause());
                Play2.style.display = "block"
                Pause2.style.display = "none"
            })
            Play2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.play());
                Play2.style.display = "none"
                Pause2.style.display = "block"
            })
            // Velocidade
            var PlayBack = document.getElementById("PlayBack")
            document.getElementById("NormalPlayBack").addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.playbackRate = 1)
            })
            PlayBack.addEventListener("change", function () {
                var ValorPlay = PlayBack.value
                console.log(ValorPlay);
                document.querySelectorAll('audio').forEach(el => el.playbackRate = ValorPlay)
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
            var progressed = document.getElementById("progressed")
            var progress_bar = document.getElementById("progress_bar")
            ORIGINAL.ontimeupdate = function () {
                progressed.style.width = Math.floor(ORIGINAL.currentTime * 100 / ORIGINAL.duration) + "%";
            }
            progress_bar.onclick = function (e) {
                ORIGINAL.currentTime = ((e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration)
            }
            // Search
            var Buscando = document.getElementById("Buscando")
            Buscando.addEventListener("dblclick", function () {
                location.reload()
            })
            Buscando.addEventListener("click", function () {
                var Search = document.getElementById("Search").value
                for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
                    var Valores = document.getElementById(`Titulos${i}`).innerText
                    if (Search === Valores || Search == i) {
                        var NumEscolha = Valores.split(".")[0]
                        for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
                            document.getElementById(`Labeis${i}`).style.display = "none"
                            if (i == NumEscolha) {
                                document.getElementById(`Labeis${NumEscolha}`).style.display = "block"
                            }
                        }
                    }
                }
            })
            // Random Music
            Randomizando.addEventListener("click", function () {
                var MusicRandom = Math.floor(Math.random() * MinhasMusicas.Name_Music.length)
                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicRandom]}`
                ORIGINAL.play()
                document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicRandom].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
            })
            // Doc Principal
            PlayePause.addEventListener("click", function () {
                // Junção
                var MusicIDs = this.id.replace("PPause", '')
                console.log(this.id);
                var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("kbps", "").replace("(", "").replace(")", "")
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
                    // Passar Próxima
                    ORIGINAL.addEventListener("ended", function () {
                        MusicIDs++
                        ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                        var ValorMusicId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        var DadosId = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("TextosPrincipal").innerHTML =
                            "<h1>" + MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "") + '<br>' +
                            DadosId + '<br>' + ValorMusicId + "</h1>"
                        ORIGINAL.play()
                    })
                    // Frente
                    document.getElementById("Frente").addEventListener("click", function () {
                        if (MusicIDs < MinhasMusicas.Name_Music.length) {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                        } else {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                        }
                        document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        ORIGINAL.play()
                    })
                    // FrenteP
                    document.getElementById("FrenteP").addEventListener("click", function () {
                        if (MusicIDs < MinhasMusicas.Name_Music.length) {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                        } else {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                        }
                        var ValorMusicId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        var DadosId = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("TextosPrincipal").innerHTML =
                            "<h1>" + MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "") + '<br>' +
                            DadosId
                            + '<br>' + ValorMusicId + "</h1>"
                        ORIGINAL.play()
                    })
                    // TrásP
                    document.getElementById("TrásP").addEventListener("click", function () {
                        if (MusicIDs >= 0) {
                            MusicIDs--
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                        } else {
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                        }
                        var ValorMusicId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        var DadosId = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("TextosPrincipal").innerHTML =
                            "<h1>" + MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "") + '<br>' +
                            DadosId
                            + '<br>' + ValorMusicId + "</h1>"
                        ORIGINAL.play()
                    })
                    // Trás
                    document.getElementById("Trás").addEventListener("click", function () {
                        if (MusicIDs >= 0) {
                            MusicIDs--
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                        } else {
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                        }
                        document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        ORIGINAL.play()
                    })
                    document.getElementById("MusicaPrincipal").style.display = "block";
                    localStorage.setItem("Tocandas", count)
                    count++
                    const parent = this.parentNode
                    TextosPrincipal.innerText = parent.innerText
                    var ss = localStorage.getItem("ss")
                    var mm = localStorage.getItem("mm")
                    var hh = localStorage.getItem("hh")
                    if (ss < 0 && mm < 0 && hh < 0 || ss == null && mm == null && hh == null) {
                        var hh = 0
                        var mm = 0
                        var ss = 0
                    } else {
                        var hh = hh
                        var mm = mm
                        var ss = ss
                    }
                    setInterval(() => {
                        ss++
                        if (ss == 61) {
                            ss = 0
                            mm++
                        }
                        if (mm == 61) {
                            mm = 0
                            hh++
                        }
                        localStorage.setItem("ss", ss)
                        localStorage.setItem("mm", mm)
                        localStorage.setItem("hh", hh)
                    }, 1000);
                }
                else {
                    ORIGINAL.pause()
                    document.getElementById("MusicaPrincipal").style.display = "none"
                }
            })
            // Append
            CaixadeTexto.append(Titulo, Dados, Letra)
            Box.append(PlayePause,Image, CaixadeTexto, music)
            LabelPlayePause.append(Box)
            Musicas.append(LabelPlayePause)
        }
    })
})

// Background
var EscolhaBK = localStorage.getItem("BackgroundEscolhido")
document.querySelector("body").style.backgroundImage = `url(${EscolhaBK})`
// Quantidade
var Tocandas = localStorage.getItem("Tocandas")
Quantidade.innerHTML = Tocandas + " Vezes"
// Tempo Escutando
var hh = localStorage.getItem("hh")
var mm = localStorage.getItem("mm")
var ss = localStorage.getItem("ss")
Tempo.innerHTML = hh + ":" + mm + ":" + ss