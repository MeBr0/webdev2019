from django.http import JsonResponse
from django.views import View

from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import json


class TaskListsView(View):

    @method_decorator(csrf_exempt)  # for 403 not occured
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        t_lists = TaskList.objects.all()

        serializer = TaskListSerializer(t_lists, many=True)

        return JsonResponse(serializer.data, safe=False, status=200)


    def post(self, request):
        data = json.loads(request.body)

        serializer = TaskListSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=201)
        
        return JsonResponse(serializer.errors)


class TaskListView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    
    def get(self, request, pk):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        serializer = TaskListSerializer(t_list)

        return JsonResponse(serializer.data, status=200)


    def put(self, request, pk):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        data = json.loads(request.body)

        # print(t_list)
        # print(data)

        serializer = TaskListSerializer(instance=t_list, data=data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=200)

        return JsonResponse(serializer.errors)


    def delete(self, request, pk):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        t_list.delete()

        return JsonResponse({}, status=204)


class TasksView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    
    def get(self, request, pk):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        tasks = t_list.task_set.all()

        serializer = TaskSerializer(tasks, many=True)

        return JsonResponse(serializer.data, safe=False, status=200)

class TaskView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


    def put(self, request, pk, pk2):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        try:
            t = Task.objects.get(id=pk2)
        except Task.DoesNotExist as e:
            return JsonResponse({'error': e})

        data = json.loads(request.body)

        if t in t_list.task_set.all():
            serializer = TaskSerializer(instance=t, data=data)

            if serializer.is_valid():
                serializer.save()

                return JsonResponse(serializer.data, status=200)

            return JsonResponse(serializer.errors)

        return JsonResponse({'error': 'task not found in tasklist'})


    def delete(self, request, pk, pk2):
        try:
            t_list = TaskList.objects.get(id=pk)
        except TaskList.DoesNotExist as e:
            return JsonResponse({'error': e})

        try:
            t = Task.objects.get(id=pk2)
        except Task.DoesNotExist as e:
            return JsonResponse({'error': e})

        if t in t_list.task_set.all():
            t.delete()

            return JsonResponse({}, status=204)

        return JsonResponse({'error': 'task not found in tasklist'})



