from django.db import models


class Club(models.Model):
    idClub = models.AutoField(primary_key=True, unique=True, blank=True)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    password = models.CharField(max_length=500, null=True)
    photo = models.ImageField(upload_to="images/clubs/", null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    idEvent = models.AutoField(primary_key=True, unique=True, blank=True)
    title = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    nbparticipant = models.IntegerField(null=True)
    nbLike = models.IntegerField(blank=True, null=True)
    photo = models.ImageField(upload_to="images/events/", null=True)
    dateEvent = models.DateTimeField(null=True)
    heureEvent = models.TimeField(null=True)
    rate = models.IntegerField(blank=True, null=True)
    nbRate = models.IntegerField(blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ClandrierClub(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField("Event", blank=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.idCland)


class Membre(models.Model):
    idMembre = models.AutoField(primary_key=True, unique=True, blank=True)
    clubs = models.ManyToManyField("Club")
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="images/clubs/")
    password = models.CharField(max_length=500)

    def __str__(self):
        return str(self.name)


class ClandrierMembre(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField("Event", blank=True)
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.idCland)


class Notification(models.Model):
    idNotification = models.AutoField(primary_key=True, unique=True, blank=True)
    titre = models.CharField(max_length=100)
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    categorie = models.CharField(max_length=100)

    def __str__(self):
        return str(self.titre)
