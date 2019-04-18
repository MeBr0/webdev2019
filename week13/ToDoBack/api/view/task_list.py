from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Task, TaskList
from api.serializers import TaskListSerializer, TaskSerializer


class TaskListsView(generics.ListCreateAPIView):

    def get_queryset(self):
        return TaskList.objects.all()


    def get_serializer_class(self):
        return TaskListSerializer


    def perform_create(self, serializer):
        serializer.save()


class TaskListView(generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        return TaskList.objects.all()


    def get_serializer_class(self):
        return TaskListSerializer