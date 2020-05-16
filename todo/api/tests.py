from rest_framework.reverse import reverse as api_reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from todo.models import Task


class TaskAPITestCase(APITestCase):
    def setUp(self):
        self.task1 = Task.objects.create(title='test1')
        self.task2 = Task.objects.create(title='test2')
        self.client = APIClient()

    def test_task_list_api_view(self):
        response = self.client.get(api_reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.count(), 2)

    def test_task_detail_api_view(self):
        response = self.client.get(api_reverse('task-detail', kwargs={'id': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task = response.data
        self.assertEqual(task['id'], 1)
        self.assertEqual(task['title'], 'test1')
        self.assertFalse(task['completed'])
