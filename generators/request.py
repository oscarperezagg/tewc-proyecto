import random
import json
from datetime import datetime, timedelta

# Lista de posibles nombres de usuario
nombres_usuarios = [
    "learner123",
    "study_guru",
    "knowledge_seeker",
    "coding_ninja",
    "design_expert",
    "language_lover",
    "tech_enthusiast",
    "art_aficionado",
    "wellness_warrior",
    "eco_advocate",
    "history_buff",
    "math_master",
]

# Lista de posibles temas
temas = [
    "Flashcard learning",
    "Pomodoro Technique",
    "Code testing",
    "Vibrant and participatory community",
    "Accessibility and collaboration",
    "Democratization of access to knowledge",
    "New study tools",
    "Integration with video conferencing platforms",
    "Improvements in user interface",
    "Gamification features",
    "Development of a mobile application",
    "Integration with social networks",
    "Enriched multimedia content",
    "Personalization of learning experience",
    "Object-oriented programming",
    "Data analysis",
    "Web development",
    "Graphic design",
    "Digital marketing",
    "Interpersonal skills",
    "Leadership and team management",
    "Personal finance",
    "Foreign languages",
    "Science and technology",
    "Art and culture",
    "Health and wellness",
    "Ecology and environment",
    "History and philosophy",
    "Literature and creative writing",
    "Mathematics and physics",
]

# Lista de posibles solicitudes
solicitudes = [
    "Add more decks of cards on various topics.",
    "Implement a Pomodoro-based timer.",
    "Expand the code testing bank with new challenges.",
    "Facilitate search and discovery of card groups and resources.",
    "Improve platform accessibility for users with disabilities.",
    "Integrate real-time collaboration features for users.",
    "Expand coverage of topics related to professional certifications.",
    "Create a resources section for oppositions and standardized exams.",
    "Develop a user progress tracking feature.",
    "Add more content related to data science and analysis.",
    "Incorporate new study tools such as mind maps and schemas.",
    "Allow integration with popular video conferencing platforms for live classes.",
    "Make design adjustments to make the platform more intuitive and attractive.",
    "Introduce gamification elements to motivate users to learn.",
    "Create a mobile app to access LearnHub from mobile devices.",
    "Allow users to share their progress and achievements on social networks.",
    "Enrich content with videos, infographics, and other multimedia resources.",
    "Allow users to customize their learning experience according to their interests and needs.",
    "Create specialized courses in object-oriented programming.",
    "Offer advanced tutorials in data analysis using popular tools.",
    "Develop practical web development projects with modern technologies.",
    "Include graphic design workshops for beginners and professionals.",
    "Organize digital marketing seminars with industry experts.",
    "Offer interpersonal skills and effective communication courses.",
    "Provide leadership and team management classes for professionals.",
    "Create modules for financial education for proper personal finance management.",
    "Offer foreign language classes focusing on oral and written communication.",
    "Organize conferences on the latest advancements in science and technology.",
    "Promote appreciation of art and culture through classes and exhibitions.",
    "Offer health and wellness tips for a balanced life.",
    "Conduct awareness activities on environmental protection.",
    "Organize talks on history and philosophy for a deeper understanding of the world.",
    "Encourage creativity through literature and creative writing workshops.",
    "Provide mathematics and physics classes focusing on problem-solving and practical applications.",
]

# Función para generar una fecha aleatoria en los últimos 30 días
def random_date():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    return start_date + timedelta(
        seconds=random.randint(0, int((end_date - start_date).total_seconds()))
    )

# Generar el array de diccionarios con usuarios aleatorios
peticiones = []
for _ in range(100):
    peticion = {
        "usuario": random.choice(nombres_usuarios),
        "tema": random.choice(temas),
        "solicitud": random.choice(solicitudes),
        "fecha": random_date().strftime("%Y-%m-%d"),
        "estado": random.choice(["Pending", "Under review", "Approved", "Rejected"]),
    }
    peticiones.append(peticion)

# Guardar las peticiones en un archivo JSON
with open(r"modelos/requests.json", "w") as archivo:
    json.dump(peticiones, archivo, indent=4)
