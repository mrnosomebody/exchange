from django.urls import reverse
from rest_framework.test import APITestCase

from . import user_data


class TestUserCreate(APITestCase):
    def setUp(self) -> None:
        self.url = reverse('user_create')

    def test_create_user(self):
        response = self.client.post(
            path=self.url,
            data=user_data
        )
        data_without_password = user_data.copy()
        data_without_password.pop('password')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), data_without_password)
