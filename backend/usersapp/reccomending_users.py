import json
from usersapp.weighted_model import process_json_data
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from usersapp.utils import get_username_from_token
from usersapp.models import User, UserDetails

def get_top_five_users(request):
    if request.method == 'GET':
            print("Hello")
        
            auth_header = request.headers.get('Authorization')

            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({"error": "Token not provided or incorrect format"}, status=status.HTTP_400_BAD_REQUEST)

            token = auth_header.split(' ')[1]  # Get the token part after 'Bearer'

            username_or_error = get_username_from_token(token)

            if isinstance(username_or_error, dict):  # Check if it's an error dictionary
                return JsonResponse(username_or_error, status=status.HTTP_400_BAD_REQUEST)

            username = username_or_error
            user_enrollment = username
            users = User.objects.all()
            print("hello")

            # Convert user data into JSON format
            user_data=[]
            for user in users:
                user_details = UserDetails.objects.filter(user=user).first()
                if user_details:
                    user_json = {
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
                    'have_dated': user_details.haveDated,
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
                    'LDR_willingness': user_details.LDR_willingness, # Include the absolute URL
                        # Add other fields as needed
                    }
                    user_data.append(user_json)

            # return JsonResponse(user_data,safe=False, status=200)   
            # Pass the JSON data to the process_json_data function
            result = process_json_data(json_data=user_data,username=username)
            if isinstance(result, str):
                result = result.split(",") 
            print("result",result)
            user_details_list = []
            for username in result:
                print(username)
                if(username == user_enrollment):
                    continue
                user = User.objects.filter(username=username).first()
                if user:
                    user_details = UserDetails.objects.filter(user=user).first()
                    
                    if user_details:
                        profile_picture_url = request.build_absolute_uri(user_details.profilePicture.url) if user_details.profilePicture else None
                        user_json = {
                            'email': user.email,
                            'username': user.username,
                            'name': user_details.name,
                            'superhero_name': user_details.superhero_name,
                            'sexuality': user_details.sexuality,
                            'gender': user_details.gender,
                            'LDR_willingness': user_details.LDR_willingness,
                            'profilePicture': profile_picture_url,
                            # Add other fields you want to include
                        }
                        user_details_list.append(user_json)

            # Return the user details as a JSON response
            return JsonResponse(user_details_list, safe=False, status=200)

        # If method is not GET, return a method not allowed response
    return JsonResponse({"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
                
        
        

        