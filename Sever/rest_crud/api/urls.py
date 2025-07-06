from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import BookviewSet

roter = DefaultRouter()
roter.register(r'books',BookviewSet)

urlpatterns = [
    path('',include(roter.urls))  # /api/books/
]
