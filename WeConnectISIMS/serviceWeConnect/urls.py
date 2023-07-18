from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('message/',views.getMessage,name='getMessage'),
    path('addCal/<events>/',views.addCal,name='addCal')
    ]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 