from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from . import views
urlpatterns = [
    path('loginClub/', views.authenticateClub, name='loginClub'),
    path('createClub/',views.inscriptionClub, name='createClub'),
    path('clubs/', views.OurClubs, name='OurClubs'),
    path('LastEvents/', views.getLastEvents, name='LastEvents'),
     path('EventDetails/', views.getEventDetails, name='EventDetails')
    
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 