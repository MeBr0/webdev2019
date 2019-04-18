from django.urls import path

from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('<int:poll_id>/', views.get_poll),
    path('', views.polls_list),
]