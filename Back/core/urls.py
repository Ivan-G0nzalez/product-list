from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from django.conf import settings
from drf_yasg.views import get_schema_view
from django.conf.urls.static import static
from drf_yasg import openapi


schema_view_v1 = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('account.urls')),
    path('', include('product.urls')),

    # SWAGGER VIEW
    path('docs/', schema_view_v1.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui-v1'),
    path('redoc/', schema_view_v1.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
