from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoes, BinVO
# Create your views here.

class BinVODetailEncoder(ModelEncoder): 
    model = BinVO 
    properties = ["closet", "binnum", "binsize", "href"] 

class ShoeListEncoder(ModelEncoder): 
    model = Shoes 
    properties = ["manufactuer", "name"] 
    #instead of pulling bin in properties getting it in get_extra_data 

    def get_extra_data(self, o):
        return {
            "bin": o.bin.href, 
        }
    
class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = ["manufactuer", "name", "color", "url", "bin"]
    encoders = {
        "bin": BinVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        # Get the Bin object and put it in the content dict
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(href=bin_href)
            content["bin"] = bin
            #not sure about this logic 
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

def api_show_shoe(request, pk):
    shoe = Shoes.objects.get(id=pk)
    return JsonResponse(
        shoe,
        encoder=ShoeDetailEncoder,
        safe=False,
    )
