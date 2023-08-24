from django.shortcuts import render 
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .models import *
import base64
from django.core.files.base import ContentFile   
import uuid
from datetime import datetime,timezone
@api_view(['POST'])
def inscriptionClub(request):
        name=request.data['name']
        description=request.data['description']
        password=request.data['password']
        photo=request.data['photo']
        if photo:
            format, imgstr = photo.split(';base64,')
            ext = format.split('/')[-1]
            image_data = base64.b64decode(imgstr)
            img = ContentFile(image_data, name=name + '.' + ext)
        
        existing_club = Club.objects.filter(name=name).first()
        if existing_club:
            data=json.dumps({'message':'A club with the same name already exists.'})
            return HttpResponse(data,content_type='application/json')
        else:
            new_club = Club.objects.create(name=name,description=description, password=password,photo=img)
            new_club.full_clean()  
            new_club.save()
            data=json.dumps({'message':True})
            return HttpResponse(data,content_type='application/json')
@api_view(['POST'])
def authenticateClub(request):
        name=request.data.get('name')
        password=request.data.get('password')
        try:
            club = Club.objects.get(name=name, password=password)
            token = str(uuid.uuid4())
            data = json.dumps( {
                "message": "Authentication successful",
                "token": token
            })
            return HttpResponse(data, content_type='application/json')
        except Club.DoesNotExist:
            data = json.dumps( {
                "message": "Authentication failed"
            })
            return HttpResponse(data, content_type='application/json')


@api_view(['GET'])
def OurClubs(request):
    clubs = Club.objects.all()  
    club_list = []
    for club in clubs:
        club_data = {
             'idC':club.idClub,
             'nameC': club.name ,
             'logo': club.photo.url if club.photo else [],
             'nbMembers':club.nbMembers,
             'nbEvents':club.nbEvents
             }
        club_list.append(club_data)
    return HttpResponse(json.dumps(club_list) ,content_type='application/json')




@api_view(['GET'])
def getLastEvents(request):
    past_events = Event.objects.filter(dateEvent__lt=datetime.now()).order_by('-dateEvent')[:5]
    last_events = []
    for event in past_events:
        event_data = {
              'idEvent':event.idEvent,
              'photo': event.photo.url,
              'title': event.title,
              'dateE':event.dateEvent.strftime('%Y-%m-%d'),
               'description':event.description,
               'club':event.club.name,
               'idClub':event.club.idClub,
                'photoC':event.club.photo.url
              }
        last_events.append(event_data)     
    return HttpResponse(last_events ,content_type='application/json')

@api_view(['GET'])
def getEventDetails(request,idEvent):
    #  idEvent=request.data.get('idEvent')
     try:
        event = Event.objects.get(idEvent=idEvent)
     except Event.DoesNotExist:
        return HttpResponse(json.dumps({'error': 'Event not found'}), content_type='application/json')
     event_data = {
        'title': event.title,
        'description':event.description,
        'nbparticipant': event.nbparticipant,
        'nbLike': event.nbLike,
        #'dateEvent': event.timestamp,
        #'heureEvent': event.heureEvent,
        'rate': event.rate,
        'nbRate': event.nbRate,
        'club': event.club.name  }
     return HttpResponse(json.dumps(event_data), content_type='application/json')

@api_view(['POST'])
def addevent(request):
     title=request.data.get('title')
     description=request.data.get('description')
     nbparticipant=request.data.get('nbparticipant')
     photo=request.data.get('photo')
     img=''
     if photo:
            format, imgstr = photo.split(';base64,')
            ext = format.split('/')[-1]
            image_data = base64.b64decode(imgstr)
            img = ContentFile(image_data, name=title + '.' + ext)
     dateEvent=request.data.get('dateEvent')
    # if dateEvent:
          #date = datetime.strptime(dateEvent, '%y-%m-%d')
     heureEvent=request.data.get('heureEvent')
     #if heureEvent:
          #heure=datetime.strptime(heureEvent, '%H:%M:%S')
     idclub=request.data.get('club')
     existing_club = Club.objects.filter(idClub=idclub).first()
     if existing_club:
        new_event = Event.objects.create(title=title,description=description,nbparticipant=nbparticipant,photo=img,dateEvent=dateEvent,heureEvent=heureEvent,club=existing_club)
        new_event.full_clean()  
        new_event.save()
        data=json.dumps({'message':'event added successfully'})
     else:
        data=json.dumps({'message':'A club does not exist'})
     return HttpResponse(data,content_type='application/json')


@api_view(['GET'])
def searchEvent(request,title):
     events = Event.objects.filter(title=title) if title else []
     event_list = []
     for event in events:
        event_data = {
            'id': event.idEvent,
            'nom': event.title,
            'description': event.description,
            'nbParticipant': event.nbparticipant,
            'nom_du_club': event.club.name,
            'photo': event.photo.url,  
            'dateEvent':event.dateEvent.strftime('%Y-%m-%d'),
            'heureEvent':event.heureEvent.strftime('%H:%M:%S')
        }
        event_list.append(event_data)
     return HttpResponse(event_list,content_type='application/json')
 
@api_view(['GET'])
def getLatestNews(request):
     upcoming_events = Event.objects.filter(dateEvent__gte=datetime.now()).order_by('dateEvent')[:5]
     event_list = []
     for event in upcoming_events:
        event_data = {
            'id': event.idEvent,
            'nom': event.title,
            'description': event.description,
            'nbParticipant': event.nbparticipant,
            'nom_du_club': event.club.name,
            'photo': event.photo.url,  
            'dateEvent':event.dateEvent.strftime('%Y-%m-%d'),
            'heureEvent':event.heureEvent.strftime('%H:%M:%S')
        }
        event_list.append(event_data)
     return HttpResponse(event_list,content_type='application/json')

@api_view(['GET'])
def login(request,username,password):
     try:
        member=Membre.objects.get(userName=username,password=password)
        data_list=[]
        if member is not None:
            data = {
                    'id': member.idMember,
                    'firstName': member.firstName,
                    'photo': member.photo.url if member.photo else None
                 }
        data_list.append(data)
        data=data_list  
     except Membre.DoesNotExist:
        data=json.dumps({'message':'member not found'})
     return HttpResponse(data,content_type='application/json')

@api_view(['GET'])
def getAllNotif(request,idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        if member:
            clubs = member.clubs.all()
            print(clubs)
            if clubs is not None:
                club_data = []
                for club in clubs:
                    club_notifications = Notification.objects.filter(club=club)
                    notifications_data = []
                    for notification in club_notifications:
                        current_time = datetime.now(timezone.utc)
                        notification_time = notification.timestamp.replace(tzinfo=timezone.utc)
                        time_difference = current_time - notification_time
                        hours = time_difference.days * 24 + time_difference.seconds // 3600
                        minutes = (time_difference.seconds % 3600) // 60
                        seconds = time_difference.seconds % 60
                        if hours > 0:
                            duree = f'{hours} heures'
                        elif minutes > 0:
                            duree = f'{minutes} minutes'
                        else:
                            duree = f'{seconds} secondes'
                        notifications_data.append({
                        'idEvent':notification.event.idEvent,
                        'title':notification.titre,
                        'durée': duree
                            })
                    if notifications_data:
                        club_data.append({
                            'nameclub': club.name,
                            'photo': club.photo.url if member.photo else None,
                            'notifications': notifications_data
                    })
                data=club_data
    except Membre.DoesNotExist:
        data=json.dumps({'message':'member not found'})
    return HttpResponse(data,content_type='application/json')
    

@api_view(['GET'])
def verifParticipate(request,idEvent,idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        idCland=member.idCland.idCland
        cland = CalandrierEvent.objects.get(idCland=idCland)
        events=cland.events.all()
        event=Event.objects.get(idEvent=idEvent)
        print(event)
        if event in events:
            data=json.dumps({'message':'member participates in the event'})
        else:
            data=json.dumps({'message':'member does not participate in the event'})
    except Event.DoesNotExist:
        data=json.dumps({'message':'event does not exist'})
    except Membre.DoesNotExist:
        data=json.dumps({'message':'event does not exist'})
    return HttpResponse(data,content_type='application/json')

@api_view(['GET'])
def participateEvent(request,idEvent):
     return HttpResponse(content_type='application/json')
