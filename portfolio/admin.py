from django.contrib import admin
from .models import Project, Skill, Contact,Certification
from django.utils.html import format_html

admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(Contact)

class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuing_organization', 'issue_date', 'certificate_preview', 'is_active')
    list_filter = ('is_active', 'issue_date')
    search_fields = ('name', 'issuing_organization', 'skills')
    list_editable = ('is_active',)
    readonly_fields = ('certificate_preview',)
    
    fieldsets = (
        (None, {
            'fields': ('name', 'issuing_organization', 'issue_date')
        }),
        ('Certificate Files', {
            'fields': ('certificate_image', 'certificate_preview', 'certificate_pdf'),
            'classes': ('collapse',)
        }),
        ('Details', {
            'fields': ('credential_id', 'credential_url', 'skills')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )

    def certificate_preview(self, obj):
        if obj.certificate_image:
            return format_html(
                '<img src="{}" style="max-height: 200px; max-width: 100%;"/>',
                obj.certificate_image.url
            )
        return "No image uploaded"
    certificate_preview.short_description = 'Preview'

admin.site.register(Certification, CertificationAdmin)