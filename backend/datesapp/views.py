from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import DateRequest
from usersapp.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from usersapp.utils import get_username_from_token
from django.utils import timezone
import re  # For regex operations
from rest_framework import status

@csrf_exempt  # Use this only if you are not using CSRF tokens; otherwise, consider using CSRF protection
def make_date_request(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)

        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        proposer = User.objects.filter(username=username).first()
        proposed_username = data.get('proposed')
        description = data.get('description')
        time = data.get('time')

        # Format the time into a string that can be part of the unique name
        # Assuming 'time' is in ISO format, like "2024-10-20T15:00"
        formatted_time = timezone.datetime.fromisoformat(time).strftime("%Y%m%d%H%M")

        # Create the unique_name using proposer name and formatted time
        unique_name = f"{proposer.username}_{formatted_time}"

        # Fetch user
        proposed = get_object_or_404(User, username=proposed_username)

        # Check for existing requests
        existing_requests = DateRequest.objects.filter(proposer=proposer, proposed=proposed)

        if existing_requests.count() >= 3:
            return JsonResponse({'error': 'Cannot create more than three requests between the same users.'}, status=400)

        # Create the DateRequest
        date_request = DateRequest.objects.create(
            proposer=proposer,
            proposed=proposed,
            description=description,
            time=time,
            unique_name=unique_name,
            status="not_answered",
        )

        return JsonResponse({'success': 'Date request created successfully.', 'id': date_request.id}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

def list_to_date_requests(request):
    if request.method == 'GET':
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)
        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        proposer = get_object_or_404(User, username=username)

        # Fetch only the DateRequests with status 'not_answered'
        date_requests = DateRequest.objects.filter(proposer=proposer, status='not_answered')

        # Serialize the data to return
        response_data = [
            {
                'id': date_request.id,
                'proposer': date_request.proposer.username,
                'proposed': date_request.proposed.username,
                'description': date_request.description,
                'time': date_request.time,
                'unique_name': date_request.unique_name,
                'status': date_request.status
            }
            for date_request in date_requests
        ]

        return JsonResponse({'date_requests': response_data}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)



def list_from_date_requests(request):
    if request.method == 'GET':
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)
        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        proposed = get_object_or_404(User, username=username)

        # Fetch only the DateRequests with status 'not_answered'
        date_requests = DateRequest.objects.filter(proposed=proposed, status='not_answered')

        # Serialize the data to return
        response_data = [
            {
                'id': date_request.id,
                'proposer': date_request.proposer.username,
                'proposed': date_request.proposed.username,
                'description': date_request.description,
                'time': date_request.time,
                'unique_name': date_request.unique_name,
                'status': date_request.status
            }
            for date_request in date_requests
        ]

        return JsonResponse({'date_requests': response_data}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)


def list_answered_to_date_requests(request):
    if request.method == 'GET':
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)
        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        proposer = get_object_or_404(User, username=username)

        # Fetch only the DateRequests with status 'answered'
        date_requests = DateRequest.objects.filter(proposer=proposer).exclude(status='not_answered')

        # Serialize the data to return
        response_data = [
            {
                'id': date_request.id,
                'proposer': date_request.proposer.username,
                'proposed': date_request.proposed.username,
                'description': date_request.description,
                'time': date_request.time,
                'unique_name': date_request.unique_name,
                'status': date_request.status
            }
            for date_request in date_requests
        ]

        return JsonResponse({'date_requests': response_data}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)


def list_answered_from_date_requests(request):
    if request.method == 'GET':
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer '

        username_or_error = get_username_from_token(token)
        if isinstance(username_or_error, dict):  # Check if it's an error dictionary
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

        username = username_or_error
        proposer = get_object_or_404(User, username=username)

        # Fetch only the DateRequests with status 'answered'
        date_requests = DateRequest.objects.filter(proposer=proposer).exclude(status='not_answered')

        # Serialize the data to return
        response_data = [
            {
                'id': date_request.id,
                'proposer': date_request.proposer.username,
                'proposed': date_request.proposed.username,
                'description': date_request.description,
                'time': date_request.time,
                'unique_name': date_request.unique_name,
                'status': date_request.status
            }
            for date_request in date_requests
        ]

        return JsonResponse({'date_requests': response_data}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)
