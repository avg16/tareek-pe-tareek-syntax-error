from django.contrib import admin
from django.urls import path
from datesapp.views import make_date_request,list_from_date_requests, list_to_date_requests, list_answered_from_date_requests
from datesapp.date_views import respond_to_date_request



urlpatterns = [
    path('ask-for-a-date/',make_date_request,name="login"),
    path('user-dates-requests/',list_to_date_requests,name="list-user-dates"),
    path('user-asked-out-dates/',list_from_date_requests,name="list-asked-out-user-dates"),
    path('user-dates-requests-answered/',list_answered_from_date_requests,name="list-user-dates"),
    path('user-asked-out-dates-answered/',list_from_date_requests,name="list-asked-out-user-dates"),
    path('respond/', respond_to_date_request, name='respond_to_date_request'),
]