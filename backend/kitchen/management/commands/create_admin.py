from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decouple import config

class Command(BaseCommand):
    def handle(self, *args, **options):
        username = config('ADMIN_USERNAME', default='')
        password = config('ADMIN_PASSWORD', default='')
        email = config('ADMIN_EMAIL', default='admin@example.com')

        if not username or not password:
            self.stdout.write('ADMIN_USERNAME/ADMIN_PASSWORD not set, skipping.')
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'User "{username}" already exists, skipping.')
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(f'Superuser "{username}" created successfully.')