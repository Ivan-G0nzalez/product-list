from rest_framework import serializers
from .models import Category, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'description', 'price', 'stock', 'created_at', 'updated_at', 'image', 'author']
        read_only_fields = ['id', 'created_at', 'updated_at', 'author']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'author']
        read_only_fields = ['id', 'created_at', 'updated_at', 'author']
