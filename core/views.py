from rest_framework import status, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core import serializers
from core.models import Order, User, Asset, AssetPair, Trade
from core.permissions import OwnerOrAdminPermission


class BaseAdminViewSet(ModelViewSet):
    def post(self, request, *args, **kwargs):
        self.permission_classes = (permissions.IsAdminUser,)
        return super().create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        self.permission_classes = (permissions.IsAdminUser,)
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, OwnerOrAdminPermission)

    def post(self, request, *args, **kwargs):
        self.permission_classes = (permissions.AllowAny,)
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    # permission_classes = (permissions.IsAuthenticated, OwnerOrAdminPermission)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AssetViewSet(BaseAdminViewSet):
    queryset = Asset.objects.all()
    serializer_class = serializers.AssetSerializer


class AssetPairViewSet(BaseAdminViewSet):
    queryset = AssetPair.objects.select_related('base_asset', 'quote_asset')
    serializer_class = serializers.AssetPairSerializer


class TradeViewSet(ModelViewSet):
    queryset = Trade.objects.all()
    serializer_class = serializers.TradeSerializer
    permission_classes = (permissions.IsAuthenticated,)
