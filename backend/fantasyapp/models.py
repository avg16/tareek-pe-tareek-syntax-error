from django.db import models
from usersapp.models import User
import random
from datetime import datetime

# Helper function to generate a bright color
def get_bright_color():
    bright_colors = ['#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#33FFF6', '#FF33F6', '#FF3380']
    return random.choice(bright_colors)

class Fantasy(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to User model
    anonymous = models.BooleanField(default=False)  # Boolean field for anonymous or not
    likes = models.IntegerField(default=0)  # Field for likes (default set to 0)
    description = models.TextField()  # Field for description
    title = models.CharField(max_length=255)  # Title field
    color = models.CharField(max_length=7, blank=True)  # Color field (store color codes)
    unique_name = models.CharField(max_length=100, unique=True, blank=True)  # Unique name field
    time_added = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Assign a bright color if the color field is empty
        
        if not self.color:
            self.color = get_bright_color()

        # Save the instance to set time_added before generating unique_name
        if not self.pk:
            super(Fantasy, self).save(*args, **kwargs)

        # Generate the unique_name using title and time_added (formatted without colons)
        if not self.unique_name:
            self.unique_name = f"{self.title}-{self.time_added.strftime('%Y%m%d%H%M%S')}"
            # Save again to update unique_name
            super(Fantasy, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
