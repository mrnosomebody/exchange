from rest_framework.test import APITestCase
from api.models import User

user_data = {
    'email': 'test@mail.com',
    'first_name': 'Ri',
    'last_name': 'Mi Sun',
    'password': 'testRegister228322'
}


class TestUserRegister(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'

    def test_register(self):
        response = self.client.post(
            path=self.url,
            data=user_data
        )

        self.assertEqual(response.status_code, 201)

        user_count = User.objects.all().count()
        self.assertEqual(user_count, 1)

    def test_user_creation_fail_if_user_with_email_exist(self):
        User.objects.create_user(**user_data)

        response = self.client.post(
            path=self.url,
            data=user_data
        )

        self.assertEqual(response.status_code, 400)

