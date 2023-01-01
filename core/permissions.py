import rest_framework.permissions
from rest_framework.permissions import BasePermission


class OwnerOrAdminPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method not in rest_framework.permissions.SAFE_METHODS:
            user = request.user
            return user.is_admin or obj.user == user
        return True
