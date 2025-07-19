from django.shortcuts import render
from .models import Project, Skill

def home(request):
    tech_logos = [
        'portfolio/tech/python.svg',
        'portfolio/tech/javascript.svg',
        'portfolio/tech/react.svg',
        'portfolio/tech/tailwindcss.svg',
        'portfolio/tech/html.svg',
        'portfolio/tech/css.svg',
        'portfolio/tech/flask.svg',
        'portfolio/tech/c.svg',
        'portfolio/tech/java.svg',
        'portfolio/tech/springboot.svg',
    ]
    return render(request, 'portfolio/home.html', {'tech_logos': tech_logos})

def projects(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': projects})

def contact(request):
    return render(request, 'portfolio/contact.html')
