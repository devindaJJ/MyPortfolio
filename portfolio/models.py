from django.db import models
from django.core.validators import URLValidator, FileExtensionValidator
import os

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/')
    url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)

class Skill(models.Model):
    name = models.CharField(max_length=50)
    proficiency = models.IntegerField(help_text="Enter a value from 1 to 100")

    def __str__(self):
        return str(self.name)
    
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f"Message from {self.name}"

def certificate_upload_path(instance, filename):
    return f'certificates/{instance.id}/{filename}'

class Certification(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    issuing_organization = models.CharField(max_length=200, blank=True, null=True)
    issue_date = models.DateField()
    credential_id = models.CharField(max_length=100, blank=True, null=True)
    credential_url = models.URLField(max_length=500, blank=True, null=True, validators=[URLValidator()])
    skills = models.CharField(max_length=300, help_text="Comma separated list of skills", blank=True, null=True)
    certificate_image = models.ImageField(
        upload_to=certificate_upload_path,
        blank=True,
        null=True,
        help_text="Upload certificate image (JPG/PNG)"
    )
    certificate_pdf = models.FileField(
        upload_to=certificate_upload_path,
        blank=True,
        null=True,
        help_text="Upload certificate PDF",
        validators=[FileExtensionValidator(['pdf'])]
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.issuing_organization}"

    def save(self, *args, **kwargs):
        # Delete old file when replacing with new one
        try:
            old = Certification.objects.get(pk=self.pk)
            if old.certificate_image and old.certificate_image != self.certificate_image:
                old.certificate_image.delete(save=False)
            if old.certificate_pdf and old.certificate_pdf != self.certificate_pdf:
                old.certificate_pdf.delete(save=False)
        except Certification.DoesNotExist:
            pass
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete files when certificate is deleted
        if self.certificate_image:
            self.certificate_image.delete(save=False)
        if self.certificate_pdf:
            self.certificate_pdf.delete(save=False)
        super().delete(*args, **kwargs)

    class Meta:
        ordering = ['-issue_date']
