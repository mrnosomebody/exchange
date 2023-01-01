from django.urls import reverse
from rest_framework.test import APITestCase

from . import user_data, asset_data, asset_data2
from core.models import User, Asset, AssetPair


class TestJWTAuth(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('token_obtain_pair')
        self.auth_required_url = reverse('order_create')
        self.user = User.objects.create_user(**user_data)
        asset1 = Asset.objects.create(**asset_data)
        asset2 = Asset.objects.create(**asset_data2)
        self.asset_pair = AssetPair.objects.create(base_asset=asset1, quote_asset=asset2)

    def test_jwt_auth(self):
        order_data = {
            'asset_pair': self.asset_pair.id,
            'order_type': 'buy',
            'price': '10',
            'quantity': '3',
            'status': 'pending'
        }

        #  test unauthenticated
        response = self.client.post(
            path=self.auth_required_url,
            data=order_data,
            format='json'
        )

        self.assertEqual(response.status_code, 401)

        # test authenticated
        access = self.client.post(
            path=self.url,
            data={
                'email': 'test@mail.com',
                'password': 'simbaLion228'
            }
        ).json().get('access')

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        response = self.client.post(
            path=self.auth_required_url,
            data=order_data,
            format='json'
        )

        self.assertEqual(response.status_code, 201)

