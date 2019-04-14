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


	def create(self, validated_data):
		t = validated_data.pop('task_list')
		# validated_data.pop('id')

		print('task list is ' + str(t))

		return Task.objects.create(task_list=t, **validated_data)
