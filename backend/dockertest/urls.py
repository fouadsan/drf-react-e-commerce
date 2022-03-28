from django.urls import path
from .views import TestList

app_name = 'test'

urlpatterns = [
    path('', TestList.as_view(), name='listcreate'),
]
