from core import models

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return models.User.objects.create_user(**validated_data)

    class Meta:
        model = models.User
        fields = ('email', 'first_name', 'last_name', 'password')


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Asset
        fields = '__all__'


class AssetPairSerializer(serializers.ModelSerializer):
    base_asset = AssetSerializer(read_only=True)
    quote_asset = AssetSerializer(read_only=True)

    class Meta:
        model = models.AssetPair
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        default=serializers.CurrentUserDefault(),
        queryset=models.User.objects.all()
    )
    asset_pair = serializers.PrimaryKeyRelatedField(
        queryset=models.AssetPair.objects.all()
    )

    class Meta:
        model = models.Order
        fields = '__all__'


class TradeSerializer(serializers.ModelSerializer):
    buyer = serializers.PrimaryKeyRelatedField(
        queryset=models.User.objects.all()
    )
    seller = serializers.PrimaryKeyRelatedField(
        queryset=models.User.objects.all()
    )
    asset_pair = serializers.PrimaryKeyRelatedField(
        queryset=models.AssetPair.objects.all()
    )

    class Meta:
        model = models.Trade
        fields = '__all__'
