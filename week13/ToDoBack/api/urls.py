from django.urls import path

from api.view import TaskListsView, TaskListView
from api.view import TasksView, TaskView

urlpatterns = [
    path('task_lists/', TaskListsView.as_view()),
    path('task_lists/<int:pk>/', TaskListView.as_view()),
    path('task_lists/<int:pk>/tasks/', TasksView.as_view()),
    path('task_lists/<int:pk2>/tasks/<int:pk>/', TaskView.as_view())
]
