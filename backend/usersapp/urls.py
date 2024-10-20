from django.contrib import admin
from django.urls import path
from usersapp.views.auth import LoginView, LogoutView, Register, delete_user
from usersapp.views.userDetails import create_user_details, user_details_exists, get_user_details, get_all_user_details
from usersapp.reccomending_users import process_json_data
from usersapp.reccomending_users import get_top_five_users
urlpatterns = [
    path('login/',LoginView.as_view(),name="login"),
    path('logout/',LogoutView.as_view(),name="logout"),
    path('register/',Register.as_view(),name="register"),
    path('create-user-details/',create_user_details,name="create-user-details"),
    path('has-user-details/',user_details_exists,name="userdetails_exist"),
    path("get-user-details/", get_user_details, name="user_details"),
    path("get-all-users-details/",get_all_user_details,name="get_all_user_details"),
    path("delete-user/<str:username>/",delete_user),
    path("get-analysis/",get_top_five_users)
]