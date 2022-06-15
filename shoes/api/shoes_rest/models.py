from tokenize import Binnumber
from django.db import models

# Create your models here.

class BinVO(models.Model): 
    closet_name = models.CharField(max_length=100) 
    bin_number = models.PositiveSmallIntegerField() 
    bin_size =  models.PositiveSmallIntegerField()
    href = models.CharField(max_length=200, unique=True)


class Shoes(models.Model):


    manufactuer = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picurl = models.URLField(null=True)
    
    bin = models.ForeignKey(BinVO, related_name="shoes", on_delete=models.CASCADE)
   
    
    def __str__(self):
        return self.name

    # def get_api_url(self):
    #     return reverse("api_show_shoes", kwargs={"pk": self.pk})