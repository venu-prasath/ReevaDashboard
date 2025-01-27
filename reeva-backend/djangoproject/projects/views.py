from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from .models import Projects
from djangoapp.models import User
from .serializers import ProjectsSerializer
from django.shortcuts import get_object_or_404

#get all projects
@api_view(['GET'])
def get_all_projects(request):
    try:
        projects = Projects.objects.all()
        serializer = ProjectsSerializer(projects, many=True)
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get all projects for a user
@api_view(['GET'])
def get_projects_by_user(request):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(clerk_id=clerk_id)
        projects = user.projects.all()
        serializer = ProjectsSerializer(projects, many=True)
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get project by id
@api_view(['GET'])
def get_project_by_id(request, id):
    try:
        project = Projects.objects.get(id=id)
        serializer = ProjectsSerializer(project, many=False)
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#create project
@api_view(['POST'])
def create_project(request):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['clerk_id'] = clerk_id
        serializer = ProjectsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)


#update project
@api_view(['PUT'])
def update_project(request, id):
    try:
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)

        project = get_object_or_404(Projects, id=id)
        if project.owner.clerk_id != clerk_id:
            return JsonResponse({
                'error': 'You do not have permission to modify this project.'
            },
            status=status.HTTP_403_FORBIDDEN)

        data = request.data
        data['clerk_id'] = clerk_id
        serializer = ProjectsSerializer(instance=project, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#delete project
@api_view(['DELETE'])
def delete_project(request, id):
    try:
        project = Projects.objects.get(id=id)
        clerk_id = request.headers.get('x-clerk-id')
        if(clerk_id is None):
            return JsonResponse({
                'error': 'clerk_id is required'
            },
            status=status.HTTP_400_BAD_REQUEST)
        
        project = get_object_or_404(Projects, id=id)
        if project.owner.clerk_id != clerk_id:
            return JsonResponse({
                'error': 'You do not have permission to modify this project.'
            },
            status=status.HTTP_403_FORBIDDEN)

        project.delete()
        return JsonResponse({'message':'Project deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)