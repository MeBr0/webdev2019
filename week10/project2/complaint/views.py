from django.shortcuts import render
from django.http import HttpResponse

from complaint.models import Complaint, Comment


def complaints(request):
    if request.method == 'GET':
        return HttpResponse(Complaint.objects.all())

    elif request.method == 'POST':
        return HttpResponse(request.data)


def complaint_by_id(request, complaint_id):
    if request.method == 'GET':
        try:
            res = Complaint.objects.get(pk=complaint_id)

            print(res)

            return HttpResponse(res)

        except:
            return HttpResponse('Complaint with id: %d not found' % complaint_id)

    elif request.method == 'POST':
        return HttpResponse(request.data)


def comments(request, complaint_id):
    try:
        res = Comment.objects.get(complaint=complaint_id)\

        return HttpResponse(res)

    except:
        return HttpResponse('not found!')


