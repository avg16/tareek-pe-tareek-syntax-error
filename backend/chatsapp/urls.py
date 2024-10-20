# chat/urls.py
from django.urls import path
from .views import store_chat_message,get_chat_messages, get_latest_messages, delete_all_messages

urlpatterns = [
    # path('create-room/', dm_views.create_room, name='create_room'),
    # path('rooms/<int:enrollmentNo>/', dm_views.user_rooms, name='user_rooms'),
    path('store/',store_chat_message, name='store_chat_message'),
    path('get/<str:room>/', get_chat_messages, name='get_chat_messages'),
    path('latest/<str:room>/<int:count>/', get_latest_messages, name='get_latest_messages'),
    path('delete/<str:room>/',delete_all_messages, name="delete-messages"),
    # path('schedule-message/', dm_views.schedule_chat_message, name='schedule_chat_message'),
]
