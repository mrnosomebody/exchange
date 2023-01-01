from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet

from core import serializers
from core.models import Order
from core.permissions import OwnerOrAdminPermission


class UserCreateAPIView(CreateAPIView):
    serializer_class = serializers.UserSerializer


class OrderViewSet(ModelViewSet):
    serializer_class = serializers.OrderSerializer
    queryset = Order.objects.all()
    permission_classes = (permissions.IsAuthenticated, OwnerOrAdminPermission)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AssetCreateAPIView(CreateAPIView):
    serializer_class = serializers.AssetSerializer
    permission_classes = (permissions.IsAdminUser,)


class AssetPairCreateAPIView(CreateAPIView):
    serializer_class = serializers.AssetPairSerializer
    permission_classes = (permissions.IsAdminUser,)
