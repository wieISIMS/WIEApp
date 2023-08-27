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
    path('latestNews/',views.getLatestNews,name='latestNews'),
    path('login/<slug:username>/<slug:password>',views.login,name='login'),
    path('allNotif/<int:idMember>',views.getAllNotif,name='allNotif'),
    path('verifPar/<int:idMember>/<int:idEvent>',views.verifParticipate,name='verifPar'),
    path('ParEvent/<int:idEvent>/<int:idMember>',views.participateEvent,name='ParEvent'),
    path('bestEvents/<int:idClub>',views.getBestEvents,name='bestEvents'),
    path('clubEvents/<int:idClub>',views.getClubEvents,name='clubEvents'),
    path('calendEvents/',views.getCalender,name='calendEvents'),
    path('memberEvents/<int:idMember>',views.getMemberEvents,name='memberEvents'),
    path('memberClubs/<int:idMember>',views.getMemberClubs,name='memberClubs'),
    path('signUp/',views.signUp,name='signUp')
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 