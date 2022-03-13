from . import views
from django.urls import path

urlpatterns = [
    path('', views.get_objects),
    # path('1', views.get_objects2)
]
