from django.urls import path
from . import views

urlpatterns = [
    # Products 
    path('products', views.ProductListPostView.as_view(), name='List_and_create_products'),
    path('product/<int:pk>/', views.ProductListPostView.as_view(), name='details_update_deleted_products'),

    path('categories', views.CategoryListPostView.as_view(), name='List_and_create_categories'),
    path('category/<int:pk>/', views.CategoryRetriveDeleteUpdateView.as_view(), name='details_update_delete_category')
]