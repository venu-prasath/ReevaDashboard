from django.db import models
from djangoapp.models import User
from django.core.exceptions import PermissionDenied

class Status(models.TextChoices):
        ON_HOLD = 'onhold', 'On Hold'
        ACTIVE = 'active', 'Active'
        COMPLETED = 'completed', 'Completed'

# Create your models here.
class Projects(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.pk is not None:  # Check if the project already exists
            existing_project = Projects.objects.get(pk=self.pk)
            if existing_project.owner != self.owner:
                raise PermissionDenied("You do not have permission to modify this project.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"