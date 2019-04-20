from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import TaskList
from api.serializers import TaskListSerializer


class TaskListsView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return TaskList.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return TaskListSerializer


class TaskListView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (IsAuthenticated, )

    # filters by pk of task_list
    def get_queryset(self):
        return TaskList.objects.for_user(self.request.user).filter(id=self.kwargs['pk'])

    def get_serializer_class(self):
        return TaskListSerializer