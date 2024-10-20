import csv
from django.core.management.base import BaseCommand
from usersapp.models import User, UserDetails

class Command(BaseCommand):
    help = 'Import users and their details from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The CSV file to import')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        with open(csv_file, newline='') as file:
            reader = csv.DictReader(file)

            for row in reader:
                # Create User
                user = User.objects.create_user(
                    email=row['email'],
                    password=row['password'],
                    username=row['username'],
                    full_name=row['full_name']
                )
                print(f"Created user: {user.username}")

                # Handle the otp field (if empty, set to None)
                otp_value = row.get('otp', None)
                if otp_value == '':
                    otp_value = None

                # Create UserDetails
                user_details = UserDetails.objects.create(
                    user=user,
                    name=row['full_name'],
                    superhero_name=row.get('superhero_name', ''),
                    profilePicture=row.get('profilePicture', ''),
                    preferred_age_range=row['preferred_age_range'],
                    sexuality=row['sexuality'],
                    gender=row['gender'],
                    city=row['city'],
                    pincode=row.get('pincode', ''),
                    otp=otp_value,  # Set to None if empty
                    education_level=row['education_level'],
                    preferred_occupation_1=row['preferred_occupation_1'],
                    preferred_occupation_2=row['preferred_occupation_2'],
                    preferred_occupation_3=row['preferred_occupation_3'],
                    income_level=row['income_level'],
                    curiosity_level=row['curiosity_level'],
                    organized_chaos=row['organized_chaos'],
                    social_butterfly=row['social_butterfly'],
                    team_player_vibes=row['team_player_vibes'],
                    chill_factor=row['chill_factor'],
                    adventure_seeker=row['adventure_seeker'],
                    perfectionist_mode=row['perfectionist_mode'],
                    party_starter=row['party_starter'],
                    harmony_seeker=row['harmony_seeker'],
                    mood_meter=row['mood_meter'],
                    haveDated=row['haveDated'] == 'True',
                    dating_status=row['dating_status'],
                    LDR_willingness=row['LDR_willingness'] == 'True',
                    hobby_1=row['hobby_1'],
                    hobby_2=row['hobby_2'],
                    hobby_3=row['hobby_3'],
                    movie_preference_1=row['movie_preference_1'],
                    movie_preference_2=row['movie_preference_2'],
                    movie_preference_3=row['movie_preference_3'],
                    song_preference_1=row['song_preference_1'],
                    song_preference_2=row['song_preference_2'],
                    song_preference_3=row['song_preference_3'],
                    celebrity_crush=row.get('celebrity_crush', ''),
                    favorite_webseries=row.get('favorite_webseries', ''),
                    dietary_preferences=row['dietary_preferences'],
                    pet_preferences=row['pet_preferences'],
                    fitness_preferences=row['fitness_preferences'],
                    smoking_habits=row['smoking_habits'],
                    alcohol_consumption=row['alcohol_consumption'],
                    hogwarts_house=row['hogwarts_house']
                )
                print(f"Created user details for: {user.username}")

        self.stdout.write(self.style.SUCCESS('Successfully imported users'))
