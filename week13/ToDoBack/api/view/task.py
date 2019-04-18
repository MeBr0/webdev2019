from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Task, TaskList
from api.serializers import TaskListSerializer, TaskSerializer


class TasksView(generics.ListCreateAPIView):

    def get_queryset(self):
        return Task.objects.filter(task_list=self.kwargs['pk'])


    def get_serializer_class(self):
        return TaskSerializer


    def perform_create(self, serializer):
        serializer.save()


class TaskView(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        print(self.kwargs)

        return Task.objects.filter(id=self.kwargs['pk'], task_list=self.kwargs['pk2'])


    def get_serializer_class(self):
        return TaskSerializer