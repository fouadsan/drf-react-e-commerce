from django.urls import path

from .views import MyTokenObtainPairView, AccountManage, UserList, UserDetail

urlpatterns = [
    path('', UserList.as_view(), name='users'),
    path('<str:pk>/', UserDetail.as_view(), name='user-detail'),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('account/', AccountManage.as_view(), name='account')
]
