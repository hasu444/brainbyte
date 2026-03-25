from django.urls import path
from . import views

urlpatterns = [

    # ✅ GET + POST
    path("quizzes/", views.quizzes),

    # ✅ GET + PUT + DELETE
    path("quizzes/<int:id>/", views.quiz_detail_update),

    path("submit-quiz/", views.submit_quiz),
    path("results/", views.get_results),
    path("leaderboard/", views.leaderboard),

    path("ai/generate/", views.generate_ai_quiz),
]