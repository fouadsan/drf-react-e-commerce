from django.urls import path


from .views import MyTokenObtainPairView, \
    UserList, UserRegister, get_user_profile, update_user_profile

urlpatterns = [
    path('', UserList.as_view(), name="users"),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', UserRegister.as_view(), name="user-register"),
    path('profile/', get_user_profile, name="user-profile"),
    path('profile/update/', update_user_profile, name="update-user-profile"),
]
