from rest_framework import serializers

from api.models import TaskList, Task


class TaskListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        return TaskList.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'name', 'created_at', 'due_on', 'status', 'task_list')
