# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-05-06 09:12
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('work_logger_app', '0002_usersaccount_createdon'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyWorkLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jira_ticket', models.CharField(max_length=20)),
                ('comment', models.CharField(max_length=700)),
                ('time_spent', models.IntegerField(default=0)),
                ('push_to_jira', models.BooleanField(default=True)),
                ('push_to_slack', models.BooleanField(default=True)),
                ('created_on', models.DateTimeField(default=datetime.datetime.now)),
                ('user_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='work_logger_app.UsersAccount')),
            ],
        ),
    ]
