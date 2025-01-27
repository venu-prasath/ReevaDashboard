from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer

#get all users
@api_view(['GET'])
def get_all_users(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#get user by id
@api_view(['GET'])
def get_user_by_id(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#create user
@api_view(['POST'])
def create_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)

#update user
@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        },
        status=status.HTTP_400_BAD_REQUEST)
    
#delete user
@api_view(['DELETE'])
def delete_user(request, id):
    user = User.objects.get(id=id)
    user.delete()
    return JsonResponse({'message': 'User deleted'})

