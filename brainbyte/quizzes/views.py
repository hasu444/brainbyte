from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser


from .models import Quiz, Question, Result
from .serializers import QuizSerializer, QuizDetailSerializer, ResultSerializer

# =========================
# GET ALL QUIZZES
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quizzes(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)

# =========================
# GET QUIZ WITH QUESTIONS
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz_detail(request, id):
    quiz = Quiz.objects.get(id=id)
    serializer = QuizDetailSerializer(quiz)
    return Response(serializer.data)

# =========================
# SUBMIT QUIZ
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request):

    quiz_id = request.data.get("quiz_id")
    answers = request.data.get("answers")

    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)

    score = 0

    for q in questions:
        if str(q.id) in answers:
            if int(answers[str(q.id)]) == q.correct_option:
                score += 1

    result = Result.objects.create(
        user=request.user,
        quiz=quiz,
        score=score,
        total=questions.count()
    )

    return Response({
        "score": score,
        "total": questions.count()
    })

# =========================
# USER RESULTS
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_results(request):
    results = Result.objects.filter(user=request.user)
    serializer = ResultSerializer(results, many=True)
    return Response(serializer.data)

# =========================
# LEADERBOARD
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leaderboard(request):

    results = Result.objects.all().order_by('-score')[:10]
    serializer = ResultSerializer(results, many=True)

    return Response(serializer.data)


from rest_framework.permissions import IsAdminUser

# =========================
# CREATE QUIZ (ADMIN ONLY)
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def create_quiz(request):

    title = request.data.get("title")
    questions_data = request.data.get("questions")

    quiz = Quiz.objects.create(title=title)

    for q in questions_data:
        Question.objects.create(
            quiz=quiz,
            text=q["question"],
            option1=q["options"][0],
            option2=q["options"][1],
            option3=q["options"][2],
            option4=q["options"][3],
            correct_option=q["options"].index(q["answer"]) + 1
        )

    return Response({"message": "Quiz created successfully"})


# =========================
# UPDATE QUIZ (ADMIN ONLY)
# =========================
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_quiz(request, id):

    quiz = Quiz.objects.get(id=id)
    quiz.title = request.data.get("title")
    quiz.save()

    # delete old questions
    quiz.question_set.all().delete()

    for q in request.data.get("questions"):
        Question.objects.create(
            quiz=quiz,
            text=q["question"],
            option1=q["options"][0],
            option2=q["options"][1],
            option3=q["options"][2],
            option4=q["options"][3],
            correct_option=q["options"].index(q["answer"]) + 1
        )

    return Response({"message": "Quiz updated"})

# =========================
# DELETE QUIZ (ADMIN ONLY)
# =========================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_quiz(request, id):

    quiz = Quiz.objects.get(id=id)
    quiz.delete()

    return Response({"message": "Quiz deleted"})



from openai import OpenAI
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
import json
import re

# Initialize OpenAI client
client = OpenAI(api_key=settings.OPENAI_API_KEY)


from openai import OpenAI
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
import json
import re
import logging

logger = logging.getLogger(__name__)

client = OpenAI(api_key=settings.OPENAI_API_KEY)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def generate_ai_quiz(request):
    topic = request.data.get("topic")

    if not topic:
        return Response({"error": "Topic is required"}, status=400)

    prompt = f"""
    STRICT RULES:
    - ONLY return JSON
    - NO explanation or extra text

    Create 5 multiple choice questions on {topic}

    Format:
    [
      {{
        "question": "Question here",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
      }}
    ]
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        content = response.choices[0].message.content
        logger.info(f"AI raw response: {content}")

        # Extract JSON array only
        match = re.search(r"\[.*\]", content, re.DOTALL)

        if not match:
            logger.error("AI returned no JSON")
            return Response({
                "error": "AI did not return valid JSON",
                "raw": content
            }, status=500)

        json_str = match.group()
        try:
            questions = json.loads(json_str)
        except json.JSONDecodeError as e:
            logger.error(f"JSON parse failed: {e}")
            return Response({
                "error": "JSON parsing failed",
                "raw": content
            }, status=500)

        # Optional: validate questions structure
        for q in questions:
            if "question" not in q or "options" not in q or "answer" not in q:
                logger.error("AI returned invalid question format")
                return Response({
                    "error": "AI returned invalid question format",
                    "raw": content
                }, status=500)

        return Response({"questions": questions})

    except Exception as e:
        logger.exception("AI quiz generation failed")
        return Response({"error": str(e)}, status=500)