from django.urls import path

from core import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('orders', views.OrderViewSet)

urlpatterns = [
    path('assetpairs/create/', views.AssetPairCreateAPIView.as_view(), name='asset_pair_create'),
    path('assets/create/', views.AssetCreateAPIView.as_view(), name='asset_create'),
    path('users/create/', views.UserCreateAPIView.as_view(), name='user_create'),
]
urlpatterns += router.urls
