from django.test import TestCase
from .models import Task


class TaskModelTests(TestCase):

    def test_create_task(self):
        self.assertEqual(Task.objects.count(), 0)
        task = Task.objects.create(title='test')

        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(task.title, 'test')
        self.assertFalse(task.completed)
