from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from utils.logger import logger
from django.db.models.signals import post_save

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self) -> str:
        return self.username
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=75)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/blank.svg', null=True, blank=True)
    last_login = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return self.full_name


def create_user_profile (sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        logger.info(f"Profile created for: {instance.username}")


def save_user_profile (sender, instance, **kwargs):
    instance.profile.save()
    logger.info(f"save profile for: {instance.username}")

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
