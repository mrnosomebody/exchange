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

    def create(self, validated_data):
        asset_pair = super().create(validated_data)
        quote = models.Quote.objects.create(asset_pair=asset_pair)
        quote.save()
        quote.update_quote()
        return asset_pair

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
