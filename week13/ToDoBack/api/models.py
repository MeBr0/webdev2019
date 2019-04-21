from django.db import models

from django.contrib.auth.models import User


class TaskListManager(models.Manager):
    def for_user(self, user):
        print(user)
        return self.filter(owner=user)


# TODO: set constraints
class TaskList(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    objects = TaskListManager()

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class Task(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField()
    due_on = models.DateTimeField()
    status = models.BooleanField()
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)
    notes = models.CharField(max_length=200, default='', blank=True)

    objects = TaskListManager()

    def __str__(self):
        return '{}: {}, in list {}'.format(self.id, self.name, self.task_list)
