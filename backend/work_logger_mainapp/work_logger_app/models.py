# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime

class UsersAccount(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100, blank=False, default="")
    department = models.CharField(max_length=100)
    createdOn = models.DateTimeField(blank=False, default=datetime.datetime.now)

class DailyWorkLog(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('UsersAccount', default=0)
    jira_ticket = models.CharField(max_length=20)
    comment = models.CharField(max_length=700)
    time_spent = models.CharField(max_length=20, default="1m")
    push_to_jira = models.BooleanField(default= False)
    push_to_slack = models.BooleanField(default=False)
    created_on = models.DateTimeField(blank=False, default=datetime.datetime.now)

class Credentilas(models.Model):
    user_id = models.ForeignKey('UsersAccount', default=0)
    jira_username = models.CharField(max_length=100)
    jira_password = models.CharField(max_length=100)
    slack_token = models.CharField(max_length=200)

