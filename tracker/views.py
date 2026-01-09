from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all().order_by('-created_at')

    def get_queryset(self):
        completed = self.request.query_params.get('completed')
        if completed == 'true':
            return Task.objects.filter(is_completed=True)
        if completed == 'false':
            return Task.objects.filter(is_completed=False)
        return Task.objects.all()

    @action(detail=True, methods=['patch'])
    def complete(self, request, pk=None):
        task = self.get_object()
        task.is_completed = True
        task.duration = now() - task.start_time
        task.save()
        return Response(TaskSerializer(task).data)
