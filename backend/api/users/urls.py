from django.urls import path

from .views import MyTokenObtainPairView, AccountManage, UserList

urlpatterns = [
    path('', UserList.as_view(), name='users'),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('account/', AccountManage.as_view(), name='account'),
]
