# views rewritten as Function Based Views
from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer

from django.http import Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def task_lists_view(request):
    if request.method == 'GET':
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = TaskListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def task_list_view(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        raise Http404

    if request.method == 'GET':
        serializer = TaskListSerializer(task_list)

        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = TaskListSerializer(instance=task_list, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        task_list.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def tasks_view(request, pk ,pk2):
    if request.method == 'GET':
        tasks = Task.objects.filter(task_list=pk)
        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
def task_view(request, pk, pk2):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        raise Http404

    if request.method == 'GET':
        serializer = TaskSerializer(task)

        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = TaskSerializer(instance=task, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        task.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)






