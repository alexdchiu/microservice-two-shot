from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from django.shortcuts import render
from pkg_resources import require

from hats.api.common.json import ModelEncoder
from hats.api.hats_rest.models import Hat, LocationVO

# Create your views here.
class LocationVODetailEncoder(ModelEncoder):
  model = LocationVO
  properties = ["href", "closet_name", "section_name", "shelf_number"]

class HatListEncoder(ModelEncoder):
  model = Hat
  properties = ["fabric", "style", "color", "pic_url",]

  def get_extra_data(self, o):
    return {"location": o.location.href}

class HatDetailEncoder(ModelEncoder):
  model = Hat
  properties = [
    "fabric",
    "style",
    "color",
    "pic_url",
    "location"
  ]
  encoders = {
    "location": LocationVODetailEncoder(),
  }

@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
  
  if request.method == "GET":
    if location_vo_id is None:
      hats = Hat.objects.all()
    else:
      hats = Hat.objects.filter(location=location_vo_id)
    return JsonResponse(
      {"hats": hats},
      encoder = HatListEncoder
    )
  
  else:
    content = json.loads(request.body)

    try:
      location_href = content['location']
      location = LocationVO.objects.get(href=location_href)
      content['location'] = location
    except LocationVO.DoesNotExist:
      return JsonResponse(
        {"message": "Invalid location id"},
                status=400,
      )
    
    hat = Hat.objects.create(**content)
    return JsonResponse(
      hat,
      encoder = HatDetailEncoder,
      safe=False,
    )


def api_show_hat(request, pk):
  hat = Hat.objects.get(id=pk)
  return JsonResponse(
    hat,
    encoder=HatDetailEncoder,
    safe=False,
  )