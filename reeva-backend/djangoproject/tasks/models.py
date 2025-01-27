from django.db import models
from projects.models import Projects
from djangoapp.models import User
from django.core.exceptions import PermissionDenied

class Status(models.TextChoices):
    TODO = 'todo', 'Todo'
    IN_PROGRESS = 'inprogress', 'In Progress'
    DONE = 'done', 'Done'

class Priority(models.TextChoices):
    LOW = 'low', 'Low'
    MEDIUM = 'medium', 'Medium'
    HIGH = 'high', 'High'

class Tasks(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.LOW)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='tasks')
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.pk is not None:  # Check if the project already exists
            existing_task = Tasks.objects.get(pk=self.pk)
            if existing_task.assignee != self.assignee:
                raise PermissionDenied("You do not have permission to modify this task.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"
