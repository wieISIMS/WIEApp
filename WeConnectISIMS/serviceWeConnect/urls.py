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
    path('login/',views.login,name='loginMembre'),
    path('allNotif/<int:idMember>',views.getAllNotif,name='allNotif'),
    path('verifPar/',views.verifParticipate,name='verifPar'),
    path('ParEvent/',views.participateEvent,name='ParEvent'),
    path('bestEvents/<int:idClub>',views.getBestEvents,name='bestEvents'),
    path('clubEvents/<int:idClub>',views.getClubEvents,name='clubEvents'),
    path('calendEvents/',views.getCalender,name='calendEvents'),
    path('memberEvents/<int:idMember>',views.getMemberEvents,name='memberEvents'),
    path('memberClubs/<int:idMember>',views.getMemberClubs,name='memberClubs'),
    path('signUp/',views.signUp,name='signUp'),
    path('infomembre/<idMember>/',views.getMembreInfo,name='infoMembre'),
    path('infoClub/<int:idClub>',views.getInfoClub,name='infoClub'),
    path('memberInfo/<int:idMember>',views.getMemberInfo,name='memberInfo'),
    path('finishedEvent/<int:idEvent>',views.finishedEvent,name='finishedEvent'),
    path('statClub/<int:idClub>',views.club_stats,name='statClub'),
    path('membersClub/<int:idClub>',views.club_members,name='membersClub')

    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 