from django_filters import rest_framework as filters

from .models import Task


class TasksFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr=('startswith'))

    class Meta:
        model = Task
        fields = '__all__'
