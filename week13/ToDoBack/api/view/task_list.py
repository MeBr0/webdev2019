from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import TaskList
from api.serializers import TaskListSerializer


class TaskListsView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return TaskList.objects.all()

    def get_serializer_class(self):
        return TaskListSerializer

    def perform_create(self, serializer):
        serializer.save()


class TaskListView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return TaskList.objects.all()

    def get_serializer_class(self):
        return TaskListSerializer