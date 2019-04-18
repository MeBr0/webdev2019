from django.urls import path

from . import views

urlpatterns = [
    path('', views.complaints),
    path('<int:complaint_id>/', views.complaint_by_id),
    path('<int:complaint_id>/comment', views.comments)
]