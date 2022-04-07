from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(
        upload_to="products/images/", blank=True, null=True)
    brand = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    num_reviews = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    count_in_stock = models.IntegerField(blank=True, null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.rating)
