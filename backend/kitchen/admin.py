from django.contrib import admin
from .models import Category, Design, Project, ProjectImage, Service, Enquiry


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "price", "created_at"]
    list_filter = ["category"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "location", "kitchen_type", "completion_date"]
    search_fields = ["title", "location"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectImageInline]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at"]


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "phone", "status", "created_at"]
    list_filter = ["status"]
    search_fields = ["name", "phone", "email"]