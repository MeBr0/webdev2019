from rest_framework import serializers

from .models import TaskList, Task


class TaskListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskList
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'name', 'created_at', 'due_on', 'status', 'task_list', 'notes')
