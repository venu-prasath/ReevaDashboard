from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from tasks.models import Tasks
from projects.models import Projects
from djangoapp.models import User
from .serializers import TasksSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

#get all tasks
@api_view(['GET'])
def get_all_tasks(request):
    try:
        tasks = Tasks.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get all tasks for a user
@api_view(['GET'])
def get_tasks_by_user(request):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(clerk_id=clerk_id)
        tasks = Tasks.objects.filter(assignee=user)
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get tasks by project
@api_view(['GET'])
def get_tasks_by_project(request, id):
    try:
        project = Projects.objects.get(id=id)
        tasks = project.tasks.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get task by id
@api_view(['GET'])
def get_task_by_id(request, id):
    try:
        task = Tasks.objects.get(id=id)
        serializer = TasksSerializer(task, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#create task
@api_view(['POST'])
def create_task(request):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['clerk_id'] = clerk_id
        serializer = TasksSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#update task
@api_view(['PUT'])
def update_task(request, id):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        task = get_object_or_404(Tasks, id=id)
        if task.assignee.clerk_id != clerk_id:
            return JsonResponse({
                'error': 'You do not have permission to modify this task.'
            },
            status=status.HTTP_403_FORBIDDEN)

        data = request.data
        data['clerk_id'] = clerk_id
        serializer = TasksSerializer(instance=task, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#delete task
@api_view(['DELETE'])
def delete_task(request, id):
    try:
        task = Tasks.objects.get(id=id)

        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)
        
        task = get_object_or_404(Tasks, id=id)
        if task.assignee.clerk_id != clerk_id:
            return JsonResponse({
                'error': 'You do not have permission to modify this task.'
            },
            status=status.HTTP_403_FORBIDDEN)

        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

