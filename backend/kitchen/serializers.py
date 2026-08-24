from rest_framework import serializers
from .models import Category, Design, Project, ProjectImage, Service, Enquiry


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class DesignSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True, required=False
    )
    features = serializers.SerializerMethodField()

    class Meta:
        model = Design
        fields = [
            "id", "title", "slug", "category", "category_id",
            "description", "features", "price", "image",
            "created_at", "updated_at",
        ]

    def get_features(self, obj):
        return obj.features_list()


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "uploaded_at"]


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "location", "kitchen_type",
            "description", "completion_date", "images",
            "created_at", "updated_at",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "title", "description", "icon", "created_at"]


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = [
            "id", "name", "phone", "email", "message",
            "design", "project", "status", "created_at",
        ]
        read_only_fields = ["created_at"]

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        # Public users (submitting an enquiry) cannot set status themselves.
        # Only authenticated admin users (PATCH/PUT from dashboard) can update it.
        if request and request.method == "POST":
            fields["status"].read_only = True
        return fields