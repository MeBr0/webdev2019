# views rewritten as Class Based Views
from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer

from django.http import Http404

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


class TaskListsView(APIView):

    def get(self, request):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TaskListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_200_OK)


class TaskListView(APIView):

    # similar to get_object_or_404()
    def get_object(self, pk):
        try:
            return TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            raise Http404
    
    def get(self, request, pk):
        task_list = self.get_object(pk)
        serializer = TaskListSerializer(task_list)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        task_list = self.get_object(pk)
        serializer = TaskListSerializer(instance=task_list, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        task_list = self.get_object(pk)
        task_list.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TasksView(APIView):
    
    def get(self, request, pk):
        tasks = Task.objects.filter(task_list=pk)
        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_200_OK)


class TaskView(APIView):

    # similar to get_object_or_404()
    def get_object(self, pk):
        try:
            return Task.objects.get(id=pk)
        except Task.DoesNotExist as e:
            raise Http404

    def get(self, request, pk, pk2):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, pk2):
        task = self.get_object(pk)
        serializer = TaskSerializer(instance=task, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    def delete(self, request, pk, pk2):
        task = self.get_object(pk)
        task.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)




