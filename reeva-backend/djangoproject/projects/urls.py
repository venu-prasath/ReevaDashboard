from django.urls import path
from . import views

urlpatterns = [
    path('all', views.get_all_projects),
    path('create', views.create_project),
    path('', views.get_projects_by_user),
    path('<str:id>', views.get_project_by_id),
    path('<str:id>/update', views.update_project),
    path('<str:id>/delete', views.delete_project),
]