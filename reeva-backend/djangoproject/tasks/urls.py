from django.urls import path
from . import views

urlpatterns = [
    path('all', views.get_all_tasks),
    path('create', views.create_task),
    path('<str:id>', views.get_task_by_id),
    path('', views.get_tasks_by_user),
    path('project/<str:id>', views.get_tasks_by_project),
    path('<str:id>/update', views.update_task),
    path('<str:id>/delete', views.delete_task),
]