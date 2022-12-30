from django.urls import reverse
from rest_framework.test import APITestCase

from . import admin_data
from core.models import User

asset_data = {
    'name': 'US Dollar',
    'symbol': 'USD',
    'type': 'currency'
}


class TestAssetCreate(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('asset_create')

    def test_asset_create_not_admin(self):
        response = self.client.post(
            path=self.url,
            data=asset_data
        )

        self.assertEqual(response.status_code, 403)

    def test_asset_create_admin(self):
        admin = User.objects.create_superuser(**admin_data)
        self.client.force_login(user=admin)
        response = self.client.post(
            path=self.url,
            data=asset_data
        )

        self.assertEqual(response.status_code, 201)

