from rest_framework import serializers
from .models import Tasks
from projects.models import Projects
from djangoapp.models import User

class TasksSerializer(serializers.ModelSerializer):
    assignee_id = serializers.CharField(write_only=True)
    project_id = serializers.CharField(write_only=True)

    class Meta:
        model = Tasks
        fields = '__all__'
        read_only_fields = ['assignee', 'project']

    # def validate_assignee_id(self, value):
    #     try:
    #         user = User.objects.get(id=value)
    #     except User.DoesNotExist:
    #         raise serializers.ValidationError('User with this assignee_id does not exist.')
    #     return user

    def validate_project_id(self, value):
        try:
            project = Projects.objects.get(id=value)
        except Projects.DoesNotExist:
            raise serializers.ValidationError('Project with this id does not exist.')
        return project

    def create(self, validated_data):
        # assignee = validated_data.pop('assignee_id')
        project = validated_data.pop('project_id')
        task = Tasks.objects.create(project=project, **validated_data)
        return task