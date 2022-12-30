import requests
from django.urls import reverse

user_data = {
    'email': 'test@mail.com',
    'password': 'simbaLion228',
    'first_name': 'Igor',
    'last_name': 'Kotletov'
}

admin_data = {
    'email': 'admin@mail.com',
    'password': 'simbaLion228',
    'first_name': 'admin',
    'last_name': 'admin'
}

base_url = 'http://127.0.0.1:8000'


def get_jwt_token(email: str, password: str) -> dict:
    response = requests.request(
        'POST',
        url=base_url + reverse('token_obtain_pair'),
        data={
            'email': email,
            'password': password
        }
    )
    print(response.json())
    return response.json()
