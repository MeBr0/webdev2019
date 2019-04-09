from django.http import JsonResponse
from .models import TaskList


def task_lists(request):
    t_lists = TaskList.objects.all()

    json_data = [task_list.to_json() for task_list in t_lists]

    return JsonResponse(json_data, safe=False)


def task_list(request, pk):
    try:
        t_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': e})

    return JsonResponse(t_list.to_json())


def tasks(request, pk):
    try:
        t_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': e})

    tasks = t_list.task_set.all()
    json_data = [task.to_json() for task in tasks]

    return JsonResponse(json_data, safe=False)
