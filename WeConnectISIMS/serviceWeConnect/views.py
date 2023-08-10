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
@api_view(['POST'])
def addevent(request):
     title=request.data.get('title')
     description=request.data.get('description')
     nbParticipant=request.data.get('nbParticipant')
     photo=request.data.get('photo')
     if photo:
            format, imgstr = photo.split(';base64,')
            ext = format.split('/')[-1]
            image_data = base64.b64decode(imgstr)
            img = ContentFile(image_data, name=title + '.' + ext)
     dateEvent=request.data.get('dateEvent')
     if dateEvent:
          date = datetime.strptime(dateEvent, '%Y-%M-%D')
     heureEvent=request.data.get('heureEvent')
     if heureEvent:
          heure=datetime.strptime(heureEvent, '%H:%M:%S')
     club=request.data.get('club')
     try:
        club = Club.objects.get(name=club)  
     except Club.DoesNotExist:
        data=json.dumps({'message':'club not found.'})
        return HttpResponse(data,content_type='application/json')
     new_event = Event.objects.create(title=title,description=description,nbParticipant=nbParticipant,photo=img,dateEvent=dateEvent,heureEvent=heureEvent,club=club)
     new_event.full_clean()  
     new_event.save()
     data=json.dumps({'message':'event added successfully'})
     return HttpResponse(data,content_type='application/json')
     