from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import *
urlpatterns = [
    path('loginClub/', views.authenticateClub, name='loginClub'),
    path('createClub/',views.inscriptionClub, name='createClub')
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 