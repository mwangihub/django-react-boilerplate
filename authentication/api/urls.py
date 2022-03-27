from django.urls import path
from . import custom_views as views


urlpatterns = [
    path('api/rest/google/', views.GoogleLogin.as_view(), name='google_rest_login'),
    path('api/rest/facebook/', views.FacebookLogin.as_view(), name='facebook_rest_login'),
    
    path('api/social/key/<str:name>/', views.SocialAppKey.as_view(), name='social_api_keys'),
]
