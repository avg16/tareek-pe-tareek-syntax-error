from django.db import models
from usersapp.models import User

# Create your models here.
class PastDateImage(models.Model):
    image = models.ImageField(upload_to='past_date_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for PastDate {self.past_dates.first().id if self.past_dates.exists() else 'Unassigned'}"
    

class DateRequest(models.Model):
    STATUS_CHOICES = [
        ('not_answered', 'Not Answered'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]
    proposer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="proposer")
    proposed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="proposed")
    time_sent = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    time = models.DateTimeField()
    unique_name = models.SlugField(null=True,blank=True)
    status = models.CharField(choices=STATUS_CHOICES,default="not_answered",max_length=100)



class PastDate(models.Model):

    date = models.ForeignKey(DateRequest, on_delete=models.CASCADE,null=True)
    writter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user1")
    date_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user2')
    location = models.CharField(max_length=255)
    description = models.TextField()
    private = models.BooleanField(default=True)
    time_added = models.DateTimeField(auto_now_add=True)    
    images = models.ManyToManyField(PastDateImage,blank=True)







