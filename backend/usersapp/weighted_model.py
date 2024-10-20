import pandas as pd
import numpy as np
import json
from django.http import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

def process_json_data(json_data,username="miascott"):
    # Load JSON data into a pandas DataFrame
    df = pd.json_normalize(json_data)

    # Define mappings for categorical variables
    age_range_mapping = {
        '18-25': 1,
        '25-30': 2,
        '30-35': 3,
        '35-40': 4,
        '40-45': 5,
        '45+': 6
    }

    sexuality_mapping = {
        'Straight': 1,
        'Gay': 2,
        'Lesbian': 3,
        'Bisexual': 4,
    }

    income_level_mapping = {
        'Low income': 1,
        'Middle income': 2,
        'Upper-middle income': 3,
        'High income': 4
    }

    education_level_mapping = {
        'High School': 1,
        "Bachelor's": 2,
        "Master's": 3,
        'Doctorate': 4
    }

    dietary_pref = {
        'Vegetarian': 1,
        'Non-Vegetarian': 2,
        'Vegan': 3,
        'Other': 4
    }

    fitness_pref = {
        'Gym': 1,
        'Yoga': 2,
        'Running': 3,
        'No interest in fitness': 4
    }

    smoking_habits = {
        'Smoker': 0,
        'Non-smoker': 1
    }

    alcohol_consumption = {
        'Drinks regularly': 1,
        'Occasionally': 2,
        'Never': 3
    }

    preferred_occupation1 = {
        'Creative': 1,
        'Technical': 2,
        'Healthcare': 3,
        'Business': 4,
        'Education': 5,
        'Service': 6
    }

    preferred_occupation2 = {
        'Creative': 1,
        'Technical': 2,
        'Healthcare': 3,
        'Business': 4,
        'Education': 5,
        'Service': 6
    }

    preferred_occupation3 = {
        'Creative': 1,
        'Technical': 2,
        'Healthcare': 3,
        'Business': 4,
        'Education': 5,
        'Service': 6
    }

    hobby1 = {
        'Outdoor Activities': 1,
        'Artistic hobbies': 2,
        'Fitness': 3,
        'Reading': 4,
        'Gaming': 5,
        'Music': 6,
        'Travel': 7
    }

    hobby2 = {
        'Outdoor Activities': 1,
        'Artistic hobbies': 2,
        'Fitness': 3,
        'Reading': 4,
        'Gaming': 5,
        'Music': 6,
        'Travel': 7
    }

    hobby3 = {
        'Outdoor Activities': 1,
        'Artistic hobbies': 2,
        'Fitness': 3,
        'Reading': 4,
        'Gaming': 5,
        'Music': 6,
        'Travel': 7
    }

    movie_preference1 = {
        'Action': 1,
        'Comedy': 2,
        'Drama': 3,
        'Romance': 4,
        'Horror': 5,
        'Sci-Fi': 6,
        'Fantasy': 7,
        'Documentary': 8
    }

    movie_preference2 = {
        'Action': 1,
        'Comedy': 2,
        'Drama': 3,
        'Romance': 4,
        'Horror': 5,
        'Sci-Fi': 6,
        'Fantasy': 7,
        'Documentary': 8
    }

    movie_preference3 = {
        'Action': 1,
        'Comedy': 2,
        'Drama': 3,
        'Romance': 4,
        'Horror': 5,
        'Sci-Fi': 6,
        'Fantasy': 7,
        'Documentary': 8
    }

    song_preference1 = {
        'Pop': 1,
        'Rock': 2,
        'Classical': 3,
        'Hip Hop': 4,
        'Jazz': 5,
        'Country': 6,
        'Electronic': 7,
        'Indie': 8
    }

    song_preference2 = {
        'Pop': 1,
        'Rock': 2,
        'Classical': 3,
        'Hip Hop': 4,
        'Jazz': 5,
        'Country': 6,
        'Electronic': 7,
        'Indie': 8
    }

    song_preference3 = {
        'Pop': 1,
        'Rock': 2,
        'Classical': 3,
        'Hip Hop': 4,
        'Jazz': 5,
        'Country': 6,
        'Electronic': 7,
        'Indie': 8
    }

    gender = {
        'Male': 1,
        'Female': 0,
    }

    dating_status = {
        'Dating': 1,
        'Not Dating': 0
    }

    have_dated = {
        'Yes': 1,
        'No': 0
    }
    smoking_habits = {
        'Smoker': 0,
        'Non-smoker': 1
    }

    # Apply mappings to categorical variables
    df['smoking_habits'] = df['smoking_habits'].astype(str).str.strip().str.title().map(smoking_habits).fillna(1)
    print(df['smoking_habits'].value_counts())
    df['sexuality'] = df['sexuality'].str.strip().str.title().map(sexuality_mapping).fillna(df['sexuality'])
    df['preferred_age_range'] = df['preferred_age_range'].str.strip().map(age_range_mapping).fillna(df['preferred_age_range'])
    df['income_level'] = df['income_level'].str.strip().str.title().map(income_level_mapping).fillna(df['income_level'])
    df['education_level'] = df['education_level'].str.strip().str.title().map(education_level_mapping).fillna(df['education_level'])
    df['dietary_preferences'] = pd.to_numeric(df['dietary_preferences'].str.strip().str.title().map(dietary_pref), errors='coerce').fillna(0)
    df['fitness_preferences'] = pd.to_numeric(df['fitness_preferences'].astype(str).str.strip().str.title().map(fitness_pref), errors='coerce').fillna(0)
    df['alcohol_consumption'] = pd.to_numeric(df['alcohol_consumption'].astype(str).str.strip().str.title().map(alcohol_consumption), errors='coerce').fillna(0)
    df['preferred_occupation_1'] = df['preferred_occupation_1'].str.strip().str.title().map(preferred_occupation1).fillna(df['preferred_occupation_1'])
    df['preferred_occupation_2'] = df['preferred_occupation_2'].str.strip().str.title().map(preferred_occupation2).fillna(df['preferred_occupation_2'])
    df['preferred_occupation_3'] = df['preferred_occupation_3'].str.strip().str.title().map(preferred_occupation3).fillna(df['preferred_occupation_3'])
    df['hobby_1'] = df['hobby_1'].str.strip().str.title().map(hobby1).fillna(df['hobby_1'])
    df['hobby_2'] = df['hobby_2'].str.strip().str.title().map(hobby2).fillna(df['hobby_2'])
    df['hobby_3'] = df['hobby_3'].str.strip().str.title().map(hobby3).fillna(df['hobby_3'])
    df['smoking_habits'] = df['smoking_habits'].astype(str).str.strip().str.title().map(smoking_habits).fillna(df['smoking_habits'])
    df['movie_preference_1'] = df['movie_preference_1'].str.strip().str.title().map(movie_preference1).fillna(df['movie_preference_1'])
    df['movie_preference_2'] = df['movie_preference_2'].str.strip().str.title().map(movie_preference2).fillna(df['movie_preference_2'])
    df['movie_preference_3'] = df['movie_preference_3'].str.strip().str.title().map(movie_preference3).fillna(df['movie_preference_3'])
    df['song_preference_1'] = df['song_preference_1'].str.strip().str.title().map(song_preference1).fillna(df['song_preference_1'])
    df['song_preference_1'] = pd.to_numeric(df['song_preference_1'], errors='coerce')
    df['song_preference_2'] = df['song_preference_2'].str.strip().str.title().map(song_preference2).fillna(df['song_preference_2'])
    df['song_preference_2'] = pd.to_numeric(df['song_preference_2'], errors='coerce')
    df['song_preference_3'] = df['song_preference_3'].str.strip().str.title().map(song_preference3).fillna(df['song_preference_3'])
    df['song_preference_3'] = pd.to_numeric(df['song_preference_3'], errors='coerce')
    df['gender'] = df['gender'].str.strip().str.title().map(gender).fillna(df['gender'])
    df['dating_status'] = df['dating_status'].str.strip().str.title().map(dating_status).fillna(df['dating_status'])
    df['have_dated'] = df['have_dated'].astype(str).str.strip().str.title().map(have_dated).fillna(df['have_dated'])
    df['curiosity_level'] = pd.to_numeric(df['curiosity_level'], errors='coerce')
    df['curiosity_level'].fillna(0, inplace=True) 
    print("Refined numerical data")
    print(df)

    # Define the Metrics class
    class Metrics:
        def __init__(self, row):
            self.choice_score = 0
            self.row = row

        def preferences(self):
            education_level = self.row['education_level']
            print("educational_level", education_level)
            income_level = self.row['income_level']
            self.preference_metric =  (education_level * 0.0 + income_level * 0.5)
            return self.preference_metric

        def personality(self):
            curiosity_level = self.row['curiosity_level']
            organized_chaos = self.row['organized_chaos']
            social_butterfly = self.row['social_butterfly']
            team_player_vibes = self.row['team_player_vibes']
            self.personality_metric = (curiosity_level * 0.25 + organized_chaos * 0.2 +
                                       social_butterfly * 0.3 + team_player_vibes * 0.25)
            return self.personality_metric

        def lifestyle(self):
            chill_factor = self.row['chill_factor']
            adventure_seeker = self.row['adventure_seeker']
            perfectionist_mode = self.row['perfectionist_mode']
            party_starter = self.row['party_starter']
            harmony_seeker = self.row['harmony_seeker']
            self.lifestyle_metric = (chill_factor * 0.2 + adventure_seeker * 0.2 +
                                     perfectionist_mode * 0.15 + party_starter * 0.15 +
                                     harmony_seeker * 0.3)
            return self.lifestyle_metric

        def preferences_extended(self):
            dietary_preferences = self.row['dietary_preferences']
            pet_preferences = 0
            fitness_preferences = self.row['fitness_preferences']
            alcohol_consumption = self.row['alcohol_consumption']
            self.preferences_extended_metric = (dietary_preferences * 0.25 + pet_preferences * 0.25 +
                                                fitness_preferences * 0.25 + alcohol_consumption * 0.25)
            return self.preferences_extended_metric

        def occupation(self):
            preferred_occupation1 = self.row['preferred_occupation_1']
            preferred_occupation2 = self.row['preferred_occupation_2']
            preferred_occupation3 = self.row['preferred_occupation_3']
            self.occupation_metric = (preferred_occupation1 * 0.4 + preferred_occupation2 * 0.3 +
                                      preferred_occupation3 * 0.3)
            return self.occupation_metric

        def hobbies(self):
            hobby1 = self.row['hobby_1']
            hobby2 = self.row['hobby_2']
            hobby3 = self.row['hobby_3']
            self.hobby_metric = (0 * 0.4 + 0 * 0.3 + 0 * 0.3)
            return self.hobby_metric

        def entertainment(self):
            movie_preference1 = self.row['movie_preference_1']
            movie_preference2 = self.row['movie_preference_2']
            movie_preference3 = self.row['movie_preference_3']
            song_preference1 = self.row['song_preference_1']
            song_preference2 = self.row['song_preference_2']
            song_preference3 = self.row['song_preference_3']
            self.entertainment_metric = (movie_preference1 * 0.2 + movie_preference2 * 0.2 +
                                         movie_preference3 * 0.2 + song_preference1 * 0.1 +
                                         song_preference2 * 0.15 + song_preference3 * 0.15)
            return self.entertainment_metric

    # Define the sigmoid function
    def sigmoid(x):
        x = np.array(x, dtype=float)
        return 1 / (1 + np.exp(-x))

    # Define the calculate_risk_score function
    def calculate_risk_score(preference_metric, personality_metric, lifestyle_metric, preferences_extended_metric, occupation_metric, hobby_metric, entertainment_metric):
        risk_score = 0
        risk_score = preference_metric * 0.25 + personality_metric * 0.2 + lifestyle_metric * 0.2 + preferences_extended_metric * 0.15 + occupation_metric * 0.1 + entertainment_metric * 0.1
        recommended_score = 1 / (1 + np.exp(-risk_score))
        return recommended_score

    # Calculate scores for each user
    all_scores = []
    for _,row in df.iterrows():
        metrics = Metrics(row)
        preference_metric = 0
        personality_metric = sigmoid(metrics.personality())
        lifestyle_metric = sigmoid(metrics.lifestyle())
        preferences_extended_metric = sigmoid(metrics.preferences_extended())
        occupation_metric = sigmoid(metrics.occupation())
        hobby_metric = sigmoid(metrics.hobbies())
        entertainment_metric = sigmoid(metrics.entertainment())
        s = calculate_risk_score(preference_metric, personality_metric, lifestyle_metric, preferences_extended_metric, occupation_metric, hobby_metric, entertainment_metric)
        all_scores.append(s)

    df['scores'] = np.array(all_scores)

    # Define the find_top_matches function
    def find_top_matches(df, username):
        if username not in df['username'].values:
            return f"Username {username} not found in the DataFrame."

        # Get the target score for the username
        target_score = df.loc[df['username'] == username, 'scores'].values[0]

        # Calculate the score difference
        df['score_diff'] = abs(df['scores'] - target_score)

        # Find similar users
        similar_users = df[(df['score_diff'] < 15) & (df['username'] != username)]
        
        # Get the top 3 matches
        top_matches = similar_users.nsmallest(3, 'score_diff')['username'].values

        # Convert top_matches from ndarray to list
        return (top_matches.tolist()) # Convert to list here

    # Example usage
     # Replace with the username you're searching for
    top_matches = find_top_matches(df, "hulk")

    # Return the top matches as JSON data
    return top_matches