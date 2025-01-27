from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models.functions import Lower

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    clerk_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            UniqueConstraint(
                fields=['clerk_id'], 
                name='unique_clerk_id'
            ),
            UniqueConstraint(
                fields=['email'], 
                name='unique_email'
            ),
        ]

    def __str__(self):
        return self.name