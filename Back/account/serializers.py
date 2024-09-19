
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework import serializers
from django.utils import timezone

from .models import User, Profile 

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='profile.full_name')
    avatar = serializers.CharField(source='profile.avatar')
    last_login = serializers.DateField(format="%d %b %Y, %I:%M %p")
    date_joined = serializers.DateTimeField(format="%d %b %Y, %I:%M %p")

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'avatar', 'last_login', 'date_joined']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class CreateUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    avatar = serializers.ImageField(source='profile.avatar', required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'groups', 'full_name', 'avatar']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True, 'validators': [validate_password]},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def validate_email(self, value):
        existing_user = User.objects.filter(email=value).first()
        if existing_user and not existing_user.is_active:
            raise serializers.ValidationError("A user with this email already exists but is inactive.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        avatar = profile_data.pop('avatar', None)
        full_name = validated_data.pop('full_name')
        validated_data.pop('password2')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        user.profile.full_name = full_name
        if avatar:
            user.profile.avatar = avatar
        user.profile.save()
        return user
    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True, required=True
    )
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': 'password does not match'}
            )
        return attrs
    
    def create(self, validate_data):
        user = User.objects.create(
            username=validate_data['username'],
            email=validate_data['email']
            
        )
        user.set_password(validate_data['password'])
        user.save()

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_token(self, user):

        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.email
        token['email'] = user.email

        return token

    def validate(self, attrs):
        try:
            # Intentamos obtener el usuario usando 'username'
            user = User.objects.get(username=attrs['username'])
        except User.DoesNotExist:
            # Usuario no encontrado, devolver 404 con el mismo mensaje
            raise NotFound("No active account found with the given credentials")

        # Validar la contraseña
        if not user.check_password(attrs['password']):
            # Contraseña incorrecta, devolver 401 con el mismo mensaje
            raise AuthenticationFailed("No active account found with the given credentials", code="authentication_failed")

        return super().validate(attrs)
