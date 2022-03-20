
from django.urls import path, include
from . import views

urlpatterns = [
    # Django authentication urls
    path('', views.HomeTemplateView.as_view(), name="home"),
    path('accounts/profile/', views.ProfileTemplateView.as_view(), name="profile"),
    path('accounts/', include('allauth.urls')),
    
    # API calls for authentication
    path('api/', include('dj_rest_auth.urls')),
    path('api/registration/', include('dj_rest_auth.registration.urls'))
]
