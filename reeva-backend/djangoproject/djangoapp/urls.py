from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_users),
    path('create', views.create_user),
    path('<str:id>', views.get_user_by_id),
    path('update/<str:id>', views.update_user),
    path('delete/<str:id>', views.delete_user)
]