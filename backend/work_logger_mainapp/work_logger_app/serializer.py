from models import UsersAccount, DailyWorkLog, Credentilas
from rest_framework import serializers


class UsersAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsersAccount
        fields = ('id', 'email', 'department', 'createdOn')


class DailyWorkLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DailyWorkLog
        fields = ('user_id', 'jira_ticket', 'comment', 'time_spent', 'push_to_jira', 'push_to_slack', 'created_on')

class CredentilasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Credentilas
        fields = ('user_id', 'jira_username', 'jira_password', 'basecamp_token')