from django.urls import path
from api.views import TaskListsView, TaskListView, TasksView
from api import views

urlpatterns = [
    path('task_lists/', TaskListsView.as_view()),
    path('task_lists/<int:pk>/', TaskListView.as_view()),
    path('task_lists/<int:pk>/tasks/', TasksView.as_view())
]
