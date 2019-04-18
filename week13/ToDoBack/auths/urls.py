from django.urls import path

from .view import login, logout, UsersView


urlpatterns = [
    path('', UsersView.as_view()),
    path('login/', login),
    path('logout/', logout),
]
