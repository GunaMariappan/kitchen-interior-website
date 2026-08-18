from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    DesignViewSet,
    ProjectViewSet,
    ServiceViewSet,
    EnquiryViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("designs", DesignViewSet, basename="design")
router.register("projects", ProjectViewSet, basename="project")
router.register("services", ServiceViewSet, basename="service")
router.register("enquiries", EnquiryViewSet, basename="enquiry")

urlpatterns = router.urls