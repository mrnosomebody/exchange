from rest_framework.permissions import BasePermission


class CreateOrAdminPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return False
