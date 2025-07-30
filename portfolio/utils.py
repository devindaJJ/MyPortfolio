from .models import Certification

def get_certifications():
    """Return active certifications ordered by issue date descending."""
    return Certification.objects.filter(is_active=True).order_by('-issue_date')