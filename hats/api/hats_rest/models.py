from stat import FILE_ATTRIBUTE_DIRECTORY
from django.db import models
# from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
  href = models.CharField(max_length=200, unique=True)
  closet_name = models.CharField(max_length=100)
  section_number = models.PositiveSmallIntegerField()
  shelf_number = models.PositiveSmallIntegerField()

  def __str__(self):
        return f'{self.closet_name} - Sec # {self.section_number} / Shelf # {self.shelf_number}'

class Hat(models.Model):
  fabric = models.CharField(max_length=200)
  style = models.CharField(max_length=200)
  color = models.CharField(max_length=200)
  pic_url = models.URLField(null=True)
  location = models.ForeignKey(
    LocationVO,
    related_name="hats",
    on_delete=models.CASCADE,
  )

  def __str__(self):
        return f'{self.style} - {self.color}'

  # def get_api_url(self):
  #       return reverse("api_show_hat", kwargs={"pk": self.pk})