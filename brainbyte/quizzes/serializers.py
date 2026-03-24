from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Quiz, Question, Result, Category

# =========================
# QUESTION SERIALIZER
# =========================
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            "id",
            "question",
            "option1",
            "option2",
            "option3",
            "option4",
            "correct_option"
        ]


# =========================
# QUIZ SERIALIZER (FOR LIST)
# =========================
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = [
            "id",
            "title",
            "category",
            "description",
            "time_limit"
        ]


# =========================
# QUIZ DETAIL SERIALIZER (WITH QUESTIONS)
# =========================
class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, source="question_set")

    class Meta:
        model = Quiz
        fields = [
            "id",
            "title",
            "category",
            "description",
            "time_limit",
            "questions"
        ]


# =========================
# RESULT SERIALIZER
# =========================
class ResultSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source="quiz.title", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Result
        fields = [
            "id",
            "user",
            "username",
            "quiz",
            "quiz_title",
            "score",
            "total",
            "created_at"
        ]