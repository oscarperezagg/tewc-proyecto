import pandas as pd
import requests
import json

# URL de la página web
url = "https://www.upm.es/Estudiantes/Estudios_Titulaciones/EstudiosOficialesGrado"

# Obtener el contenido HTML de la página
response = requests.get(url)

# Leer todas las tablas HTML en un diccionario de marcos de datos
tables = pd.read_html(response.text)

# Imprimir el número de tablas encontradas
print(f"Se encontraron {len(tables)} tablas HTML en la página.")


# Iterar sobre las tablas y mostrarlas
for i, table in enumerate(tables):
    print(table.columns)
    print(f"Tabla {i+1}:")
    print(table)
    print("\n")


df = pd.DataFrame()

# Iterar sobre las tablas y asignar la columna "CURSO-ITINERARIO"
for i, table in enumerate(tables):
    try:
        df.index.name = 'CARRERA'
        df["universidad"] = "universidad_politécnica_de_madrid"
        df["decks_file"] = ""
        df = pd.concat([df, table], ignore_index=True)
    except Exception as e:
        print(f"tabla {i} - {e}")
# Convertir DataFrame a lista de diccionarios
dict_columns = df.to_dict(orient="records")

# Guardar en un archivo JSON
file_path = "modelos/carreras.json"
with open(file_path, "w") as json_file:
    json.dump(dict_columns, json_file, indent=4)

print(f"El archivo JSON ha sido guardado en: {file_path}")
