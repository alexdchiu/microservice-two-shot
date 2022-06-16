from django.contrib import admin

# Register your models here.
from shoes_rest.models import BinVO 
from shoes_rest.models import Shoes

@admin.register(BinVO) 
class BinVOAdmin(admin.ModelAdmin):
    pass 

@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    pass