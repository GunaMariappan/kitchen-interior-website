from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    DesignViewSet,
    ProjectViewSet,
    ProjectImageViewSet,
    ServiceViewSet,
    EnquiryViewSet,
    login_view,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("designs", DesignViewSet, basename="design")
router.register("projects", ProjectViewSet, basename="project")
router.register("project-images", ProjectImageViewSet, basename="project-image")
router.register("services", ServiceViewSet, basename="service")
router.register("enquiries", EnquiryViewSet, basename="enquiry")

urlpatterns = [
    path("auth/login/", login_view, name="login"),
] + router.urls