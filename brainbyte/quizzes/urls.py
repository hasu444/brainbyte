from django.urls import path
from . import views

urlpatterns = [

    path("quizzes/", views.get_quizzes),
    path("quizzes/<int:id>/", views.get_quiz_detail),

    path("submit/", views.submit_quiz),
    path("results/", views.get_results),
    path("leaderboard/", views.leaderboard),

    # ✅ NEW ADMIN APIs
    path("quizzes/create/", views.create_quiz),
    path("quizzes/update/<int:id>/", views.update_quiz),
    path("quizzes/delete/<int:id>/", views.delete_quiz),

    # 🤖 AI
    path("quizzes/generate-ai/", views.generate_ai_quiz),
]