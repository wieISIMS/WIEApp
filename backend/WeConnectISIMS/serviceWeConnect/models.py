from django.db import models


class CalandrierEvent(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField("Event")
    def __str__(self):
        return str(self.idCland)

class ClandrierClub(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField("Event", blank=True)
    clubs = models.ManyToManyField("Club", blank=True)
    def __str__(self):
        return str(self.idCland)

class Club(models.Model):
    idClub = models.AutoField(primary_key=True, unique=True, blank=True)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    password = models.CharField(max_length=500, null=True)
    photo = models.ImageField(upload_to="images/clubs/", null=True)
    nbEvents=models.IntegerField(null=True)
    nbMembers=models.IntegerField(null=True)
    linkFb=models.URLField(null=True,blank=True)
    linkInsta=models.URLField(null=True,blank=True)
    ClandC = models.ForeignKey(ClandrierClub, on_delete=models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ClandrierMembre(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField("Event", blank=True)
    member = models.ManyToManyField("Membre", blank=True)
    def __str__(self):
        return str(self.idCland)

class Membre(models.Model):
    idMember = models.AutoField(primary_key=True, unique=True, blank=True)
    email= models.CharField(max_length=100, null=True)
    userName=models.CharField(max_length=100,null=True)
    firstName = models.CharField(max_length=100,null=True)
    familyName = models.CharField(max_length=100,null=True)
    photo = models.ImageField(upload_to="images/clubs/")
    password = models.CharField(max_length=500,null=True)
    phoneNumber=models.CharField(max_length=8,null=True)
    clubs = models.ManyToManyField('Club', blank=True)
    ClandM = models.ForeignKey(ClandrierMembre, on_delete=models.CASCADE, blank=True, null=True)
    def __str__(self):
        return str(self.firstName)



class Event(models.Model):
    idEvent = models.AutoField(primary_key=True, unique=True, blank=True)
    title = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=6000, null=True)
    nbparticipant = models.IntegerField(null=True)
    nbMax = models.IntegerField(null=True)
    photo = models.ImageField(upload_to="images/events/", null=True)
    dateEvent = models.DateField(null=True)
    heureEventStart = models.TimeField(null=True)
    heureEventFinished = models.TimeField(null=True)
    place = models.CharField(max_length=100, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title






class Notification(models.Model):
    idNotification = models.AutoField(primary_key=True, unique=True, blank=True)
    titre = models.CharField(max_length=100)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.titre)
 



