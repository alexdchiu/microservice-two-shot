from django.contrib import admin

# from wardrobe.api.wardrobe_api.models import Location

# Register your models here.
from .models import LocationVO, Hat

@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
  pass


@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
  pass