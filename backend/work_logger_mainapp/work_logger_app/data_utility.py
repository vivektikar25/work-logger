from models import UsersAccount, Credentilas, DailyWorkLog
import requests
import jwt, json
from rest_framework.response import Response
from base64 import b64encode
from slackclient import SlackClient

class GetModelData():
    def getUserByEmail(self, user_email):
        users = UsersAccount.objects.all()
        user = users.filter(email=user_email)
        return user

    def getJiraCredentials(self, user_id):
        credentilas = Credentilas.objects.all()
        user = credentilas.filter(user_id=user_id)
        users_jira_login = user[0].jira_username
        users_jira_password = user[0].jira_password
        return {"users_jira_login": users_jira_login, "users_jira_password": users_jira_password}

    def getSlackCredentials(self, user_id):
        credentilas = Credentilas.objects.all()
        user = credentilas.filter(user_id=user_id)
        slack_token = user[0].slack_token
        return {"slack_token": slack_token}

    def jira_log_work(self, jira_credentilas, work_log):
        ticket = work_log["jira_ticket"]
        comment = work_log["comment"]
        time_spent = work_log["time_spent"]

        userAndPass = b64encode(jira_credentilas["users_jira_login"]+":"+jira_credentilas["users_jira_password"]).decode("ascii")
        url = ""
        url = url.replace('{jira_ticket}', ticket)

        payload = {'comment': comment,'timeSpent': time_spent}

        headers = {
            'Authorization' : 'Basic %s' %  userAndPass,
            'content-type': "application/json"
        }

        response = requests.request("POST", url, data=json.dumps(payload), headers=headers)
        return response

    def slack_log_work(self, slack_token, user_id, work_log_ids):
        sc = SlackClient(slack_token)
        comment_list = ""
        print work_log_ids
        for id in work_log_ids:
            if id:
                work_log = self.get_work_log(id)
                comment = work_log["jira_ticket"]+"-"+work_log["comment"]
                comment_list = comment_list+"\n"+comment

        response = sc.api_call(
            "chat.postMessage",
            channel = "#temp",
            text = comment_list
        )
        return response

    def save_work_log(self, work_log_obj):
        daily_work_log = DailyWorkLog()
        try:
            daily_work_log.user_id = work_log_obj["user"]
            daily_work_log.jira_ticket = work_log_obj["jira_ticket"]
            daily_work_log.time_spent = work_log_obj["time_spent"]
            daily_work_log.comment = work_log_obj["comment"]

            daily_work_log.save()
            return {"save_work_log_status": True, "message": "Record saved successfully"}
        except Exception as e:
            return {"save_work_log_status": False, "message": e.message}

    def register_user(self, email, password, department):
        user_account = UsersAccount()
        try:
            user_account.email = email
            user_account.department = department
            user_account.password = password
            user_account.save()
            return {"register_user_status": True, "message": "User registered successfully"}
        except Exception as e:
            return {"register_user_status": False, "message": e.message}

    def delete_work_log_record(self, work_log_id):
        daily_work_logs = DailyWorkLog.objects.all()
        try:
            daily_work_log = daily_work_logs.filter(id = work_log_id)
            if daily_work_log:
                daily_work_log.delete()
                return {"delete_work_log_status": True, "message": "work log deleted successfully"}
            else:
                return {"delete_work_log_status": False, "message": "Work log record not found"}
        except Exception as e:
            return {"delete_work_log_status": False, "message": e.message}

    def get_users_work_logs(self, user_id):
        daily_work_logs = DailyWorkLog.objects.all()
        users_work_logs = daily_work_logs.filter(user_id = user_id)
        return users_work_logs

    def update_work_log(self, work_log_obj):
        daily_work_logs = DailyWorkLog.objects.all()
        try:
            daily_work_log = daily_work_logs.filter(id=work_log_obj["id"])
            updated_work_log = {}
            updated_work_log["jira_ticket"] = work_log_obj["jira_ticket"]
            updated_work_log["comment"]= work_log_obj["comment"]
            updated_work_log["time_spent"] = work_log_obj["time_spent"]

            update_status = daily_work_log.update(**updated_work_log)
            if update_status:
                return {"update_work_log_status": True, "message": "work log updated successfully"}
            else:
                return {"update_work_log_status": False, "message": "Fail to log work"}
        except Exception as e:
            return {"update_work_log_status": False, "message": e.message}

    def login(self, email, password):

        JWT_SECRET = 'secret'
        JWT_ALGORITHM = 'HS256'
        JWT_EXP_DELTA_SECONDS = 20
        users = UsersAccount.objects.all()
        user = users.filter(email=email)
        if user:
            payload = {
                'user_id': user[0].id
            }
            if user[0].password == password:
                jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
                return {'status': True , 'token': jwt_token.decode('utf-8')}
            else:
                return {'status': False, 'message': 'Wrong Credentials'}
        else:
            return {'status': False, 'message': 'Wrong Credentials'}

    def getUserById(self, payload):
        user_id = payload["user_id"]
        users = UsersAccount.objects.all()
        user = users.filter(id = user_id)
        return user[0]

    def is_valid_work_logId(self, user_id, work_log_id):
        work_logs = DailyWorkLog.objects.all()
        work_log = work_logs.filter(user_id = user_id, id = work_log_id)
        if(work_log):
            return True
        else:
            return False

    def save_new_credentials(self, jira_username, jira_password, slack_token, user):
        try:
            credentials = Credentilas()
            credentials.jira_username = jira_username
            credentials.jira_password = jira_password
            credentials.slack_token = slack_token
            credentials.user_id = user
            credentials.save()
        except Exception as e:
            return {"status": False, "msg": e.message}

    def update_credentials(self, jira_username, jira_password, slack_token, user):
        try:
            credentials = Credentilas.objects.all()
            credential = credentials.filter(user_id = user)
            updated_credential = {}
            updated_credential["jira_username"] = jira_username
            updated_credential["jira_password"] = jira_password
            updated_credential["slack_token"] = slack_token
            credential.update(**updated_credential)
            return {"status": True, "msg": "Credentials updated successfully"}
        except Exception as e:
            return {"status": False, "msg": e.message}

    def are_credential_exists(self, user):
        try:
            user_credentials = Credentilas.objects.all()
            user_credential = user_credentials.filter(user_id = user)
            if(user_credential):
                return True
            else:
                return False
        except Exception as e:
            print e.message

    def get_work_log(self, id):
        work_logs = DailyWorkLog.objects.all()
        work_log = work_logs.filter(pk = id)
        work_log_obj = {}
        if work_log:
            work_log_obj = {
                "work_log_id": work_log[0].id,
                "jira_ticket": work_log[0].jira_ticket,
                "comment": work_log[0].comment,
                "time_spent": work_log[0].time_spent,
                "push_to_jira": work_log[0].push_to_jira,
                "push_to_slack": work_log[0].push_to_slack
            }
        return work_log_obj

    def filter_worklog_by_date(self, work_logs, date):
        datewise_work_log = []
        for work_log in work_logs:
            work_log_date = work_log.created_on.date()
            if str(work_log_date) == date:
                datewise_work_log.append(work_log)

        return datewise_work_log

    def update_work_log_status(self, id, application):
        daily_worklogs = DailyWorkLog.objects.all()
        daily_worklog = daily_worklogs.filter(id = id)
        if application == 'jira':
            payload = {'push_to_jira': True}
            daily_worklog.update(**payload)
        else:
            payload = {'push_to_slack': True}
            daily_worklog.update(**payload)

    def filter_work_log_byUser(self, work_log_ids, user):
        work_logs = DailyWorkLog.objects.all()
        users_work_logs = work_logs.filter(user_id = user)
        filtered_work_log_ids = []
        for work_log in users_work_logs:
            print work_log.id
            filtered_work_log_ids.append(work_log.id)
        return filtered_work_log_ids

def authorize_user(f):
    def wrapper(self, request):
        JWT_SECRET = 'secret'
        JWT_ALGORITHM = 'HS256'
        try:
            jwt_token = request.META['HTTP_AUTHORIZATION']
            payload = jwt.decode(jwt_token, JWT_SECRET,
                                 algorithms=[JWT_ALGORITHM])

            getDataModel = GetModelData()
            user = getDataModel.getUserById(payload)
            if user:
                result_payload  =  f(self, request, payload)
            else:
                result_payload = Response({"status": False, "msg": "Error"})
            return result_payload
        except Exception as e:
            return Response({"status": False, "msg": e.message})
    return wrapper