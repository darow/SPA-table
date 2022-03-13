from django.db import models
from django.utils import timezone


class ObjectName(models.Model):
    date = models.DateTimeField(default=timezone.now, verbose_name="Дата")
    name = models.CharField(max_length=200, verbose_name="Название")
    quantity = models.IntegerField(default=0, verbose_name="Количество")
    length = models.FloatField(verbose_name="Расстояние")
