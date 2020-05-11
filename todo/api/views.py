from rest_framework import generics
from todo.models import Task
from .serializers import TaskSerializer


class TaskListAPIView(generics.ListAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
