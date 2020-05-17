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

    def test_task_create_api_view(self):
        data = {
            'title': 'New todo'
        }
        response = self.client.post(api_reverse('task-create'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 3)

    def test_task_update_api_view(self):
        data = {
            'title': 'New todo',
            'completed': True
        }
        response = self.client.patch(api_reverse('task-update', kwargs={'id': 1}), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.count(), 2)
        updated_task = Task.objects.get(id=1)
        self.assertEqual(updated_task.title, 'New todo')
        self.assertTrue(updated_task.completed)

    def test_task_delete_api_view(self):
        response = self.client.delete(api_reverse('task-delete', kwargs={'id': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(api_reverse('task-detail', kwargs={'id': 1}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Task.objects.count(), 1)
