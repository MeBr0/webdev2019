from django.db import models


# TODO: set constraints
class TaskList(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)


class Task(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField()
    due_on = models.DateTimeField()
    status = models.BooleanField()
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {}, in list {}'.format(self.id, self.name, self.task_list)
