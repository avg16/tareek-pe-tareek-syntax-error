import jwt
from django.conf import settings
from usersapp.models import User
def get_username_from_token(token):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        id = decoded_token.get('user_id') 
        user = User.objects.get(id = id)
        username = user.username # Adjust according to your token's payload structure

        if username:
            return username
        else:
            return {'error': 'Invalid token: Enrollment number not found'}

    except jwt.ExpiredSignatureError:
        return {'error': 'Token has expired'}
    except jwt.DecodeError:
        return {'error': 'Error decoding token'}