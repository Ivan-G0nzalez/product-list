from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views



urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.TestAuthenticationToken.as_view(), name='test_authentication_token'),
    path('register/', views.RegisterView.as_view(), name='register_user'),

    # Reset Password
    path('forgot_password/', views.RequestPasswordResetView.as_view(), name='request_password_reset'),
    path('reset-password-confirm/', views.ResetPasswordView.as_view(), name='reset_password'),
    ]