# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import UsersAccount, DailyWorkLog, Credentilas
#
admin.site.register(UsersAccount)
admin.site.register(DailyWorkLog)
admin.site.register(Credentilas)