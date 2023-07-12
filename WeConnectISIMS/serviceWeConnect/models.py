from django.db import models


class Calandrier(models.Model):
    idCland=models.AutoField(primary_key=True,unique=True,blank=True)
    events=models.CharField(max_length=100)
    def __str__ (self):
        return self.events
