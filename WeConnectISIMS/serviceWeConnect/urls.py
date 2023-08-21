from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import *
urlpatterns = [
    path('loginClub/', views.authenticateClub, name='loginClub'),
    path('createClub/',views.inscriptionClub, name='createClub'),
    path('clubs/',views.OurClubs, name='OurClubs'),
    path('lastEvent/',views.getLastEvents, name='lastEvent'),
    path('EventDetails/<int:idEvent>',views.getEventDetails, name='EventDetails'),
    path('addEvent/',views.addevent,name='addEvent'),
    path('searchE/<slug:title>',views.searchEvent,name='searchE'),
    path('latestNews/',views.getLatestNews,name='latestNews')
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 