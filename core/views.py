from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from core import serializers


class UserCreateAPIView(CreateAPIView):
    serializer_class = serializers.UserSerializer


class OrderCreateAPIView(CreateAPIView):
    serializer_class = serializers.OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AssetCreateAPIView(CreateAPIView):
    serializer_class = serializers.AssetSerializer
    permission_classes = (permissions.IsAdminUser,)


class AssetPairCreateAPIView(CreateAPIView):
    serializer_class = serializers.AssetPairSerializer
    permission_classes = (permissions.IsAdminUser,)
