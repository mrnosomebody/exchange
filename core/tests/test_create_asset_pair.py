from django.urls import reverse
from rest_framework.test import APITestCase

from . import user_data, admin_data, asset_data, asset_data2
from core.models import User, Asset


class TestCreateAssetPair(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('asset_pair_create')
        self.jwt_url = reverse('token_obtain_pair')
        User.objects.create_user(**user_data)
        User.objects.create_superuser(**admin_data)
        self.asset1 = Asset.objects.create(**asset_data)
        self.asset2 = Asset.objects.create(**asset_data2)

    def test_asset_pair_create_not_authenticated(self):
        asset_pair_data = {
            'base_asset': self.asset1.id,
            'quote_asset': self.asset2.id
        }
        response = self.client.post(
            path=self.url,
            data=asset_pair_data
        )

        self.assertEqual(response.status_code, 401)

    def test_asset_pair_create_not_admin(self):
        asset_pair_data = {
            'base_asset': self.asset1.id,
            'quote_asset': self.asset2.id
        }
        access = self.get_jwt_token('test@mail.com', 'simbaLion228')

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        response = self.client.post(
            path=self.url,
            data=asset_pair_data,
            format='json'
        )

        self.assertEqual(response.status_code, 403)

    def test_asset_pair_create_admin(self):
        asset_pair_data = {
            'base_asset': self.asset1.id,
            'quote_asset': self.asset2.id
        }

        access = self.get_jwt_token('admin@mail.com', 'simbaLion228')

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        response = self.client.post(
            path=self.url,
            data=asset_pair_data,
            format='json'
        )

        self.assertEqual(response.status_code, 201)

    def get_jwt_token(self, email: str, password: str) -> str:
        access = self.client.post(
            path=self.jwt_url,
            data={
                'email': email,
                'password': password
            }
        ).json().get('access')
        return access
