from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import DateRequest

@api_view(['POST'])
def respond_to_date_request(request):
    
    unique_name = request.data.get('unique_name')
    response = request.data.get('response')  # 'accepted' or 'rejected'

    try:
        # Find the DateRequest object by unique_name
        date_request = DateRequest.objects.get(unique_name=unique_name)
        
        # Update the status based on the response
        if response == 'accepted':
            date_request.status = 'answered'
        elif response == 'rejected':
            date_request.status = 'rejected'
        else:
            return Response({"error": "Invalid response"}, status=status.HTTP_400_BAD_REQUEST)
        
        date_request.save()

        return Response({"message": f"Date request {response} successfully!"}, status=status.HTTP_200_OK)
    
    except DateRequest.DoesNotExist:
        return Response({"error": "Date request not found"}, status=status.HTTP_404_NOT_FOUND)
