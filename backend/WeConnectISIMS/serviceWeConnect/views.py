from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import *
import base64
from django.core.files.base import ContentFile
import uuid
from datetime import datetime, timezone
from django.db.models import F


@api_view(["POST"])
def inscriptionClub(request):
    name = request.data["name"]
    description = request.data["description"]
    password = request.data["password"]
    photo = request.data["photo"]
    if photo:
        format, imgstr = photo.split(";base64,")
        ext = format.split("/")[-1]
        image_data = base64.b64decode(imgstr)
        img = ContentFile(image_data, name=name + "." + ext)

    existing_club = Club.objects.filter(name=name).first()
    if existing_club:
        data = json.dumps({"message": "A club with the same name already exists."})
        return HttpResponse(data, content_type="application/json")
    else:
        new_club = Club.objects.create(
            name=name, description=description, password=password, photo=img
        )
        new_club.full_clean()
        new_club.save()
        data = json.dumps({"message": True})
        return HttpResponse(data, content_type="application/json")


@api_view(["POST"])
def authenticateClub(request):
    name = request.data.get("name")
    password = request.data.get("password")
    try:
        club = Club.objects.get(name=name, password=password)
        token = str(uuid.uuid4())
        data = json.dumps({"message": "Authentication successful", "token": token})
        return HttpResponse(data, content_type="application/json")
    except Club.DoesNotExist:
        data = json.dumps({"message": "Authentication failed"})
        return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def OurClubs(request):
    clubs = Club.objects.all()
    club_list = []
    for club in clubs:
        club_data = {
            "idC": club.idClub,
            "nameC": club.name,
            "logo": club.photo.url if club.photo else [],
            "nbMembers": club.nbMembers,
            "nbEvents": club.nbEvents,
        }
        club_list.append(club_data)
    return HttpResponse(json.dumps(club_list), content_type="application/json")


@api_view(["GET"])
def getLastEvents(request):
    past_events = Event.objects.filter(dateEvent__lt=datetime.now()).order_by(
        "-dateEvent"
    )[:5]
    last_events = []
    for event in past_events:
        event_data = {
            "id": event.idEvent,
            "photo": event.photo.url,
            "nom": event.title,
            "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
            "description": event.description,
            "nom_du_club": event.club.name,
            "idClub": event.club.idClub,
            "photo_du_club": event.club.photo.url,
            "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
        }
        last_events.append(event_data)
    return HttpResponse(json.dumps(last_events), content_type="application/json")


@api_view(["GET"])
def getEventDetails(request, idEvent):
    try:
        event = Event.objects.get(idEvent=idEvent)
    except Event.DoesNotExist:
        return HttpResponse(
            json.dumps({"error": "Event not found"}), content_type="application/json"
        )
    upcoming_events = []
    finished_events = []
    event_data = {
        "clubName": event.club.name,
        "clubId": event.club.idClub,
        "clubPhoto": event.club.photo.url,
        "title": event.title,
        "description": event.description,
        "photo": event.photo.url,
        "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
        "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
    }
    date = datetime.combine(event.dateEvent, event.heureEvent)
    current_datetime = datetime.now()
    if date <= current_datetime:
        event_data["finished"] = True
        finished_events.append(event_data)
    else:
        event_data["finished"] = False
        upcoming_events.append(event_data)
        data = finished_events + upcoming_events
    return HttpResponse(json.dumps(event_data), content_type="application/json")


@api_view(["POST"])
def addevent(request):
    title = request.data.get("title")
    description = request.data.get("description")
    nbparticipant = request.data.get("nbparticipant")
    photo = request.data.get("photo")
    img = ""
    if photo:
        format, imgstr = photo.split(";base64,")
        ext = format.split("/")[-1]
        image_data = base64.b64decode(imgstr)
        img = ContentFile(image_data, name=title + "." + ext)
    dateEvent = request.data.get("dateEvent")
    # if dateEvent:
    # date = datetime.strptime(dateEvent, '%y-%m-%d')
    heureEvent = request.data.get("heureEvent")
    # if heureEvent:
    # heure=datetime.strptime(heureEvent, '%H:%M:%S')
    idclub = request.data.get("club")
    existing_club = Club.objects.filter(idClub=idclub).first()
    if existing_club:
        new_event = Event.objects.create(
            title=title,
            description=description,
            nbparticipant=nbparticipant,
            photo=img,
            dateEvent=dateEvent,
            heureEvent=heureEvent,
            club=existing_club,
        )
        new_event.full_clean()
        new_event.save()
        data = json.dumps({"message": "event added successfully"})
    else:
        data = json.dumps({"message": "A club does not exist"})
    return HttpResponse(data, content_type="application/json")


@api_view(["POST"])
def searchEvent(request):
    title = request.data.get("title")
    events = Event.objects.filter(title__icontains=title) if title else []

    event_list = []
    for event in events:
        event_data = {
            "id": event.idEvent,
            "photo": event.photo.url,
            "nom": event.title,
            "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
            "description": event.description,
            "nom_du_club": event.club.name,
            "idClub": event.club.idClub,
            "photo_du_club": event.club.photo.url,
            "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
        }
        event_list.append(event_data)

    return JsonResponse(event_list, safe=False)


@api_view(["GET"])
def getLatestNews(request):
    upcoming_events = Event.objects.filter(dateEvent__gte=datetime.now()).order_by(
        "dateEvent"
    )[:5]
    event_list = []
    for event in upcoming_events:
        event_data = {
            "id": event.idEvent,
            "nom": event.title,
            "description": event.description,
            "photo": event.photo.url,
            "nbParticipant": event.nbparticipant,
            "nom_du_club": event.club.name,
            "photo_du_club": event.photo.url,
            "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
            "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
        }
        event_list.append(event_data)
    data = event_list
    if not data:
        data = json.dumps([{"message": "No upcoming events"}])
    print(data)    
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["POST"])
def login(request):
    username = request.data["username"]
    password = request.data["password"]
    try:
        member = Membre.objects.get(userName=username, password=password)
        data_list = []
        token = str(uuid.uuid4())
        if member is not None:
            data = json.dumps(
                {
                    "id": member.idMember,
                    "firstName": member.firstName,
                    "photo": member.photo.url if member.photo else None,
                    "token": token,
                }
            )
        data_list.append(data)
        data = data_list
    except Membre.DoesNotExist:
        data = json.dumps({"message": "member not found"})
    return HttpResponse(data, content_type="application/json")


@api_view(["POST"])
def signUp(request):
    email = request.data.get("email")
    password = request.data.get("password")
    phoneNumber = request.data.get("phoneNumber")
    firstName = request.data.get("firstName")
    familyName = request.data.get("familyName")
    photo = request.data.get("photo")
    if photo:
        format, imgstr = photo.split(";base64,")
        ext = format.split("/")[-1]
        image_data = base64.b64decode(imgstr)
        img = ContentFile(image_data, name=firstName + "." + ext)
    username = email.split("@")[0]
    existingM = Membre.objects.filter(userName=username).first()
    if existingM:
        data = json.dumps({"message": "member exists."})
        return HttpResponse(data, content_type="application/json")
    else:
        newMember = Membre.objects.create(
            userName=username,
            email=email,
            phoneNumber=phoneNumber,
            password=password,
            firstName=firstName,
            familyName=familyName,
            photo=img,
        )
        newMember.full_clean()
        newMember.save()
        data = json.dumps({"message": True})
        return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def getAllNotif(request, idMember):
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
                        notification_time = notification.timestamp.replace(
                            tzinfo=timezone.utc
                        )
                        time_difference = current_time - notification_time
                        hours = (
                            time_difference.days * 24 + time_difference.seconds // 3600
                        )
                        minutes = (time_difference.seconds % 3600) // 60
                        seconds = time_difference.seconds % 60
                        if hours > 0:
                            duree = f"{hours} heures"
                        elif minutes > 0:
                            duree = f"{minutes} minutes"
                        else:
                            duree = f"{seconds} secondes"
                        notifications_data.append(
                            {
                                "idEvent": notification.event.idEvent,
                                "title": notification.titre,
                                "duree": duree,
                            }
                        )

                    if notifications_data:
                        club_data.append(
                            {
                                "nom_du_club": club.name,
                                "photo_du_club": club.photo.url if member.photo else None,
                                "notifications": notifications_data,
                            }
                        )
                data = club_data
    except Membre.DoesNotExist:
        data = json.dumps({"message": "member not found"})
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["GET"])
def getInfoClub(request, idClub):
    try:
        club = Club.objects.get(idClub=idClub)
        data = json.dumps(
            {
                "name": club.name,
                "photo_du_club": club.photo.url if club.photo else [],
                "nbMembers": club.nbMembers,
                "nbEvents": club.nbEvents,
            }
        )
    except:
        data = json.dumps({"message": "club not found"})
    return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def getMembreInfo(request, idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        print(member.phoneNumber,"AAAAA")
        print("AAA")
        data = json.dumps(
            {
                "email": member.email,
                "password": member.password,
                "firstName": member.firstName,
                "familyName": member.familyName,
                "photo": member.photo.url if member.photo else [],
                "number":member.phoneNumber
                
            }
        )
    except:
        data = json.dumps({"message": "member not found"})
    return HttpResponse(data, content_type="application/json")


@api_view(["POST"])
def verifParticipate(request):
    idEvent = request.data.get("ide")
    idMember = request.data.get("idm")
    try:
        complet = False
        member = Membre.objects.get(idMember=idMember)
        cland = member.ClandM
        events = cland.events.all()
        event = Event.objects.get(pk=idEvent)
        print(event)
        if event.nbMax == event.nbparticipant:
            complet = True

        if event not in events:
            data = json.dumps({"message": "False", "complete": complet})
        else:
            data = json.dumps({"message": "True", "complete": complet})
    except Event.DoesNotExist:
        data = json.dumps({"message": "Event does not exist"})
    except Membre.DoesNotExist:
        data = json.dumps({"message": "Member does not exist"})

    return HttpResponse(data, content_type="application/json")


@api_view(["POST"])
def participateEvent(request):
    try:
        idEvent = request.data.get("ide")
        idMember = request.data.get("idm")
        event = Event.objects.get(idEvent=idEvent)
        member = Membre.objects.get(idMember=idMember)
        if event:
            calendar, created = ClandrierMembre.objects.get_or_create(membre=member)
            allEvents = calendar.events.all()

            if event not in allEvents:
                if event.nbparticipant < event.nbMax:
                    event.nbparticipant += 1
                    event.save()
                    calendar.events.add(event)
                    calendar.save()

                    data = json.dumps({"message": "True"})
                else:
                    data = json.dumps(
                        {"message": "False, maximum number of participants reached"}
                    )
            else:
                data = json.dumps({"message": "Event already in calendar"})
        else:
            data = json.dumps({"message": "Event does not exist"})
    except Exception as e:
        data = json.dumps({"message": "An error occurred: " + str(e)})

    return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def getBestEvents(request, idClub):
    try:
        club = Club.objects.get(idClub=idClub)
        calendarClub, created = ClandrierClub.objects.get_or_create(club=club)
        events = calendarClub.events.all() if not created else []
        best_events = sorted(
            events, key=lambda event: event.nbparticipant, reverse=True
        )[:5]
        print(best_events)
        best_events_info = []
        if best_events:
            best_events_info = []
            for event in best_events:
                event_info = {
                    "id": event.idEvent,
                    "nom": event.title,
                    "description": event.description,
                    "nbParticipant": event.nbparticipant,
                    "nom_du_club": event.club.name,
                    "photo": event.photo.url,
                    "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
                    "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
                }
                best_events_info.append(event_info)
        data = best_events_info

        if not data:
            data = json.dumps({"message": "no events"})
    except:
        data = json.dumps({"message": "club not found"})
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["GET"])
def getClubEvents(request, idClub):
    try:
        club = Club.objects.get(idClub=idClub)
        calendarClub, created = ClandrierClub.objects.get_or_create(club=club)
        events = calendarClub.events.all() if not created else []
        upcoming_events = []
        finished_events = []
        current_datetime = datetime.now()
        for event in events:
            event_info = {
                "id": event.idEvent,
                "nom": event.title,
                "description": event.description,
                "nbParticipant": event.nbparticipant,
                "nom_du_club": event.club.name,
                "photo": event.photo.url,
                "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
                "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
            }
            date = datetime.combine(event.dateEvent, event.heureEventStart)
            if date <= current_datetime:
                event_info["finished"] = True
                finished_events.append(event_info)
            else:
                event_info["finished"] = False
                upcoming_events.append(event_info)

        data = finished_events + upcoming_events
    except:
        data = json.dumps({"message": "club not found"})
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["POST"])
def getCalender(request):
    idMember = request.data.get("idMember")
    date = request.data.get("date")
    date=date.strip()
    date_format = "%Y-%m-%d"
    date_date = datetime.strptime(date, date_format).date()
    try:
        member = Membre.objects.get(idMember=idMember)
        idCland = member.ClandM.idCland
        cland, created = ClandrierMembre.objects.get_or_create(idCland=idCland)
        if cland:
            events = cland.events.all()
            data = []
            for event in events:
                if (event.dateEvent == date_date):
                    event_info = {
                        "id": event.idEvent,
                        "nom": event.title,
                        "description": event.description,
                        "nbParticipant": event.nbparticipant,
                        "nom_du_club": event.club.name,
                        "photo": event.photo.url,
                        "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
                        "heureEventStart": event.heureEventStart.strftime("%H:%M:%S"),
                        "heureEventFinished": event.heureEventFinished.strftime("%H:%M:%S"),
                        "place": event.place
                    }

                    data.append(event_info)
            if not data:
                data = json.dumps({"message": "no events in this date"})
    except:
        data = json.dumps({"message": "member not found"})
    return JsonResponse(data, safe=False)


@api_view(["GET"])
def getMemberEvents(request, idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        calendarMember, created = ClandrierMembre.objects.get_or_create(membre=member)
        events = calendarMember.events.all() if not created else []
        # upcoming_events = []
        # finished_events = []
        # current_datetime = datetime.now()
        data =[]
        print(member, events,)
        for event in events:
            event_info = {
                "id": event.idEvent,
                "nom": event.title,
                "photo": event.photo.url,
                "description": event.description,
                "nbParticipant": event.nbparticipant,
                "nom_du_club": event.club.name,
                "photo": event.photo.url,
                "dateEvent": event.dateEvent.strftime("%Y-%m-%d"),
                "heureEvent": event.heureEventStart.strftime("%H:%M:%S"),
            }
            data.append(event_info)
        #     date = datetime.combine(event.dateEvent, event.heureEvent)
        #     if date <= current_datetime:
        #         event_info["finished"] = True
        #         finished_events.append(event_info)
        #     else:
        #         event_info["finished"] = False
        #         upcoming_events.append(event_info)
        # data = finished_events + upcoming_events
    except:
            data = json.dumps({"message": "member not found"})
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["GET"])
def getMemberClubs(request, idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        member_clubs = member.clubs.all()
        data = []
        for club in member_clubs:
            club_data = {
                "idC": club.idClub,
                "nameC": club.name,
                "logo": club.photo.url if club.photo else [],
                "nbMembers": club.nbMembers,
                "nbEvents": club.nbEvents,
            }
            data.append(club_data)
    except:
        data = json.dumps({"message": "member not found"})
    return HttpResponse(json.dumps(data), content_type="application/json")


@api_view(["GET"])
def getMembreInfo(request, idMember):
    try:
        member = Membre.objects.get(idMember=idMember)
        data = json.dumps(
            {
                "email": member.email,
                "password": member.password,
                "firstName": member.firstName,
                "familyName": member.familyName,
                "photo": member.photo.url if member.photo else [],
            }
        )
    except:
        data = json.dumps({"message": "member not found"})
    return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def getInfoClub(request, idClub):
    try:
        club = Club.objects.get(idClub=idClub)
        data = json.dumps(
            {
                "name": club.name,
                "photo": club.photo.url if club.photo else [],
                "nbMembers": club.nbMembers,
                "nbEvents": club.nbEvents,
            }
        )
    except:
        data = json.dumps({"message": "club not found"})
    return HttpResponse(data, content_type="application/json")


@api_view(["GET"])
def finishedEvent(request, idEvent):
    event = Event.objects.get(idEvent=idEvent)
    date = datetime.combine(event.dateEvent, event.heureEventStart)
    current_datetime = datetime.now()
    if date <= current_datetime:
        data = json.dumps({"message": "True"})
    else:
        data = json.dumps({"message": "False"})
    return HttpResponse(data, content_type="application/json")
@api_view(['POST'])
def updateProfile(request):
    try:
        idMember=request.data.get('idMember')
        member = Membre.objects.get(idMember=idMember)
        print(member.phoneNumber)
        new_email = request.data.get('email')
        new_pwd = request.data.get('password')
        new_phoneNumber = request.data.get('phoneNumber')
        new_photo = request.data.get('photo')
        member.email = new_email
        member.phoneNumber = new_phoneNumber
        format, imgstr = new_photo.split(';base64,')
        ext = format.split('/')[-1]
        image_data = base64.b64decode(imgstr)
        img = ContentFile(image_data, name=member.firstName + '.' + ext)
        member.photo = img
        member.password=new_pwd
        member.save()
        data=json.dumps({'message': 'Member profile updated successfully'})
    except:
        data=json.dumps({'message': 'Member not found'})

    return HttpResponse(data, content_type='application/json')