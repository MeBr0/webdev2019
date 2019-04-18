from django.db import models


class TaskList(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Task(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField()
    due_on = models.DateTimeField()
    status = models.CharField(max_length=50)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)

    def __str__(self):
        return '{}: {}, in list {}'.format(self.id, self.name, self.task_list)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'createdAt': self.created_at,
            'dueOn': self.due_on,
            'status': self.status
        }
