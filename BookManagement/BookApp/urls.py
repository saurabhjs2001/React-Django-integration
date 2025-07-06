from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Router for BookViewSet
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='books')

urlpatterns = [
    # User registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # JWT login & refresh
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Include router-generated book URLs
    path('', include(router.urls)),
]
