
from django.db import models

class Task(models.Model):
    task_name = models.CharField(max_length=255)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    duration = models.DurationField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task_name
