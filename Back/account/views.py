from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import generics, mixins, status
from rest_framework.permissions import AllowAny, IsAuthenticated

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
    
class TestAuthenticationToken(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        data =  f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)

        full_name = profile.full_name
        avatar_url = profile.avatar

        data = {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'full_name': full_name,
            'avatar': avatar_url,
        }

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = RegisterSerializer