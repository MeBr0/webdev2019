# Generated by Django 2.2 on 2019-04-21 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_tasklist_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='notes',
            field=models.CharField(default='', max_length=200),
        ),
    ]
