# views.py
from django.shortcuts import render
from django.http import JsonResponse
from usersapp.models import UserDetails, User, DatingHistory
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.response import Response
from usersapp.utils import get_username_from_token
from rest_framework import status

 # Assuming you have a util function to extract username

@csrf_exempt
def create_user_details(request):
    if request.method == 'POST':
        try:
            auth_header = request.headers.get('Authorization')

            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

            token = auth_header.split(' ')[1]  # Get the token part after 'Bearer'
            print("token", token)
            username_or_error = get_username_from_token(token)
   

            if isinstance(username_or_error, dict):  # Check if it's an error dictionary
                return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)
     
            username = username_or_error

            # Fetch the user from the token
            user = User.objects.filter(username=username).first()  # Assuming the user already exists

            if not user:
                return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            # Extract form data (now from request.POST instead of json)
            print(request.POST)
            print(user.username)
          
            name = request.POST.get('name')
            superhero_name = request.POST.get('superhero_name')
            preferred_age_range = request.POST.get('preferred_age_range')
            sexuality = request.POST.get('sexuality')
            gender = request.POST.get('gender')
            city = request.POST.get('city')
            pincode = request.POST.get('pincode')
            education_level = request.POST.get('education_level')
            print(education_level)
            preferred_occupation_1 = request.POST.get('preferred_occupation_1')
            preferred_occupation_2 = request.POST.get('preferred_occupation_2')
            preferred_occupation_3 = request.POST.get('preferred_occupation_3')

            income_level = request.POST.get('income_level')

            curiosity_level = request.POST.get('curiosity_level', 5)
            organized_chaos = request.POST.get('organized_chaos', 5)
            social_butterfly = request.POST.get('social_butterfly', 5)
            team_player_vibes = request.POST.get('team_player_vibes', 5)
            chill_factor = request.POST.get('chill_factor', 5)
            adventure_seeker = request.POST.get('adventure_seeker', 5)
            perfectionist_mode = request.POST.get('perfectionist_mode', 5)
            party_starter = request.POST.get('party_starter', 5)
            harmony_seeker = request.POST.get('harmony_seeker', 5)
            mood_meter = request.POST.get('mood_meter', 5)

            haveDated = request.POST.get('haveDated', False)
            dating_status = request.POST.get('dating_status', "single")

            hobby_1 = request.POST.get('hobby_1')
            hobby_2 = request.POST.get('hobby_2')
            hobby_3 = request.POST.get('hobby_3')

            movie_preference_1 = request.POST.get('movie_preference_1')
            movie_preference_2 = request.POST.get('movie_preference_2')
            movie_preference_3 = request.POST.get('movie_preference_3')

            song_preference_1 = request.POST.get('song_preference_1')
            song_preference_2 = request.POST.get('song_preference_2')
            song_preference_3 = request.POST.get('song_preference_3')

            celebrity_crush = request.POST.get('celebrity_crush')
            favorite_webseries = request.POST.get('favorite_webseries', "Peaky Blinders")

            dietary_preferences = request.POST.get('dietary_preferences')
            pet_preferences = request.POST.get('pet_preferences')
            fitness_preferences = request.POST.get('fitness_preferences')
            smoking_habits = request.POST.get('smoking_habits')
            alcohol_consumption = request.POST.get('alcohol_consumption')
            hogwarts_house = request.POST.get('hogwarts_house', 'Gryffindor')
            haveDated = request.POST.get('haveDated', 'False').lower() == 'true'
            LDR_willingness = request.POST.get('ldr_willingness', 'False').lower() == 'true'

            


            # Handle the profile picture file
            profile_picture = request.FILES.get('profile_picture')
            print(profile_picture)

            # Create the UserDetails object
            user_details = UserDetails.objects.create(
                user=user,
                name=name,
                superhero_name=superhero_name,
                preferred_age_range=preferred_age_range,
                sexuality=sexuality,
                gender=gender,
                city=city,
                pincode=pincode,
                education_level=education_level,
                preferred_occupation_1=preferred_occupation_1,
                preferred_occupation_2=preferred_occupation_2,
                preferred_occupation_3=preferred_occupation_3,
                income_level=income_level,
                curiosity_level=curiosity_level,
                organized_chaos=organized_chaos,
                social_butterfly=social_butterfly,
                team_player_vibes=team_player_vibes,
                chill_factor=chill_factor,
                adventure_seeker=adventure_seeker,
                perfectionist_mode=perfectionist_mode,
                party_starter=party_starter,
                harmony_seeker=harmony_seeker,
                mood_meter=mood_meter,
                haveDated=haveDated,
                dating_status=dating_status,
                hobby_1=hobby_1,
                hobby_2=hobby_2,
                hobby_3=hobby_3,
                movie_preference_1=movie_preference_1,
                movie_preference_2=movie_preference_2,
                movie_preference_3=movie_preference_3,
                song_preference_1=song_preference_1,
                song_preference_2=song_preference_2,
                song_preference_3=song_preference_3,
                celebrity_crush=celebrity_crush,
                favorite_webseries=favorite_webseries,
                dietary_preferences=dietary_preferences,
                pet_preferences=pet_preferences,
                fitness_preferences=fitness_preferences,
                smoking_habits=smoking_habits,
                alcohol_consumption=alcohol_consumption,
                hogwarts_house=hogwarts_house,
                LDR_willingness=LDR_willingness,
                profilePicture=profile_picture,  # Save the profile picture
            )

            return JsonResponse({'message': 'UserDetails created successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



from django.shortcuts import get_object_or_404
from usersapp.models import User, UserDetails

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

def user_details_exists(request):
    try:
        auth_header = request.headers.get('Authorization')

        # Check for Authorization header
        if not auth_header or not auth_header.startswith('Bearer '):
            return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract the token from the Authorization header
        token = auth_header.split(' ')[1]  # Get the token part after 'Bearer'
        print("token", token)

        # Get the username from the token
        username_or_error = get_username_from_token(token)
        
        # Check if the result is an error dictionary
        if isinstance(username_or_error, dict):  
            return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)
        
        username = username_or_error
        
        # Retrieve the user by username
        user = get_object_or_404(User, username=username)
        
        # Check if UserDetails exists for the retrieved user
        exists = UserDetails.objects.filter(user=user).exists()
        
        return JsonResponse({"exists": exists}, status=status.HTTP_200_OK)  # Return the existence status

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # Handle any unexpected errors

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework import status

@csrf_exempt
def get_user_details(request):
    if request.method == 'GET':
        try:
            # Extract the Authorization header
            auth_header = request.headers.get('Authorization')

            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

            # Extract token from the header
            token = auth_header.split(' ')[1]
            username_or_error = get_username_from_token(token)

            # Check for error in getting username
            if isinstance(username_or_error, dict):  # Check if it's an error dictionary
                return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

            username = username_or_error

            # Fetch the user and associated UserDetails
            user = User.objects.filter(username=username).first()

            if not user:
                return JsonResponse({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            # Fetch user details
            user_details = UserDetails.objects.filter(user=user).first()

            if not user_details:
                return JsonResponse({'error': 'UserDetails not found'}, status=status.HTTP_404_NOT_FOUND)

            # Build the absolute URL for the profile picture
            profile_picture_url = request.build_absolute_uri(user_details.profilePicture.url) if user_details.profilePicture else None

            # Prepare the user details data to be returned as JSON
            user_details_data = {
                'email': user.email,
                'username': user.username,
                'name': user_details.name,
                'superhero_name': user_details.superhero_name,
                'preferred_age_range': user_details.preferred_age_range,
                'sexuality': user_details.sexuality,
                'gender': user_details.gender,
                'city': user_details.city,
                'pincode': user_details.pincode,
                'education_level': user_details.education_level,
                'preferred_occupation_1': user_details.preferred_occupation_1,
                'preferred_occupation_2': user_details.preferred_occupation_2,
                'preferred_occupation_3': user_details.preferred_occupation_3,
                'income_level': user_details.income_level,
                'curiosity_level': user_details.curiosity_level,
                'organized_chaos': user_details.organized_chaos,
                'social_butterfly': user_details.social_butterfly,
                'team_player_vibes': user_details.team_player_vibes,
                'chill_factor': user_details.chill_factor,
                'adventure_seeker': user_details.adventure_seeker,
                'perfectionist_mode': user_details.perfectionist_mode,
                'party_starter': user_details.party_starter,
                'harmony_seeker': user_details.harmony_seeker,
                'mood_meter': user_details.mood_meter,
                'haveDated': user_details.haveDated,
                'dating_status': user_details.dating_status,
                'hobby_1': user_details.hobby_1,
                'hobby_2': user_details.hobby_2,
                'hobby_3': user_details.hobby_3,
                'movie_preference_1': user_details.movie_preference_1,
                'movie_preference_2': user_details.movie_preference_2,
                'movie_preference_3': user_details.movie_preference_3,
                'song_preference_1': user_details.song_preference_1,
                'song_preference_2': user_details.song_preference_2,
                'song_preference_3': user_details.song_preference_3,
                'celebrity_crush': user_details.celebrity_crush,
                'favorite_webseries': user_details.favorite_webseries,
                'dietary_preferences': user_details.dietary_preferences,
                'pet_preferences': user_details.pet_preferences,
                'fitness_preferences': user_details.fitness_preferences,
                'smoking_habits': user_details.smoking_habits,
                'alcohol_consumption': user_details.alcohol_consumption,
                'hogwarts_house': user_details.hogwarts_house,
                'LDR_willingness': user_details.LDR_willingness,
                'profilePicture': profile_picture_url,  # Include the absolute URL
            }

            # Return the data as JSON response
            return JsonResponse(user_details_data, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_all_user_details(request):
    if request.method == 'GET':
        try:
            auth_header = request.headers.get('Authorization')

            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

            token = auth_header.split(' ')[1]  # Get the token part after 'Bearer'

            username_or_error = get_username_from_token(token)

            if isinstance(username_or_error, dict):  # Check if it's an error dictionary
                return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

            username = username_or_error
            current = User.objects.filter(username=username).first()
            users = User.objects.all()

            # # Prepare a list to hold the user details data
            all_user_details = []

            # Iterate through all users and their details
            for user in users:
                if(user == current):
                    continue
                # Fetch the user details for the current user
                user_details = UserDetails.objects.filter(user=user).first()

                # Skip if no UserDetails found for the user
                if not user_details:
                    continue

                # Build the absolute URL for the profile picture
                profile_picture_url = request.build_absolute_uri(user_details.profilePicture.url) if user_details.profilePicture else None

                # Prepare the user details data for the current user
                user_details_data = {
                    'email': user.email,
                    'username': user.username,
                    'name': user_details.name,
                    'superhero_name': user_details.superhero_name,
                    'preferred_age_range': user_details.preferred_age_range,
                    'sexuality': user_details.sexuality,
                    'gender': user_details.gender,
                    'city': user_details.city,
                    'pincode': user_details.pincode,
                    'education_level': user_details.education_level,
                    'preferred_occupation_1': user_details.preferred_occupation_1,
                    'preferred_occupation_2': user_details.preferred_occupation_2,
                    'preferred_occupation_3': user_details.preferred_occupation_3,
                    'income_level': user_details.income_level,
                    'curiosity_level': user_details.curiosity_level,
                    'organized_chaos': user_details.organized_chaos,
                    'social_butterfly': user_details.social_butterfly,
                    'team_player_vibes': user_details.team_player_vibes,
                    'chill_factor': user_details.chill_factor,
                    'adventure_seeker': user_details.adventure_seeker,
                    'perfectionist_mode': user_details.perfectionist_mode,
                    'party_starter': user_details.party_starter,
                    'harmony_seeker': user_details.harmony_seeker,
                    'mood_meter': user_details.mood_meter,
                    'haveDated': user_details.haveDated,
                    'dating_status': user_details.dating_status,
                    'hobby_1': user_details.hobby_1,
                    'hobby_2': user_details.hobby_2,
                    'hobby_3': user_details.hobby_3,
                    'movie_preference_1': user_details.movie_preference_1,
                    'movie_preference_2': user_details.movie_preference_2,
                    'movie_preference_3': user_details.movie_preference_3,
                    'song_preference_1': user_details.song_preference_1,
                    'song_preference_2': user_details.song_preference_2,
                    'song_preference_3': user_details.song_preference_3,
                    'celebrity_crush': user_details.celebrity_crush,
                    'favorite_webseries': user_details.favorite_webseries,
                    'dietary_preferences': user_details.dietary_preferences,
                    'pet_preferences': user_details.pet_preferences,
                    'fitness_preferences': user_details.fitness_preferences,
                    'smoking_habits': user_details.smoking_habits,
                    'alcohol_consumption': user_details.alcohol_consumption,
                    'hogwarts_house': user_details.hogwarts_house,
                    'LDR_willingness': user_details.LDR_willingness,
                    'profilePicture': profile_picture_url,  # Include the absolute URL
                }

                # Append the current user's details to the list
                all_user_details.append(user_details_data)

            # Return the list of all user details as JSON response
            return JsonResponse(all_user_details, safe=False, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
