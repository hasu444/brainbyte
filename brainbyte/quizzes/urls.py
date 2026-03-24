from django.urls import path
from . import views

urlpatterns = [
    path('quizzes/', views.get_quizzes, name='get_quizzes'),
    path('quizzes/<int:id>/', views.get_quiz_detail, name='get_quiz_detail'),
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),  # <-- Add this line
    path('results/', views.get_results, name='get_results'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('quizzes/create/', views.create_quiz, name='create_quiz'),
]