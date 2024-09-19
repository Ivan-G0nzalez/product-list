from django.contrib import admin
from .models import User, Profile
from django.contrib.auth.admin import UserAdmin
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id','user', 'full_name']


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)