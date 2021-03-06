# Generated by Django 2.2 on 2019-04-01 14:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Complaint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('text', models.CharField(max_length=400)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=400)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
                ('complaint', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='complaint.Complaint')),
            ],
        ),
    ]
