import os

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import generics, mixins, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        try:
            user: User = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'detail':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.is_active:
            return Response({'detail': 'User account is inactive'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
class TestEndPoint(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        full_name = profile.full_name if profile.full_name else ""
        avatar_url = profile.avatar.url if profile.avatar else None

        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'full_name': full_name,
            'avatar': avatar_url,
        }
        return Response({'data': data}, status=status.HTTP_200_OK)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegiserSerializer


class RequestPasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(User, email=email)
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:8081/auth/reset-password?token={token}&email={email}"
        email_sender = os.environ.get('EMAIL_HOST_USER')
        
        send_mail(
            'Reset Your Password',
            f'Please click the following link to reset your password: {reset_link}',
            email_sender,
            [email],
            fail_silently=False,
        )
        return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        token = request.data.get('token')
        new_password = request.data.get('password')
        user = get_object_or_404(User, email=email)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Your password has been reset successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)