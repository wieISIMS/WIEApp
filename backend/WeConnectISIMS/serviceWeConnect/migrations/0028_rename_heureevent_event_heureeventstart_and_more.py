# Generated by Django 4.2.4 on 2023-09-02 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serviceWeConnect', '0027_event_place_alter_event_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='heureEvent',
            new_name='heureEventStart',
        ),
        migrations.AddField(
            model_name='event',
            name='heureEventFinished',
            field=models.TimeField(null=True),
        ),
    ]
