from django.urls import path
from . import views


urlpatterns = [
    path('', views.TaskListAPIView.as_view(), name='task-list'),
    path('create/', views.TaskCreateAPIView.as_view(), name='task-create'),
    path('<int:id>/', views.TaskDetailAPIView.as_view(), name='task-detail'),
    path('<int:id>/update/', views.TaskUpdateAPIView.as_view(), name='task-update'),
    path('<int:id>/delete/', views.TaskDeleteAPIView.as_view(), name='task-delete'),
]
