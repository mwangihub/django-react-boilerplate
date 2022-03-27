# SOCIAL VIEWS AUTHENTICATION
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .serializers import SocialAppSerializer
# Google login
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    # CALLBACK_URL_YOU_SET_ON_GOOGLE
    callback_url = "http://localhost:3000/authentication/signup/"
    client_class = OAuth2Client

# Facebook Login
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
class FacebookLogin(SocialLoginView):    
    adapter_class = FacebookOAuth2Adapter



class SocialAppKey(APIView):
    '''
    Provide social application keys
    '''
    def get_object(self, name):
        try:
            return SocialApp.objects.get(name=name)
        except SocialApp.DoesNotExist:
            raise Http404
        
    def get(self, request, name, format=None):
        socialAccount = self.get_object(name)
        serializer=SocialAppSerializer(socialAccount)
        return Response(serializer.data, status=status.HTTP_200_OK)