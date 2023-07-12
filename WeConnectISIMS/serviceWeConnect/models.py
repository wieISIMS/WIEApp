from django.db import models

class Clandrier(models.Model):
    idCland = models.AutoField(primary_key=True, unique=True, blank=True)
    events = models.ManyToManyField('Event') 
    def __str__(self):
        return str(self.idCland)

class Club(models.Model):
    idClub = models.AutoField(primary_key=True, unique=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    password = models.CharField(max_length=500)
    photo = models.ImageField(upload_to="images/clubs/")
    timestamp = models.DateTimeField(auto_now_add=True)
    clandrier = models.ForeignKey(Clandrier, on_delete=models.CASCADE)

    def __str__ (self):
        return self.name

class Event(models.Model):
    idEvent = models.AutoField(primary_key=True, unique=True, blank=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    nbparticipant = models.IntegerField()
    nbLike = models.IntegerField(blank=True)
    photo = models.ImageField(upload_to="images/events/")
    dateEvent = models.DateTimeField()
    heureEvent = models.TimeField()
    rate = models.IntegerField(blank=True)
    nbRate = models.IntegerField(blank=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return self.title
    
class Membre(models.Model):
    idMembre = models.AutoField(primary_key=True, unique=True, blank=True)
    clubs = models.ManyToManyField('Club') 
    name = models.CharField(max_length=100)
    clandrier = models.ForeignKey(Clandrier, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="images/clubs/")
    password = models.CharField(max_length=500)
    def __str__(self):
        return str(self.name)
class Notification(models.Model):
    idNotification = models.AutoField(primary_key=True, unique=True, blank=True)
    titre = models.CharField(max_length=100)
    membre = models.ForeignKey(Membre, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    categorie = models.CharField(max_length=100)
    def __str__(self):
        return str(self.titre)