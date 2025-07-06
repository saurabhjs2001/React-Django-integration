from django.contrib.auth.models import User
from django.db import models

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    publication_date = models.DateField()
    genre = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title
