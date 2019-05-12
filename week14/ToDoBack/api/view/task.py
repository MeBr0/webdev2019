from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from api.models import Task
from api.serializers import TaskSerializer
from api.filters import TasksFilter


class TasksView(generics.ListCreateAPIView):

    permission_classes = (IsAuthenticated, )

    filter_backends = (filters.OrderingFilter, DjangoFilterBackend, )

    # pagination with PageNumberPagination
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    # ordering filter
    ordering_fields = ('status', 'created_at', 'due_on', )
    # default filtering
    ordering = ('name', )

    filter_class = TasksFilter

    # filters by pk of task_list
    def get_queryset(self):
        return Task.objects.filter(task_list=self.kwargs['pk'])

    def get_serializer_class(self):
        return TaskSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = (IsAuthenticated, )

    # filter by pk2 of task_list, by pk of task
    def get_queryset(self):
        print(self.args)

        return Task.objects.filter(id=self.kwargs['pk'], task_list=self.kwargs['pk2'])

    def get_serializer_class(self):
        return TaskSerializer

