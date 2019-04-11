from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer

import json

@csrf_exempt
def task_lists(request):
    if request.method == 'GET':
        t_lists = TaskList.objects.all()

        serializer = TaskListSerializer(t_lists, many=True)

        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'POST':        
        data = json.loads(request.body)

        serializer = TaskListSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=201)
        
        return JsonResponse(serializer.errors)


@csrf_exempt
def task_list(request, pk):
    try:
        t_list = TaskList.objects.get(id=pk)
        print(t_list)

    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': e})

    print(request.method)

    if request.method == 'GET':
        # print('get')
        serializer = TaskListSerializer(t_list)

        return JsonResponse(serializer.data, status=200)

    elif request.method == 'PUT':
        data = json.loads(request.body)

        # print(t_list)
        # print(data)

        serializer = TaskListSerializer(instance=t_list, data=data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors)

    elif request.method == 'DELETE':
        # print('delete')

        t_list.delete()

        return JsonResponse({}, status=204)


@csrf_exempt
def tasks(request, pk): 
    try:
        t_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': e})

    if request.method == 'GET':
        tasks = t_list.task_set.all()

        serializer = TaskSerializer(tasks, many=True)

        return JsonResponse(serializer.data, safe=False, status=200)

    elif request.method == 'POST':
        pass
