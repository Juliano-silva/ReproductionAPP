import os 
import glob 

path = r"C:\\Reproduction_Folder\\music"

files = list(filter(os.path.isfile, glob.glob(path + "\\*"))) 

files.sort(key=os.path.getctime) 
  
with open('./teste.json','w',encoding="utf-8") as arquivo:
      Escrito = str('{"Name_Music":' f"{files} ""}")
      arquivo.write(Escrito.replace("'",'"'))