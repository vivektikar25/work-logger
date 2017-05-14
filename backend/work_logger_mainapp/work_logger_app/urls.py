from django.conf.urls import url, include
import views

urlpatterns = [
    url(r'^get_tickets', views.JiraApiView.as_view()),
    url(r'^jira_log_work', views.JiraLogWorkApiView.as_view()),
    url(r'^save_work_log', views.LogWorkApiView.as_view()),
    url(r'^register_user', views.RegisterUserApiView.as_view()),
    url(r'^login', views.Login.as_view()),
    url(r'^save_credentials', views.UsersCredentials.as_view()),
    url(r'^slack_log_work', views.SlackPushWorkLog.as_view())
]