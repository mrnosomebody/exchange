from django.urls import path

from core import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('assets', views.AssetViewSet)
router.register('asset-pairs', views.AssetPairViewSet)
router.register('orders', views.OrderViewSet)
router.register('trades', views.TradeViewSet)
router.register('users', views.UserViewSet)

urlpatterns = []
urlpatterns += router.urls
