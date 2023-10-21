#Dependencies
from flask import Flask,render_template,session,redirect,url_for,jsonify,request,send_from_directory
import webview
import json
from pytube import YouTube
import os
import ctypes
import random
import urllib.request
from winotify import Notification
# App stuff
app = Flask(__name__)
webview.create_window('Reproduction', app,resizable=True,width=1000,height=600 ,http_port=6969,js_api=True,minimized=True,on_top=True)
#Routers
Diretorio = "C:\\Users\\sustu\\OneDrive\\Imagens\\Programação\\Projetos com diferentes linguagens\\Reproduction_APP\\static\\music"

Galeria = "C:\\Users\\sustu\\OneDrive\\Imagens\\Programação\\Projetos com diferentes linguagens\\Reproduction_APP\\static\\Imagens"

existe = os.path.exists("C:\\Users\\sustu\\Reproduction_Folder")
if(existe == False):
    os.makedirs("C:\\Users\\sustu\\Reproduction_Folder")
    Arquivo = open('C:/Users/sustu/Reproduction_Folder/db.json','x',encoding="utf-8")
else:
    print("Arquivo Criado")

@app.route("/",methods=["GET","POST"])
def home():
    return render_template("Home.html")

@app.route("/Index",methods=["GET","POST"])
def index():
    arquivos = []
    Mural = []
    for nome_do_arquivo in os.listdir(Diretorio):
        eda = os.path.join(Diretorio,nome_do_arquivo)
        if(os.path.isfile(eda)):
            arquivos.append(nome_do_arquivo)
    for nome_do_arquivo in os.listdir(Galeria):
        eda = os.path.join(Galeria,nome_do_arquivo)
        if(os.path.isfile(eda)):
            Mural.append(nome_do_arquivo)
        with open('C:/Users/sustu/OneDrive/Imagens/Programação/Projetos com diferentes linguagens/Reproduction_APP/db.json','w',encoding="utf-8") as arquivo:
            Escrito = str('{"Name_Music":' f"{arquivos},'Galeria':{Mural}""}")
            arquivo.write(Escrito.replace("'",'"'))
    return render_template("index.html")

@app.route("/Adicionar",methods=["GET","POST"])
def Add():
    return render_template("Adicionar.html")

@app.route("/Background",methods=["GET","POST"])
def Bk():
    return render_template("Backgrounds.html")

@app.route("/Playlist",methods=["GET","POST"])
def Playlist():
    return render_template("Playlist.html")

@app.route("/Sobre",methods=["GET","POST"])
def Sob():
    return render_template("Sobre.html")

@app.route("/AddMusic",methods=["POST"])
def AddMusic():
    data = request.get_json()
    yt = YouTube(str(data['value']))
    video = yt.streams.filter(only_audio=True).first()
    out_file = video.download(output_path="C:/Users/sustu/OneDrive/Imagens/Programação/Projetos com diferentes linguagens/Reproduction_APP/static/music")
    base, ext = os.path.splitext(out_file)
    new_file = base + '.mp3'
    os.rename(out_file, new_file)
    print(yt.title + "has been successfully downloaded.")
    return '',201

@app.route("/Notificar",methods=["GET","POST"])
def Notificar():
    Monstrar = Notification(app_id="Reproduction",
                       title="Olá,Mundo",
                       msg="HelloWord!",
                       duration="short",
                       icon="https://i.pinimg.com/564x/c8/e9/ca/c8e9ca9d08d66cb052008b7bf776f4d7.jpg")
    Monstrar.show()
    return '',201

@app.route('/AddURL', methods=['POST'])
def AddUrl():
   datas = request.get_json()
   result = datas['value']
   ctypes.windll.user32.SystemParametersInfoW(20,0,result,0)
   Random = random.randint(0,100000)
   urllib.request.urlretrieve(result, Galeria + "\\" + f"{Random}.png")
   return '',201

@app.route("/RemoveFunc",methods=['POST'])
def Remover():
    datas = request.get_json()
    result = datas['value']
    os.remove(Diretorio + "\\" + result)
    return '',201

@app.route('/music/<path:filename>')
def MusicFolder(filename):
    return send_from_directory(Diretorio + "\\",filename)

@app.route('/Fotos/<path:filename>')
def ImageFolder(filename):
    return send_from_directory(Galeria + "\\",filename)


@app.route("/DadosMusic",methods=["GET"])
def Music():
    with open("C:/Users/sustu/OneDrive/Imagens/Programação/Projetos com diferentes linguagens/Reproduction_APP/db.json",encoding="utf-8") as meu_json:
        dados = json.load(meu_json)
    return jsonify(dados)

if __name__ == "__main__":
    # webview.start(debug=False,private_mode=False,http_server=True)
    app.run(debug=True)