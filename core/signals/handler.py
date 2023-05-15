from django.dispatch import receiver
from django.contrib.auth.models import Group
from core.models import User
from cooperative.signals import cooperative_created

@receiver(cooperative_created)
def add_permission(sender,**kwargs):
    print('dsfsdf')
    user=User.objects.get(id=kwargs['user'])
    group = Group.objects.get(id=1)
    group.user_set.add(user)