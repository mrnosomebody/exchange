from django.urls import path

from core import views

urlpatterns = [
    path('assetpairs/create/', views.AssetPairCreateAPIView.as_view(), name='asset_pair_create'),
    path('assets/create/', views.AssetCreateAPIView.as_view(), name='asset_create'),
    path('orders/create/', views.OrderCreateAPIView.as_view(), name='order_create'),
    path('users/create/', views.UserCreateAPIView.as_view(), name='user_create'),
]
