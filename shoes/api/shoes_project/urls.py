"""shoes_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from shoes.api.shoes_rest.views import api_list_shoes, api_show_shoe
urlpatterns = [
    path('admin/', admin.site.urls),
    path("shoes/", api_list_shoes, name="create_shoe"),
    path(
        "bins/<int:bin_vo_id>/shoes/",
        api_list_shoes,
        name="list_shoes",
    ),
    path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),

    
]
