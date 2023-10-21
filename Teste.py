import os
os.makedirs("C:\\Users\\sustu\\Reproduction_Folder")
existe = os.path.exists("C:\\Users\\sustu\\Reproduction_Folder")
if(existe == False):
    print("False")
else:
    print("True")