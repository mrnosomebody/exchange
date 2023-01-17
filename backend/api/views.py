from rest_framework import status, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.serializers import UserSerializer
from api.models import User
from api.permissions import CreateOrAdminPermission


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (CreateOrAdminPermission,)

    def create(self, request, *args, **kwargs):
        self.permission_classes = (permissions.AllowAny,)
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
