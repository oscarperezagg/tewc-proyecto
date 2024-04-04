import json
import random
import string

# El array proporcionado con los nombres de las asignaturas
subject_names = {
    "INTRODUCCIÓN A LA ELECTRÓNICA",
    "INGLÉS I",
    "ANÁLISIS Y DISEÑO DEL SOFTWARE",
    "TRATAMIENTO DIGITAL DE IMÁGENES Y VÍDEO",
    "SISTEMAS DE INFORMACIÓN GEOGRÁFICA Y TERRITORIAL",
    "INFRAESTRUCTURA DE DATOS ESPACIALES",
    "TRABAJO FIN DE GRADO",
    "SISTEMAS DE ENERGÍA",
    "INSTRUMENTACIÓN ELECTRÓNICA",
    "REDES Y SERVICIOS DE TELECOMUNICACIÓN",
    "COMUNICACIONES ÓPTICAS",
    "MÉTODOS MATEMÁTICOS",
    "SISTEMAS BASADOS EN APRENDIZAJE AUTOMÁTICO",
    "SISTEMAS DE TRANSMISIÓN",
    "CALCULO",
    "CIRCUITOS ELECTRÓNICOS",
    "ELECTRÓNICA ANALÓGICA",
    "RADIACIÓN Y PROPAGACIÓN",
    "CRIPTOGRAFÍA",
    "CENTROS DE DATOS Y DE PROVISIÓN DE SERVICIOS",
    "ANÁLISIS Y DISEÑO DE CIRCUITOS",
    "SUBSISTEMAS DE RADIOFRECUENCIA",
    "SEGURIDAD EN SISTEMAS Y REDES DE TELECOMUNICACIÓN",
    "ARQUITECTURA DE PROCESADORES",
    "INGENIERÍA DE LA MÚSICA",
    "SISTEMAS PARA CONECTIVIDAD",
    "TEORÍA DE LA COMUNICACIÓN",
    "REDES Y SERVICIOS DE RADIO",
    "FISICA GENERAL 1",
    "TRATAMIENTO DIGITAL DE VOZ Y AUDIO",
    "REDES DE ORDENADORES",
    "ELECTRÓNICA DIGITAL",
    "REDES DE COMUNICACIONES MÓVILES",
    "PROGRAMACIÓN",
    "DISEÑO DE SISTEMAS ELECTRÓNICOS DIGITALES",
    "FÍSICA GENERAL 2",
    "ELECTRÓNICA E INSTRUMENTACIÓN BÁSICAS",
    "INGLÉS II",
    "DIMENSIONADO Y OPERACIÓN DE REDES",
    "SISTEMAS DE RADIODETERMINACIÓN",
    "TELEVISIÓN",
    "INGENIERÍA DE SISTEMAS Y SERVICIOS TELEMÁTICOS",
    "RADIOCOMUNICACIONES",
    "COMUNICACIONES AUDIOVISUALES",
    "INGENIERÍA DE TELECOMUNICACIÓN EN COOPERACIÓN PARA EL DESARROLLO",
    "INTRODUCCIÓN A LOS ENTORNOS INTELIGENTES",
    "FOTÓNICA DE CONSUMO",
    "SISTEMAS DIGITALES I",
    "COMUNICACIONES MÓVILES",
    "CREATIVIDAD E INNOVACIÓN",
    "CAMPOS Y ONDAS EN TELECOMUNICACIÓN",
    "SISTEMAS DE TELECOMUNICACIÓN",
    "ELECTRÓNICA DE CONSUMO",
    "MICROONDAS",
    "INTRODUCCIÓN A LA ROBÓTICA INTELIGENTE",
    "TEORÍA DE LA INFORMACIÓN",
    "FUNDAMENTOS DE LOS SISTEMAS TELEMATICOS",
    "ELECTROMAGNETISMO",
    "BIOINGENIERÍA Y TELECOMUNICACIÓN",
    "ANÁLISIS VECTORIAL",
    "DIFUSIÓN Y SERVICIOS DE RED",
    "COMPUTACIÓN EN RED",
    "INGENIERÍA DE SISTEMAS ELECTRÓNICOS",
    "INGENIERÍA WEB",
    "TECNOLOGÍAS WEB DE CLIENTE",
    "ORGANIZACIÓN DE EMPRESAS",
    "SISTEMAS DIGITALES II",
    "ALGEBRA",
    "INTRODUCCIÓN A LA INGENIERIA DE TELECOMUNICACION",
    "SEÑALES ALEATORIAS",
    "INSTALACIONES ELÉCTRICAS",
    "LABORATORIO DE TÉCNICAS ELECTRO-TERMOQUÍMICAS",
    "SISTEMAS ELECTRÓNICOS ANALÓGICOS Y MIXTOS",
    "SEÑALES Y SISTEMAS",
    "ELECTRÓNICA DE COMUNICACIONES",
    "HERRAMIENTAS PARA LA COMPUTACIÓN Y VISUALIZACIÓN",
    "ANTENAS",
    "TRANSMISIÓN DIGITAL",
    "GESTIÓN EFICAZ DE EQUIPOS DE TRABAJO",
    "TRATAMIENTO DIGITAL DE SEÑALES",
    "FUNDAMENTOS DE GESTIÓN EMPRESARIAL",
    "REDES CORPORATIVAS",
    "PRODUCCIÓN MULTIMEDIA",
    "DIBUJO POR ORDENADOR",
    "FABRICACIÓN DE EQUIPOS ELECTRÓNICOS",
    "DESARROLLO PERSONAL Y GESTIÓN DE CARRERA",
    "EQUIPOS Y SISTEMAS AUDIOVISUALES",
    "INTRODUCCIÓN AL ANÁLISIS DE CIRCUITOS",
    "SISTEMAS ELECTRÓNICOS DE CONTROL",
}

temas_relacionados = [
    "Protocolos de comunicación en redes de sensores",
    "Ingeniería de sistemas de comunicación por fibra óptica",
    "Gestión del espectro electromagnético",
    "Sistemas de gestión de bases de datos geoespaciales",
    "Desarrollo de aplicaciones web seguras",
    "Simulación de sistemas de transmisión inalámbrica",
    "Ingeniería de sistemas de audio y acústica",
    "Tecnologías emergentes en telecomunicaciones",
    "Diseño de sistemas de control de tráfico aéreo",
    "Seguridad en sistemas de control industrial",
    "Realidad aumentada aplicada a la educación",
    "Sistemas de comunicación para vehículos autónomos",
    "Desarrollo de videojuegos y realidad virtual",
    "Sistemas de comunicación para la salud digital",
    "Biometría y reconocimiento de patrones",
    "Gestión de proyectos de telecomunicaciones",
    "Teoría de la información y codificación",
    "Computación en la nube y servicios web",
    "Ingeniería de sistemas de audio profesional",
    "Diseño de circuitos integrados para comunicaciones",
    "Minería de datos y análisis de grandes volúmenes de datos",
    "Robótica médica y asistencia sanitaria",
    "Sistemas de localización y seguimiento en interiores",
    "Ingeniería de sistemas de televisión digital",
    "Programación avanzada para sistemas embebidos",
    "Sistemas de seguridad en redes informáticas",
    "Diseño de sistemas de energía renovable",
    "Procesamiento de lenguaje natural",
    "Sistemas de navegación por satélite y GPS",
    "Sistemas de comunicación para emergencias y desastres naturales",
    "Redes de área local inalámbricas (Wi-Fi)",
    "Desarrollo de aplicaciones para dispositivos móviles",
    "Arquitectura de computadoras avanzada",
    "Sistemas de visión artificial y reconocimiento de objetos",
    "Gestión de la calidad del software",
    "Tecnologías de almacenamiento de datos en la nube",
    "Sistemas de control de procesos industriales",
    "Ciberseguridad en infraestructuras críticas",
    "Sistemas de gestión de tráfico urbano",
    "Ingeniería de sistemas de telecomunicaciones militares",
]


# Lista para almacenar los objetos JSON
subject_objects = []


# Función para generar un nombre aleatorio
def generate_random_name():
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=10))


# Generar objetos JSON para cada asignatura con nombres aleatorios
for subject_name in subject_names:
    subject_object = {
        "ASIGNATURA": subject_name,
        "CURSO-ITINERARIO": "PRIMER CURSO",  # Esto es un ejemplo, deberías asignar el valor correspondiente
        "NAME": random.choice(temas_relacionados),
        # Genera un nombre aleatorio para el campo "NAME"
    }
    subject_objects.append(subject_object)
    break


# Suponiendo que subject_objects contiene los datos que deseas guardar en formato JSON
# Ejemplo:
# subject_objects = {"clave": "valor"}

# Ruta donde se guardará el archivo JSON
ruta_archivo = "/Users/oscarperezarruti/Documents/Documentos/Repositorios/tewc-proyecto/modelos/decks/etsit.json"

# Convertir el diccionario a una cadena JSON
json_string = json.dumps(subject_objects, indent=2)

# Escribir la cadena JSON en el archivo
with open(ruta_archivo, "w") as archivo:
    archivo.write(json_string)

print("Archivo JSON guardado exitosamente en:", ruta_archivo)
