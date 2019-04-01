from django.shortcuts import render
from django.http import HttpResponse

from .models import Complaint, Comment


def complaints(request):
    return HttpResponse(Complaint.objects.all())


def complaint_by_id(request, complaint_id):
    try:
        res = Complaint.objects.get(pk=complaint_id)

        print(res)

        return HttpResponse(res)

    except:
        return HttpResponse('Complaint with id: %d not found' % complaint_id)

def comments(request, complaint_id):
    try:
        res = Complaint.objects.filter()
        pass

    except:
        pass


