from django.contrib import admin
from api.models import TaskList, Task


@admin.register(TaskList)
class TaskListAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'due_on', 'status', 'task_list')
