from django.db import models


class Complaint(models.Model):
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=400)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return 'complaint - id: %d, title: %s, text: %s, date: %s' % (self.id, self.title, self.text, str(self.pub_date))


class Comment(models.Model):
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)
    text = models.CharField(max_length=400)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return 'comment - id: %d, text: %s, date: %s' % (self.id, self.text, str(self.pub_date))

