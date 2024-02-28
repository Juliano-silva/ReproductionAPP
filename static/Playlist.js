var array = []
var Diretorio = "/music/"
var Musicas = document.getElementById("Musicas")
var API_KEY = '36367067-43a20686ec62df15e47b5919d';
function Salvar() {
    location.reload()
    if (localStorage.Playlist) {
        array = JSON.parse(localStorage.getItem("Playlist"))
    }
    array.push({
        "Name": document.getElementById("PlaylistName").value,
        "Lista": []
    })
    localStorage.Playlist = JSON.stringify(array)
}

fetch("/DadosMusic").then(function (response) {
    response.json().then(async (data) => {
        var Buscar = localStorage.getItem("Playlist")
        for (var i = 0; i < JSON.parse(Buscar).length; i++) {
            var CreateBox = document.createElement("div")
            var Playlist_Title = document.createElement("h1")
            var Remove = document.createElement("input")
            CreateBox.className = "Box_Create"
            CreateBox.id = i
            Playlist_Title.innerText = JSON.parse(Buscar)[i].Name
            // Remove
            Remove.value = "🗑️"
            Remove.type = "submit"
            Remove.id = `${i}`
            Remove.addEventListener("click", Remover)
            function Remover() {
                location.reload()
                var Playlist;
                if (localStorage.getItem("Playlist") == null) {
                    Playlist = []
                } else {
                    Playlist = JSON.parse(localStorage.getItem("Playlist"))
                }
                Playlist.splice(this.id, 1)
                localStorage.setItem("Playlist", JSON.stringify(Playlist))            
            }
            CreateBox.append(Playlist_Title,Remove)
            var MinhasMusicas = JSON.parse(JSON.stringify(data))
            console.log(JSON.parse(Buscar)[i].Lista);
            for (var q = 0; q < JSON.parse(Buscar)[i].Lista.split(/,(?! )/).length; q++) {
                var ids = JSON.parse(Buscar)[i].Lista.split(/,(?! )/)[q]
                // Creates Elements
                var Titulo = document.createElement("h1")
                var Box = document.createElement("div")
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
                var TPImage = document.getElementById("TPImage")
                var MusicReplace = MinhasMusicas.Name_Music[ids]?.replace("SnapSave.io - ", "")?.replace(".mp3", "")?.replace("(128 kbps)", "")?.replace(".m4a", "")?.replace(".mp4", "")?.replace("SnapInsta.io -", "")
                // API VAGALUME
                var Key = "666888f22b401b1859e2d405495c47ee"
                // Artista
                var artistas = MusicReplace?.toLowerCase()?.replace("amv", "")
                var MusicTirar = artistas
                var ArtistRenovado = MusicTirar?.trim()
                var Renovado = ArtistRenovado?.slice(0, ArtistRenovado?.indexOf("-"))?.replace(/\s/, "-")?.replace(/ /g, "")
                // Música
                var Musics = MusicReplace?.toLowerCase()?.replace("mp3", "")
                var MusicsTirar = Musics
                var MusicRodar = MusicsTirar?.slice()?.replace(".", "")?.replace(/[0-9]/g, "")?.replace("_", "")
                var MusicDefinit = MusicRodar?.trim()
                var MusicRenovada = MusicDefinit?.slice(ArtistRenovado?.indexOf("-"), ArtistRenovado.length)?.replace(/\s/, "-")?.replace(/ /g, "-")?.replace("--", "")
                if (Renovado?.slice(-1) == "-") {
                    Renovado = Renovado?.slice(0, -1)
                }
                if (MusicRenovada?.indexOf("(")) {
                    var MusicAchar = MusicRenovada?.indexOf("(")
                    MusicRenovada = MusicRenovada?.slice(MusicRenovada, MusicAchar)
                }
                if (MusicRenovada?.slice(-1) == "-") {
                    MusicRenovada = MusicRenovada?.slice(0, -1)
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
                var Id = ids
                Dados.id = `Dados${Id}`
                Letra.id = `LetraMusic${Id}`
                Letra.className = `LetraMusic`
                // Caixa de Texto
                CaixadeTexto.id = `CaixaTexto`
                // Titulo
                Titulo.innerHTML = MusicReplace
                Titulo.id = `Titulos${Id}`
                s.id = `${Id}`
                // Box
                Box.id = `BoxsPlaylist`
                // music
                music.id = `Music${Id}`
                // Play e Pause
                PlayePause.type = "checkbox"
                PlayePause.id = `PPause${Id}`
                PlayePause.className = `PPause${i}`
                // Icone
                LabelPlayePause.setAttribute("for", `PPause${Id}`)
                LabelPlayePause.id = `Labeis${Id}`
                LabelPlayePause.className = `PPause${i}`

                // Remover Undefined
                if (JSON.parse(Buscar)[i].Lista.split(/,(?! )/)[q] == null || JSON.parse(Buscar)[i].Lista.split(/,(?! )/)[q] == undefined ||
                    JSON.parse(Buscar)[i].Lista.split(/,(?! )/)[q] == "") {
                    LabelPlayePause.style.display = "none"
                }
                // Imagens
                Image.id = `Image${Id}`
                Image.className = "Image"
                fetch("/ThumbJson").then(function (response) {
                    response.json().then((datas) => {
                        for (var i = 0; i < datas.Imgs.length; i++) {
                            var Image = window.document.querySelector(`img#Image${i}`)
                            var ImagesPrincipal = document.querySelector("img#ImagesPrincipal")
                            var TPImage = document.querySelector("img#TPImage")
                            $("label.LabelPlayePause").on("click", function () {
                                var Id = parseInt(($(this).attr("id")).replace("Labeis", ""))
                                ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                // Frente
                                $(`button#Frente,button#FrenteP`).on("click", function () {
                                    if (Id < MinhasMusicas.Name_Music.length) {
                                        Id++
                                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                    } else {
                                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id = 0]
                                    }
                                })
    
                                ORIGINAL.addEventListener("ended", function () {
                                    Id++
                                    ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                })
    
                                // Trás
                                $(`button#TrásP,buttonTrás`).on("click", function () {
                                    if (Id >= 0) {
                                        Id--
                                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                    } else {
                                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id = 0]
                                    }
                                })
                            })
                            Image.src = datas.Imgs[i]
                        }
                    })
                })
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
                    Play2.style.display = "flex"
                    Pause2.style.display = "none"
                })
                Play2.addEventListener("click", function () {
                    document.querySelectorAll('audio').forEach(el => el.play());
                    Play2.style.display = "none"
                    Pause2.style.display = "flex"
                })
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
                // Doc Principal
                PlayePause.addEventListener("click", function () {
                    localStorage.setItem("Tocandas", count)
                    count++
                    // Junção
                    var MusicIDs = this.id.replace("PPause", '')
                    var ListaClass = this.className.replace("PPause", '')
                    var EscolhaMusical = 0
                    var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                    document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicIDs]?.replace(".mp3", "")?.replace(".m4a", "")?.replace(/[0-9]/g, "")?.replace("amv", "")?.replace("kbps", "")?.replace("(", "")?.replace(")", "")
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
                        function Frente() {
                            localStorage.setItem("Tocandas", count)
                            count++
                            if (EscolhaMusical <= JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/).length) {
                                EscolhaMusical++
                                var ListaAtual = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical]
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaAtual]}`
                            } else {
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaAtual = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical = 0]]}`
                            }

                            if (EscolhaMusical >= JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/).length) {
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaAtual = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical = 0]]}`
                            }
                            var BuscarMusicIds = MinhasMusicas.Name_Music[ListaAtual]?.replace(".mp3", "")?.replace(".m4a", "")?.replace(/[0-9]/g, "")?.replace("amv", "")?.replace("(", "")?.replace(")", "")?.replace("kbps", "")
                            document.getElementById("TextosPrincipal").innerHTML = BuscarMusicIds
                            document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                            ORIGINAL.play()
                        }
                        // Trás Function
                        function Tras() {
                            localStorage.setItem("Tocandas", count)
                            count++
                            if (EscolhaMusical >= 0) {
                                EscolhaMusical--
                                var ListaVoltar = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical]
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaVoltar]}`
                            } else {
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaAtual = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical = 0]]}`
                            }
                            if (EscolhaMusical >= JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/).length) {
                                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[ListaAtual = JSON.parse(Buscar)[ListaClass].Lista?.split(/,(?! )/)[EscolhaMusical = 0]]}`
                            }
                            var BuscarMusicIds = MinhasMusicas.Name_Music[ListaVoltar]?.replace(".mp3", "")?.replace(".m4a", "")?.replace(/[0-9]/g, "")?.replace("amv", "")?.replace("(", "")?.replace(")", "")?.replace("kbps", "")
                            document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                            document.getElementById("TextosPrincipal").innerText = BuscarMusicIds
                            ORIGINAL.play()
                        }
                        document.getElementById("MusicaPrincipal").style.display = "block";
                        const parent = MinhasMusicas.Name_Music[MusicIDs]?.replace(".mp3", "")?.replace(".m4a", "")?.replace(/[0-9]/g, "")?.replace("amv", "")?.replace("(", " ")?.replace(")", " ")?.replace("kbps", "")?.replace(/[()]/g, "")
                        const Author = document.getElementById(`Dados${MusicIDs}`).innerText
                        const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        TextosPrincipal.innerText = parent
                        LetraMusics.innerHTML = LetraId
                    }
                    else {
                        ORIGINAL.pause()
                        document.getElementById("MusicaPrincipal").style.display = "none"
                    }
                })
                // Append
                CaixadeTexto.append(Titulo, Dados, Letra)
                Box.append(PlayePause, Image, CaixadeTexto, music)
                LabelPlayePause.append(Box)
                CreateBox.append(LabelPlayePause)
                Musicas.append(CreateBox)
            }
        }
    })
})
// Background
var EscolhaBK = localStorage.getItem("BackgroundEscolhido")
document.querySelector("body").style.backgroundImage = `url(${EscolhaBK})`

function AbirPlaylist(){
    document.getElementById("PlaylistInputBody").style.display = "block"
}