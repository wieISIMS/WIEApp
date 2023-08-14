from django.shortcuts import render 
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .models import *
import base64
from django.core.files.base import ContentFile   
import uuid
import datetime
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
            'name': club.name }
        club_list.append(club_data)
    return HttpResponse(json.dumps(club_list) ,content_type='application/json')




@api_view(['GET'])
def getLastEvents(request):
     events = Event.objects.all() 
     sorted_events = sorted(events, key=lambda event: event.timestamp, reverse=True)
     latest_events = []
     for event in sorted_events:
         event_data = {
             'title': event.title }
         latest_events.append(event_data)     
     return HttpResponse(json.dumps(latest_events) ,content_type='application/json')

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

@api_view(['GET'])
def addLikeEvent(request,idEvent):
     event= Event.objects.get(idEvent=idEvent)
     if event : 
          event.nbLike+=1
          event.save()
          data=json.dumps({'likes':event.nbLike})
     else:
          data=json.dumps({'event not found'})
     return HttpResponse(data, content_type='application/json')
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
     if dateEvent:
          date = datetime.strptime(dateEvent, '%y-%m-%D')
     heureEvent=request.data.get('heureEvent')
     if heureEvent:
          heure=datetime.strptime(heureEvent, '%H:%M:%S')
     club=request.data.get('club')
     existing_club = Club.objects.filter(name=club).first()
     if existing_club:
        new_event = Event.objects.create(title=title,description=description,nbparticipant=nbparticipant,photo=img,dateEvent=dateEvent,heureEvent=heureEvent,club=club)
        new_event.full_clean()  
        new_event.save()
        data=json.dumps({'message':'event added successfully'})
     else:
        data=json.dumps({'message':'A club does not exist'})
     return HttpResponse(data,content_type='application/json')
    