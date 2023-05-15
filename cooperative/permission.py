from rest_framework import permissions

class IsCooperative(permissions.BasePermission):
    def has_permission(self, request, view):
        # Get the user's groups
        user_groups = request.user.groups.values_list('name', flat=True)

        # Check if the user is part of the "cooperative" group
        if 'cooperative' in user_groups:
            return True

        return False
