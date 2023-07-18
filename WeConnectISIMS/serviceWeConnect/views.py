from django.shortcuts import render 
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from .models import *
# Create your views here.
@api_view(['GET'])
def  getMessage(request):
    data = json.dumps({'message':'hello word!'})
    return HttpResponse(data,content_type='application/json')
@api_view(['GET'])
def  addCal(request,events):
    calendrier=Calandrier.objects.create(events=events)
    calendrier.save()
    data=json.dumps({'added':True})
    return HttpResponse(data,content_type='application/json')