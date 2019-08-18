from django.shortcuts import render

from django.views.generic import View
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from rest_framework.views import APIView

# importing the requests library 
# import requests 
# import json
# import urllib

# Front end app view that loads the app
class FrontendAppView(View):
  """
  Serves the compiled frontend entry point (only works if you have run `yarn
  run build`).
  """
  def get(self, request):
    callback_addr = "http://51.140.8.145/en/module/ps_buybuttonlite/RedirectManager?id_product=2\&action=1\&id_product_attribute=11\&custom_text="
    product_reference = request.GET.get('pr', '')

    payload = {
      'callback_addr': callback_addr,
      'product_reference': product_reference,
    }

    print(payload)
    try:
      return render(request, 'lightbar/build/index.html', payload)
    except FileNotFoundError:
      return HttpResponse(
        """
        This URL is only used when you have built the production
        version of the app. Visit http://localhost:3000/ instead, or
        run `yarn run build` to test the production version.
        """,
        status=501,
      )