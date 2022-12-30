from django.urls import path

from core import views

urlpatterns = [
    path('users/create', views.UserCreateAPIView.as_view(), name='user_create'),
    path('assets/create', views.AssetCreateAPIView.as_view(), name='asset_create'),
]
