from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from passlib.hash import pbkdf2_sha256
from django.utils import timezone

class CustomUserManager(UserManager):
    def _create_user(self, username, email, password, **extra_fields):
        if not username:
            return ValueError("You have not provided a valid email ID!")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, username=None, **extra_fields):
        extra_fields.setdefault('is_admin', False)
        return self._create_user(email=email, password=password, username=username, **extra_fields)

    def create_superuser(self, email=None, password=None, username=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        return self._create_user(email=email, password=password, username=username, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, default='')
    full_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return self.name


class UserDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    superhero_name = models.CharField(max_length=255)
    profilePicture = models.ImageField(upload_to='userProfile/',default="")

    # Preferences
    preferred_age_range = models.CharField(max_length=20, choices=[
        ('18-25', '18-25'), ('25-30', '25-30'), ('30-35', '30-35'),
        ('35-40', '35-40'), ('40-45', '40-45'), ('45+', '45+')
    ])
    sexuality = models.CharField(max_length=20, choices=[
        ('Straight', 'Straight'), ('Gay', 'Gay'), ('Bisexual', 'Bisexual'), ('Lesbian', 'Lesbian')
    ])
    gender = models.CharField(max_length=20, choices=[
        ('Male', 'Male'), ('Female', 'Female'),
    ])
    city = models.CharField(max_length=255)
    pincode = models.CharField(max_length=10,null=True,blank=True)
    otp = models.BigIntegerField(null=True,blank=True)
    education_level = models.CharField(max_length=50, choices=[
        ('High School', 'High School'), ('Bachelor’s', 'Bachelor’s'),
        ('Master’s', 'Master’s'), ('Doctorate', 'Doctorate')
    ])

    # Occupation preferences
    preferred_occupation_1 = models.CharField(max_length=100)
    preferred_occupation_2 = models.CharField(max_length=100)
    preferred_occupation_3 = models.CharField(max_length=100)

    # Income level
    income_level = models.CharField(max_length=50, choices=[
        ('Low income', '< 5,00,000 Rs'), ('Middle income', '5,00,000 - 20,00,000 Rs'),
        ('Upper-middle income', '20,00,000 - 50,00,000 Rs'), ('High income', '> 50,00,000 Rs')
    ])
     # Personality Traits (Fun Terms) with Integer Fields (0-100)
    curiosity_level = models.IntegerField(default=5)  # 0 = Not Curious, 10 = Very Curious
    organized_chaos = models.IntegerField(default=5)  # 0 = Super Relaxed, 10 = Perfectionist
    social_butterfly = models.IntegerField(default=5)  # 0 = Super Introverted, 10 = Super Extroverted
    team_player_vibes = models.IntegerField(default=5) # 0 = Competitive, 10 = Cooperative
    chill_factor = models.IntegerField(default=5)      # 0 = Always Anxious, 10 = Zen Master
    adventure_seeker = models.IntegerField(default=5)  # 0 = Stays Home, 10 = Thrill Seeker
    perfectionist_mode = models.IntegerField(default=5) # 0 = Go with the Flow, 10 = Super Detail-Oriented
    party_starter = models.IntegerField(default=5)     # 0 = Wallflower, 10 = Life of the Party
    harmony_seeker = models.IntegerField(default=5)    # 0 = Argumentative, 10 = Peacekeeper
    mood_meter = models.IntegerField(default=5) 
    haveDated = models.BooleanField(default=False)


    dating_status = models.CharField(default="single")
    LDR_willingness = models.BooleanField(default=False)
    # Hobbies
    hobby_1 = models.CharField(max_length=100)
    hobby_2 = models.CharField(max_length=100)
    hobby_3 = models.CharField(max_length=100)

    # Movie preferences
    movie_preference_1 = models.CharField(max_length=50)
    movie_preference_2 = models.CharField(max_length=50)
    movie_preference_3 = models.CharField(max_length=50)

    # Song preferences
    song_preference_1 = models.CharField(max_length=50,default="Indie")
    song_preference_2 = models.CharField(max_length=50,default="Indie")
    song_preference_3 = models.CharField(max_length=50,default="Indie")

    celebrity_crush = models.CharField(max_length=100,null=True,blank=True)
    favorite_webseries = models.CharField(max_length=100,null=True,blank=True)


    # Additional preferences
 
    dietary_preferences = models.CharField(max_length=20, choices=[
        ('Vegetarian', 'Vegetarian'), ('Non-Vegetarian', 'Non-Vegetarian'), ('Vegan', 'Vegan'), ('Other', 'Other')
    ],default="Vegan")
    pet_preferences = models.CharField(max_length=20, choices=[
        ('Likes pets', 'Likes pets'), ('No pets', 'No pets'), ('Allergic to pets', 'Allergic to pets')
    ],default="Allergic to pets")
    fitness_preferences = models.CharField(max_length=40, choices=[
        ('Gym', 'Gym'), ('Yoga', 'Yoga'), ('Running', 'Running'), ('No interest in fitness', 'No interest in fitness')
    ],default="Gym")
    smoking_habits = models.CharField(max_length=20, choices=[
        ('Smoker', 'Smoker'), ('Non-smoker', 'Non-smoker')
    ],default="Non-smoker")
    alcohol_consumption = models.CharField(max_length=20, choices=[
        ('Drinks regularly', 'Drinks regularly'), ('Occasionally', 'Occasionally'), ('Never', 'Never')
    ],default="Never")
    hogwarts_house = models.CharField(max_length=50, choices=[
        ('Gryffindor', 'Gryffindor'), 
        ('Hufflepuff', 'Hufflepuff'), 
        ('Ravenclaw', 'Ravenclaw'), 
        ('Slytherin', 'Slytherin')
    ], default="Gryffindor")

    # Password management


class DatingHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_offers = models.IntegerField(default=0)
    dates_went_on = models.IntegerField(default=0)
    users_selected = models.ManyToManyField(User, related_name='users_selected', blank=True)


