# import APIView as APIView
from django.core import serializers
from django.http import JsonResponse
from django.db.models import F, Func, Value, CharField

# from rest_framework.response import Response

from .models import ObjectName


#
# class MyOwnView(APIView):
#     def get(self, request):
#         return Response({'some': 'data'})


def get_objects(request):
    objs = ObjectName.objects.order_by('?')
    filter_field = request.GET.get("filter_field")
    filter_cond = request.GET.get("filter_cond")
    filter_value = request.GET.get("filter_val")
    if filter_field and filter_cond and filter_value is not None:
        filter_conds = {
            'equal': '',
            'contains': '__icontains',
            'more': '__gt',
            'less': '__lt',
        }
        filter_cond = filter_conds[filter_cond]
        if filter_field == "name":
            filter_value = "'%s'" % filter_value
        d = {}
        print('objs=objs.filter(%s%s=%s)' % (filter_field, filter_cond, filter_value))
        exec('objs=objs.filter(%s%s=%s)' % (filter_field, filter_cond, filter_value), locals(), d)
        objs = d['objs']

    order_by = request.GET.get("order_by")
    if order_by:
        objs = objs.order_by(order_by)

    objs = list(objs.values())
    objs = list(map(lambda obj: {"id": obj["id"], "name": obj["name"], "quantity": obj["quantity"],
                                 "length": obj["length"], "date": obj["date"].strftime('%Y-%m-%d %H:%M')}, objs))
    return JsonResponse(objs, safe=False)
