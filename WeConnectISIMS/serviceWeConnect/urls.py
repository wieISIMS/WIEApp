from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import *
urlpatterns = [
    path('loginClub/', authenticateClub, name='loginClub'),
    path('createClub/',inscriptionClub, name='createClub'),
    path('newEvent/',addevent,name='newEvent')
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 