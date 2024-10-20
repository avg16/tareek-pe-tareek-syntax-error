import pandas as pd
import numpy as np
import json


with open('/content/sample-users.json', encoding='utf-8') as inputfile:
    df_new = pd.read_json(inputfile)
df_new.to_csv('json_samples_users.csv', encoding='utf-8', index=False)
pp = pd.read_csv("/content/json_samples_users.csv")

age_range_mapping = {
    '18-25': 1,
    '25-30': 2,
    '30-35': 3,
    '35-40':4,
    '40-45':5,
    '45+':6
}

sexuality_mapping = {
    'Straight': 1,
    'Gay': 2,
    'Lesbian': 3,
    'Bisexual': 4,
}

income_level_mapping = {
    'Low income':1,
    'Middle income':2,
    'Upper-middle income':3,
    'High income':4
}

education_level_mapping = {
    'High School':1,
    "Bachelor's":2,
    "Master's":3,
    'Doctorate':4
}

dietary_pref ={
    'Vegetarian':1,
    'Non-Vegetarian':2,
    'Vegan':3,
    'Other':4
}


fitness_pref = {
    'Gym':1,
    'Yoga':2,
    'Running':3,
    'No interest in fitness':4
}

smoking_habits = {
    'Smoker':0,
    'Non-smoker':1
}

alcohol_consumption = {
    'Drinks regularly':1,
    'Occasionally':2,
    'Never':3
}

preferred_occupation1 = {
    'Creative':1,
    'Technical':2,
    'Healthcare':3,
    'Business':4,
    'Education':5,
    'Service':6
}
preferred_occupation2 = {
    'Creative':1,
    'Technical':2,
    'Healthcare':3,
    'Business':4,
    'Education':5,
    'Service':6
}
preferred_occupation3 = {
    'Creative':1,
    'Technical':2,
    'Healthcare':3,
    'Business':4,
    'Education':5,
    'Service':6
}

hobby1 = {
    'Outdoor Activities':1,
    'Artistic hobbies':2,
    'Fitness':3,
    'Reading':4,
    'Gaming':5,
    'Music':6,
    'Travel':7
}
hobby2= {
    'Outdoor Activities':1,
    'Artistic hobbies':2,
    'Fitness':3,
    'Reading':4,
    'Gaming':5,
    'Music':6,
    'Travel':7
}
hobby3 = {
    'Outdoor Activities':1,
    'Artistic hobbies':2,
    'Fitness':3,
    'Reading':4,
    'Gaming':5,
    'Music':6,
    'Travel':7
}

movie_preference1 = {
    'Action':1,
    'Comedy':2,
    'Drama':3,
    'Romance':4,
    'Horror':5,
    'Sci-Fi':6,
    'Fantasy':7,
    'Documentary':8
}

movie_preference2 = {
    'Action':1,
    'Comedy':2,
    'Drama':3,
    'Romance':4,
    'Horror':5,
    'Sci-Fi':6,
    'Fantasy':7,
    'Documentary':8
}
movie_preference3 = {
    'Action':1,
    'Comedy':2,
    'Drama':3,
    'Romance':4,
    'Horror':5,
    'Sci-Fi':6,
    'Fantasy':7,
    'Documentary':8
}

song_preference1 = {
    'Pop':1,
    'Rock':2,
    'Classical':3,
    'Hip Hop':4,
    'Jazz':5,
    'Country':6,
    'Electronic':7,
    'Indie':8
}
song_preference2 = {
    'Pop':1,
    'Rock':2,
    'Classical':3,
    'Hip Hop':4,
    'Jazz':5,
    'Country':6,
    'Electronic':7,
    'Indie':8
}
song_preference3 = {
    'Pop':1,
    'Rock':2,
    'Classical':3,
    'Hip Hop':4,
    'Jazz':5,
    'Country':6,
    'Electronic':7,
    'Indie':8
}

##for binary columns
gender = {
    'Male':1,
    'Female':0,
}

dating_status = {
    'Dating':1,
    'Not Dating':0
}

have_dated = {
    'Yes':1,
    'No':0
}

pp['sexuality'] = pp['sexuality'].str.strip().str.title().map(sexuality_mapping).fillna(pp['sexuality'])
pp['preferred_age_range'] = pp['preferred_age_range'].str.strip().map(age_range_mapping).fillna(pp['preferred_age_range'])
pp['income_level'] = pp['income_level'].str.strip().str.title().map(income_level_mapping).fillna(pp['income_level'])
pp['education_level'] = pp['education_level'].str.strip().str.title().map(education_level_mapping).fillna(pp['education_level'])


# Convert 'dietary_preferences' to numeric and fill NaNs with 0
pp['dietary_preferences'] = pd.to_numeric(pp['dietary_preferences'].str.strip().str.title().map(dietary_pref), errors='coerce').fillna(0)  

# pp['pet_preferences'] = pp['pet_preferences'].astype(str).str.strip().str.title().map(pet_pref).fillna(pp['pet_preferences'])

pp['fitness_preferences'] = pd.to_numeric(pp['fitness_preferences'].astype(str).str.strip().str.title().map(fitness_pref), errors='coerce').fillna(0) 

pp['alcohol_consumption'] = pd.to_numeric(pp['alcohol_consumption'].astype(str).str.strip().str.title().map(alcohol_consumption), errors='coerce').fillna(0) 

pp['preferred_occupation_1'] = pp['preferred_occupation_1'].str.strip().str.title().map(preferred_occupation1).fillna(pp['preferred_occupation_1'])
pp['preferred_occupation_2'] = pp['preferred_occupation_2'].str.strip().str.title().map(preferred_occupation2).fillna(pp['preferred_occupation_2'])
pp['preferred_occupation_3'] = pp['preferred_occupation_3'].str.strip().str.title().map(preferred_occupation3).fillna(pp['preferred_occupation_3'])
pp['smoking_habits'] = pp['smoking_habits'].astype(str).str.strip().str.title().map(smoking_habits).fillna(pp['smoking_habits'])
pp['hobby_1'] = pp['hobby_1'].str.strip().str.title().map(hobby1).fillna(pp['hobby_1'])
pp['hobby_2'] = pp['hobby_2'].str.strip().str.title().map(hobby2).fillna(pp['hobby_2'])
pp['hobby_3'] = pp['hobby_3'].str.strip().str.title().map(hobby3).fillna(pp['hobby_3'])
pp['movie_preference_1'] = pp['movie_preference_1'].str.strip().str.title().map(movie_preference1).fillna(pp['movie_preference_1'])
pp['movie_preference_2'] = pp['movie_preference_2'].str.strip().str.title().map(movie_preference2).fillna(pp['movie_preference_2'])
pp['movie_preference_3'] = pp['movie_preference_3'].str.strip().str.title().map(movie_preference3).fillna(pp['movie_preference_3'])
pp['song_preference_1'] = pp['song_preference_1'].str.strip().str.title().map(song_preference1).fillna(pp['song_preference_1'])
pp['song_preference_2'] = pp['song_preference_2'].str.strip().str.title().map(song_preference2).fillna(pp['song_preference_2'])
pp['song_preference_3'] = pp['song_preference_3'].str.strip().str.title().map(song_preference3).fillna(pp['song_preference_3'])

#Binary columns
pp['gender'] = pp['gender'].str.strip().str.title().map(gender).fillna(pp['gender'])
pp['dating_status'] = pp['dating_status'].str.strip().str.title().map(dating_status).fillna(pp['dating_status'])
pp['haveDated'] = pp['haveDated'].astype(str).str.strip().str.title().map(have_dated).fillna(pp['haveDated'])


class Metrics:
    def __init__(self, row):
        self.choice_score = 0
        self.row = row

    def preferences(self):
        # preferred_age_range = self.row['preferred_age_range']  # (0,6)
        # sexuality = self.row['sexuality']  # (0,4)
        # education_level = self.row['education_level']  # (0,4)
        # income_level = self.row['income_level']  # (0,4)

        self.preference_metric = 0 #(education_level * 0.5 + income_level * 0.5)
        return self.preference_metric

    def personality(self):
        curiosity_level = self.row['curiosity_level']  # (0,10)
        organized_chaos = self.row['organized_chaos']  # (0,10)
        social_butterfly = self.row['social_butterfly']  # (0,10)
        team_player_vibes = self.row['team_player_vibes']  # (0,10)

        self.personality_metric = (curiosity_level * 0.25 + organized_chaos * 0.2 +
                                   social_butterfly * 0.3 + team_player_vibes * 0.25)
        return self.personality_metric

    def lifestyle(self):
        chill_factor = self.row['chill_factor']  # (0,10)
        adventure_seeker = self.row['adventure_seeker']  # (0,10)
        perfectionist_mode = self.row['perfectionist_mode']  # (0,10)
        party_starter = self.row['party_starter']  # (0,10)
        harmony_seeker = self.row['harmony_seeker']  # (0,10)

        self.lifestyle_metric = (chill_factor * 0.2 + adventure_seeker * 0.2 +
                                 perfectionist_mode * 0.15 + party_starter * 0.15 +
                                 harmony_seeker * 0.3)
        return self.lifestyle_metric

    def preferences_extended(self):
        dietary_preferences = self.row['dietary_preferences']  # (0,4)
        pet_preferences = 0  # (0,3)
        fitness_preferences = self.row['fitness_preferences']  # (0,4)
        alcohol_consumption = self.row['alcohol_consumption']  # (0,3)

        self.preferences_extended_metric = (dietary_preferences * 0.25 + pet_preferences * 0.25 +
                                            fitness_preferences * 0.25 + alcohol_consumption * 0.25)
        return self.preferences_extended_metric

    def occupation(self):
        preferred_occupation1 = self.row['preferred_occupation_1']  # (0,6)
        preferred_occupation2 = self.row['preferred_occupation_2']  # (0,6)
        preferred_occupation3 = self.row['preferred_occupation_3']  # (0,6)

        self.occupation_metric = (preferred_occupation1 * 0.4 + preferred_occupation2 * 0.3 +
                                  preferred_occupation3 * 0.3)
        return self.occupation_metric

    def hobbies(self):
        hobby1 = self.row['hobby_1']  # (0,7)
        hobby2 = self.row['hobby_2']  # (0,7)
        hobby3 = self.row['hobby_3']  # (0,7)

        self.hobby_metric = (0 * 0.4 + 0 * 0.3 + 0* 0.3)
        return self.hobby_metric

    def entertainment(self):
        movie_preference1 = self.row['movie_preference_1']  # (0,8)
        movie_preference2 = self.row['movie_preference_2']  # (0,8)
        movie_preference3 = self.row['movie_preference_3']  # (0,8)
        song_preference1 = self.row['song_preference_1']  # (0,8)
        song_preference2 = self.row['song_preference_2']  # (0,8)
        song_preference3 = self.row['song_preference_3']  # (0,8)

        self.entertainment_metric = (movie_preference1 * 0.2 + movie_preference2 * 0.2 +
                                     movie_preference3 * 0.2 + song_preference1 * 0.1 +
                                     song_preference2 * 0.15 + song_preference3 * 0.15)
        return self.entertainment_metric


def sigmoid(x):
  x = np.array(x, dtype = float)
  return 1/(1+np.exp(-x))

def calculate_risk_score(preference_metric, personality_metric, lifestyle_metric, preferences_extended_metric, occupation_metric, hobby_metric, entertainment_metric):
  risk_score = 0
  risk_score = preference_metric * 0.25 + personality_metric * 0.2 + lifestyle_metric * 0.2 + preferences_extended_metric * 0.15 + occupation_metric * 0.1 + entertainment_metric * 0.1

  recommended_score = 1/(1+np.exp(-risk_score))

  return recommended_score

all_scores = []

for row in pp.itertuples(index=False):
    metrics = Metrics(row)

    preference_metric = sigmoid(metrics.preferences())
    personality_metric = sigmoid(metrics.personality())
    lifestyle_metric = sigmoid(metrics.lifestyle())
    preferences_extended_metric = sigmoid(metrics.preferences_extended())
    occupation_metric = sigmoid(metrics.occupation())
    hobby_metric = sigmoid(metrics.hobbies())
    entertainment_metric = sigmoid(metrics.entertainment())

    s = calculate_risk_score(preference_metric, personality_metric, lifestyle_metric, 
                             preferences_extended_metric, occupation_metric, 
                             hobby_metric, entertainment_metric)
    
    all_scores.append(s)

pp['scores'] = np.array(all_scores)

def find_top_matches(df, username):
    if username not in df['name'].values:
        return f"Username {username} not found in the DataFrame."

    target_score = df.loc[df['name'] == username, 'scores'].values[0]
    df['score_diff'] = abs(df['scores'] - target_score)
    similar_users = df[(df['score_diff'] < 0.0001) & (df['name'] != username)]

    top_matches = similar_users.nsmallest(3, 'score_diff')['name'].values
    
    return top_matches
      
def arr_json(arr):
    return json.dumps(arr)


def save_json_to_file(data, filename="top_matches.json"):
    with open(filename, 'w') as json_file:
        json_file.write(data)
    print(f"JSON data saved to {filename}")

final_arr = find_top_matches(pp, username)
json_final = arr_json(final_arr)

save_json_to_file(json_final)

