from django.urls import path


from .views import MyTokenObtainPairView, AccountManage

urlpatterns = [
    # path('', UserList.as_view(), name="users"),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('account/', AccountManage.as_view(), name="account"),
    # path('create/', CustomUserCreate.as_view(), name="create-user"),
    # path('register/', UserRegister.as_view(), name="user-register"),
    # path('profile/', get_user_profile, name="user-profile"),
    # path('profile/update/', update_user_profile, name="update-user-profile"),
]
