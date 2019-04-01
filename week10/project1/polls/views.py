from django.shortcuts import render
from django.http import HttpResponse
from polls.models import Question


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def polls_list(request):
    res = []

    print(Question.objects.all)

    for el in Question.objects.all():
        data = {}

        data['text'] = el.question_text
        data['date'] = el.pub_date

        res.append(data)

    return HttpResponse(res)


def get_poll(request, poll_id):
    try:
        a = Question.objects.get(pk=poll_id)
        print(a)

        return HttpResponse([question_json(a)])

    except Exception:
        return HttpResponse("Not found question with %d id" % poll_id)


def question_json(question):
    data = {}

    data['text'] = question.question_text
    data['date'] = question.pub_date

    return data
