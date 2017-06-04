# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core import serializers
from jira import JIRA
from data_utility import GetModelData
from django.http import HttpResponse
from data_utility import authorize_user

class JiraApiView(APIView):
    @authorize_user
    def post(self, request, payload):
        getDataModel = GetModelData()
        jira_options = {'server': ""}
        jql_query = 'assignee = {assignee} AND project in {project_list} ORDER BY updated DESC, created DESC'
        users_ticket_list = []

        params = request.data

        project_list = params.get("project")
        assignee = params.get("assignee")
        max_ticket_limit = params.get("max_ticket_limit")

        user_id = payload["user_id"]
        jira_credentilas = getDataModel.getJiraCredentials(user_id)

        authed_jira = JIRA(jira_options, basic_auth=(jira_credentilas["users_jira_login"], jira_credentilas["users_jira_password"]))
        project_tuple_list = [str(x) for x in project_list]
        project_tuple_list = "(" + ",".join(str(item) for item in project_tuple_list) + ")"
        jql_query = jql_query.replace("{assignee}", assignee)
        jql_query = jql_query.replace("{project_list}", project_tuple_list)

        users_tickets = authed_jira.search_issues(jql_query, maxResults=max_ticket_limit)

        for ticket in users_tickets:
            ticket_detail = {}
            ticket_detail_object = authed_jira.issue(str(ticket))
            ticket_detail["ticket_number"] = str(ticket)
            ticket_detail["summary"]= ticket_detail_object.fields.summary
            users_ticket_list.append(ticket_detail)

        return Response(users_ticket_list)

class JiraLogWorkApiView(APIView):

    @authorize_user
    def post(self, request, payload):
        getDataModel = GetModelData()
        user_id = payload["user_id"]
        params = request.data
        work_log_ids = params.get("work_log_ids")
        user = getDataModel.getUserById(payload)
        filtered_work_log_ids = getDataModel.filter_work_log_byUser(work_log_ids, user)
        jira_credentilas = getDataModel.getJiraCredentials(user_id)
        responses = True
        for id in filtered_work_log_ids:
            work_log = getDataModel.get_work_log(id)
            response = getDataModel.jira_log_work(jira_credentilas, work_log)
            getDataModel.update_work_log_status(id, "jira")
            responses = responses and response
        return Response(responses)

class SlackPushWorkLog(APIView):
    @authorize_user
    def post(self, request, payload):
        params = request.data
        work_log_ids = params.get('work_log_ids')
        getDataModel = GetModelData()
        user = getDataModel.getUserById(payload)
        slack_credentials = getDataModel.getSlackCredentials(payload["user_id"])
        slack_token = slack_credentials["slack_token"]
        filtered_work_log_ids = getDataModel.filter_work_log_byUser(work_log_ids, user)
        response = getDataModel.slack_log_work(slack_token, payload["user_id"], filtered_work_log_ids)
        if response:
            for id in filtered_work_log_ids:
                getDataModel.update_work_log_status(id, 'slack')
        return Response(response)

class UsersCredentials(APIView):

    @authorize_user
    def post(self, request, payload):
        getDataModel = GetModelData()
        params = request.data

        jira_username = params.get("jira_username")
        jira_password = params.get("jira_password")
        slack_token = params.get("slack_token")
        user = getDataModel.getUserById(payload)

        are_credentials_exist = getDataModel.are_credential_exists(user)
        if are_credentials_exist:
          credential_saved =  getDataModel.update_credentials(jira_username, jira_password, slack_token, user)
        else:
          credential_saved =  getDataModel.save_new_credentials(jira_username, jira_password, slack_token, user)

        return Response(credential_saved)

class LogWorkApiView(APIView):

    @authorize_user
    def get(self, request, payload):
        getDataModel = GetModelData()
        params = request.GET
        date = params.get("date")
        user_id = payload['user_id']
        work_logs = getDataModel.get_users_work_logs(user_id)
        datewise_work_logs = getDataModel.filter_worklog_by_date(work_logs, date)
        data = serializers.serialize('json', datewise_work_logs)
        return HttpResponse(data, content_type="application/json")

    @authorize_user
    def put(self, request, payload):
        getDataModel = GetModelData()
        user = getDataModel.getUserById(payload)
        params = request.data
        work_log_obj = {
            "user": user,
            "jira_ticket": params.get("jira_ticket"),
            "comment": params.get("comment"),
            "time_spent": params.get("time_spent")
        }
        log_work_status = getDataModel.save_work_log(work_log_obj)
        return Response(log_work_status)

    @authorize_user
    def delete(self, request, payload):
        getDataModel = GetModelData()
        params = request.data
        work_log_id = params.get("work_log_id")
        is_valid_id = getDataModel.is_valid_work_logId(payload["user_id"], work_log_id)
        if is_valid_id:
            delete_work_log = getDataModel.delete_work_log_record(work_log_id)
            return Response(delete_work_log)
        else:
            return Response({"delete_work_log_status": False, "message": "Invalid data"})

    @authorize_user
    def post(self, request, payload):                                #This is update query
        getDataModel = GetModelData()
        params = request.data
        work_log_id = params.get("work_log_id")
        is_valid_id = getDataModel.is_valid_work_logId(payload["user_id"], work_log_id)
        work_log_obj = {
            "id": work_log_id,
            "jira_ticket": params.get("jira_ticket"),
            "comment": params.get("comment"),
            "time_spent": params.get("time_spent")
        }
        if is_valid_id:
            update_work_log = getDataModel.update_work_log(work_log_obj)
        else:
            update_work_log = False
        return  Response(update_work_log)

class RegisterUserApiView(APIView):
    def post(self, request):
        getDataModel = GetModelData()
        params = request.data
        email = params.get("email")
        password = params.get("password")
        department = params.get("department")
        register_user = getDataModel.register_user(email, password, department)
        return Response(register_user)

class Login(APIView):
    def post(self, request):
        params = request.data
        email = params.get('email')
        password = params.get('password')
        getDataModel = GetModelData()
        token = getDataModel.login(email, password);
        return Response(token)