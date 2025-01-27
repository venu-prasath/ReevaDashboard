from rest_framework import serializers
from .models import Projects
from djangoapp.models import User

class ProjectsSerializer(serializers.ModelSerializer):
    clerk_id = serializers.CharField(write_only=True)

    class Meta:
        model = Projects
        fields = '__all__'
        read_only_fields = ['owner']

    def validate_clerk_id(self, value):
        try:
            user = User.objects.get(clerk_id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError('User with this clerk_id does not exist.')
        return user

    def create(self, validated_data):
        user = validated_data.pop('clerk_id')
        project = Projects.objects.create(owner=user, **validated_data)
        return project