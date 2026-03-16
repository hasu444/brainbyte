from django.urls import path,include
from rest_framework.routers import DefaultRouter

from .views import QuizViewSet,QuestionViewSet,CategoryViewSet,ResultViewSet

router = DefaultRouter()

router.register('quizzes',QuizViewSet)
router.register('questions',QuestionViewSet)
router.register('categories',CategoryViewSet)
router.register('results',ResultViewSet)

urlpatterns = [

path('',include(router.urls))

]