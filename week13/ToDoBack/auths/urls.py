from django.urls import path

from .view import login, logout, UsersView


urlpatterns = [
    path('login/', login),
    path('logout/', logout),
    path('all/', UsersView.as_view())
]
