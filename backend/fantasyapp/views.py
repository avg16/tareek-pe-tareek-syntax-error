from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Fantasy
from .serializers import FantasySerializer
import pandas as pd
import os
from django.conf import settings


# GET, POST, PATCH, DELETE class-based view using generics
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Fantasy
from .serializers import FantasySerializer

# Fantasy Detail View
class FantasyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fantasy.objects.all()  # Queryset for Fantasy objects
    serializer_class = FantasySerializer  # Serializer class for Fantasy# Require authentication for access

    # Override to customize post method for creating a new Fantasy object
    def post(self, request, *args, **kwargs):
        # Extract the data from the request
        data = request.data
        data['user'] = request.user.id  # Assign the user ID to the data
        
        # Create the Fantasy object
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            fantasy = serializer.save()  # Save the Fantasy object
            
            # Return the data with username instead of user ID
            response_data = serializer.data
            response_data['username'] = request.user.username  # Add username to the response
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# List and create Fantasy view
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Fantasy
from .serializers import FantasySerializer

# List and create Fantasy view
class FantasyListView(generics.ListCreateAPIView):
    queryset = Fantasy.objects.all()
    serializer_class = FantasySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Create a list of dictionaries to hold the response data
        response_data = []
        for fantasy in queryset:
            fantasy_data = FantasySerializer(fantasy).data  # Serialize the fantasy
            fantasy_data['username'] = fantasy.user.username  # Add the username
            response_data.append(fantasy_data)

        return Response(response_data, status=status.HTTP_200_OK)

    # Override to customize the create method
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Fantasy
from usersapp.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from usersapp.utils import get_username_from_token


@api_view(['POST'])
def add_fantasy(request):
    if request.method == 'POST':
        # Extracting data from the request

        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)
        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        user = get_object_or_404(User, username=username)

        title = request.data.get('title')
        description = request.data.get('description')

        csv_file_path = os.path.join(settings.BASE_DIR, 'profanity_en.csv')

        # Read the CSV file
        cw_df = pd.read_csv(csv_file_path)
        cuss_words = cw_df['text'].to_list()
        for word in description.split(" "):
            print(word)
            if word.lower() in cuss_words:
                description = description.replace(word, '*' * len(word))
                print(f"Profane word found: {word}")
    
        


        anonymous = request.data.get('anonymous', False)
        print(anonymous)  # Default to False
        likes = 0  # Starting likes count # Get the authenticated user

        # Ensure that the title and description are provided
        if not title or not description:
            return Response({'error': 'Title and description are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new Fantasy object
        fantasy = Fantasy(
            title=title,
            description=description,
            anonymous=anonymous,
            likes=likes,
            user=user
        )

        # Save the Fantasy object to the database
        fantasy.save()

        # Return a success response
        return Response({'message': 'Fantasy created successfully!', 'fantasy_id': fantasy.id}, status=status.HTTP_201_CREATED)


from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Fantasy
from django.views.decorators.http import require_http_methods

@api_view(['DELETE'])
def delete_fantasy(request, unique_name):
    # Get the fantasy by its unique_name
    fantasy = get_object_or_404(Fantasy, unique_name=unique_name)

    # Delete the fantasy
    fantasy.delete()

    # Return a success response
    return JsonResponse({"message": "Fantasy deleted successfully."}, status=200)