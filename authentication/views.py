import re
from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, permission_required
from django.utils.decorators import method_decorator


class HomeTemplateView(TemplateView):
    template_name = 'index.html'
    
    def get(self, request, *args, **kwargs)->HttpResponse:
        context = {
            'title': "welcome to info-site"
        }
        return render(request, self.template_name, context)
    
  
class ProfileTemplateView(TemplateView):
    
    template_name = 'profile.html'
    
    @method_decorator(login_required(login_url="account_login"))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    
    def get(self, request, *args, **kwargs)->HttpResponse:
        context = {
            'title': request.user
        }
        return render(request, self.template_name, context)
    
