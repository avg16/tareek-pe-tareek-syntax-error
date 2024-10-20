from django.urls import path
from .views import FantasyListView, FantasyDetailView, add_fantasy, delete_fantasy

urlpatterns = [
    path('fantasies/', FantasyListView.as_view(), name='fantasy-list'),  # List and Create
    path('fantasies/<int:pk>/', FantasyDetailView.as_view(), name='fantasy-detail'),  # Detail, Update, Delete
    path('create-new-fantasy/',add_fantasy,name="Create_new_fantasy_app"),
    path('delete-fantasy/<str:unique_name>/', delete_fantasy, name="delete_fantasy"),
]
