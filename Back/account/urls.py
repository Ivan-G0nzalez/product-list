from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.TestAuthenticationToken.as_view(), name='test_authentication_token'),
    path('register/', views.RegisterView.as_view(), name='register_user'),
    ]