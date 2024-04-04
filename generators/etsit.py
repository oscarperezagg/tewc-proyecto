import pandas as pd
import requests
import json

# URL de la página web
url = "https://www.etsit.upm.es/estudios/grado-en-ingenieria-de-tecnologias-y-servicios-de-telecomunicacion/plan-de-estudios/asignaturas.html"

# Obtener el contenido HTML de la página
response = requests.get(url)

# Leer todas las tablas HTML en un diccionario de marcos de datos
tables = pd.read_html(response.text)

# Imprimir el número de tablas encontradas
print(f"Se encontraron {len(tables)} tablas HTML en la página.")


binding = [
    "PRIMER CURSO",
    "SEGUNDO CURSO",
    "SEGUNDO CURSO - OPTATIVAS",
    "TERCER CURSO",
    "TERCER CURSO - OPTATIVAS",
    "CUARTO CURSO - ITINERARIO EN SISTEMAS DE TELECOMUNICACIÓN",
    "CUARTO CURSO - ITINERARIO EN TELEMÁTICA",
    "CUARTO CURSO - ITINERARIO EN SISTEMAS ELECTRÓNICOS",
    "CUARTO CURSO - ITINERARIO EN SISTEMAS AUDIOVISUALES",
    "CUARTO CURSO - OPTATIVAS PARA TODOS LOS ITINERARIOS",
]

# # Iterar sobre las tablas y mostrarlas
# for i, table in enumerate(tables):
#     print(f"Tabla {i+1}:")
#     print(table)
#     print("\n")

df = pd.DataFrame()

# Iterar sobre las tablas y asignar la columna "CURSO-ITINERARIO"
for i, table in enumerate(tables):
    if i == 10:
        break
    try:
        table["CURSO-ITINERARIO"] = binding[i]
        df = pd.concat([df, table], ignore_index=True)
    except:
        print(f"tabla {i}")
# Convertir DataFrame a lista de diccionarios
records = df.to_dict(orient="records")

# Guardar en un archivo JSON
file_path = "modelos/university/universidad_politécnica_de_madrid.json"
with open(file_path, "w") as json_file:
    json.dump(records, json_file, indent=4)

print(f"El archivo JSON ha sido guardado en: {file_path}")
