from rest_framework import serializers
from .models import Fantasy

class FantasySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Fantasy
        fields = ['id', 'title', 'description', 'anonymous', 'likes', 'color', 'unique_name', 'time_added', 'username']

