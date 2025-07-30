from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
import logging
from .utils import get_certifications
from .models import Project, Skill, Certification

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

def home(request):
    certifications = Certification.objects.filter(is_active=True).order_by('-issue_date')
    context = {
        'certifications': certifications
    }
    return render(request, 'portfolio/home.html', context)

logger = logging.getLogger(__name__)

def home(request):
    """Render the home page with contact form"""
    context = {
        'certifications': get_certifications(),  # Your existing certification logic
    }
    return render(request, 'portfolio/home.html', context)

@require_http_methods(["POST"])
def contact(request):
    """Handle contact form submissions"""
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        # AJAX request - return JSON response
        try:
            # Get form data
            name = request.POST.get('name', '').strip()
            email = request.POST.get('email', '').strip()
            subject = request.POST.get('subject', '').strip()
            message = request.POST.get('message', '').strip()
            
            # Validate required fields
            if not name or not email or not message:
                return JsonResponse({
                    'success': False,
                    'message': 'Please fill in all required fields.'
                })
            
            # Validate email format (basic check)
            if '@' not in email or '.' not in email.split('@')[-1]:
                return JsonResponse({
                    'success': False,
                    'message': 'Please enter a valid email address.'
                })
            
            # Prepare email content
            email_subject = f"Portfolio Contact: {subject}" if subject else f"Portfolio Contact from {name}"
            email_message = f"""
New contact form submission:

Name: {name}
Email: {email}
Subject: {subject if subject else 'No subject provided'}

Message:
{message}

---
This email was sent from your portfolio contact form.
            """.strip()
            
            # Send email
            try:
                send_mail(
                    subject=email_subject,
                    message=email_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_EMAIL],  # Your email address
                    fail_silently=False,
                )
                
                # Optional: Send confirmation email to the sender
                confirmation_subject = "Thank you for contacting me"
                confirmation_message = f"""
Hi {name},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Here's a copy of what you sent:
Subject: {subject if subject else 'No subject'}
Message: {message}

Best regards,
Devinda Jayathilake
                """.strip()
                
                send_mail(
                    subject=confirmation_subject,
                    message=confirmation_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    fail_silently=True,  # Don't fail if confirmation email fails
                )
                
                return JsonResponse({
                    'success': True,
                    'message': 'Your message has been sent successfully!'
                })
                
            except Exception as e:
                logger.error(f"Email sending failed: {str(e)}")
                return JsonResponse({
                    'success': False,
                    'message': 'Sorry, there was an error sending your message. Please try again later.'
                })
                
        except Exception as e:
            logger.error(f"Contact form error: {str(e)}")
            return JsonResponse({
                'success': False,
                'message': 'An unexpected error occurred. Please try again later.'
            })
    
    else:
        # Regular form submission - redirect back to home with message
        # You can implement this if needed
        return render(request, 'core/home.html', {
            'message': 'Form submission received',
            'certifications': get_certifications(),
        })

