from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from decouple import config
import openai

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
    try:
        quiz = Quiz.objects.get(id=id)
    except Quiz.DoesNotExist:
        return Response({"error": "Quiz not found"}, status=404)

    serializer = QuizDetailSerializer(quiz)
    return Response(serializer.data)

# =========================
# SUBMIT QUIZ
# =========================
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Quiz, Question, Result

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request):
    """
    Submit a quiz and calculate score
    """
    quiz_id = request.data.get("quiz_id")
    answers = request.data.get("answers")  # {question_id: selected_option_index}

    try:
        quiz = Quiz.objects.get(id=quiz_id)
    except Quiz.DoesNotExist:
        return Response({"error": "Quiz not found"}, status=404)

    questions = Question.objects.filter(quiz=quiz)
    score = 0

    for q in questions:
        qid = str(q.id)
        if qid in answers:
            if int(answers[qid]) == q.correct_option:
                score += 1

    # Save result
    Result.objects.create(
        user=request.user,
        quiz=quiz,
        score=score,
        total=questions.count()
    )

    return Response({
        "score": score,
        "total": questions.count(),
        "message": f"You scored {score}/{questions.count()}"
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

# =========================
# CREATE QUIZ (ADMIN ONLY)
# =========================
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Quiz, Question
from .serializers import QuizSerializer

from .models import Quiz, Category

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    """
    Create a quiz from JSON or Excel. Default category is 'General' if not provided.
    """
    category_name = request.data.get("category", "General")
    category, created = Category.objects.get_or_create(name=category_name)

    questions_data = request.data.get("questions", [])

    quiz = Quiz.objects.create(
        title=request.data.get("title", "Untitled Quiz"),
        description=request.data.get("description", ""),
        time_limit=request.data.get("time_limit", 10),
        category=category
    )

    for q in questions_data:
        Question.objects.create(
            quiz=quiz,
            question=q["question"],
            option1=q["options"][0],
            option2=q["options"][1],
            option3=q["options"][2],
            option4=q["options"][3],
            correct_option=int(q["correct_option"])
        )

    return Response({"message": "Quiz created successfully!"})

# =========================
# UPDATE QUIZ (ADMIN ONLY)
# =========================
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_quiz(request, id):
    try:
        quiz = Quiz.objects.get(id=id)
    except Quiz.DoesNotExist:
        return Response({"error": "Quiz not found"}, status=404)

    quiz.title = request.data.get("title", quiz.title)
    quiz.category_id = request.data.get("category", quiz.category_id)
    quiz.description = request.data.get("description", quiz.description)
    quiz.time_limit = request.data.get("time_limit", quiz.time_limit)
    quiz.save()

    # Delete old questions
    quiz.question_set.all().delete()

    # Create new questions
    for q in request.data.get("questions", []):
        Question.objects.create(
            quiz=quiz,
            question=q["question"],
            option1=q["option1"],
            option2=q["option2"],
            option3=q["option3"],
            option4=q["option4"],
            correct_option=q.get("correct_option", 1)
        )

    return Response({"message": "✅ Quiz updated successfully!"})

# =========================
# DELETE QUIZ (ADMIN ONLY)
# =========================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_quiz(request, id):
    try:
        quiz = Quiz.objects.get(id=id)
    except Quiz.DoesNotExist:
        return Response({"error": "Quiz not found"}, status=404)

    quiz.delete()
    return Response({"message": "✅ Quiz deleted successfully!"})

# =========================
# AI QUIZ GENERATION (OPTIONAL)
# =========================
OPENAI_API_KEY = config("OPENAI_API_KEY", default="")
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def generate_ai_quiz(request):
    if not OPENAI_API_KEY:
        return Response({"error": "OpenAI API key not set"}, status=500)

    try:
        topic = request.data.get("topic")
        if not topic:
            return Response({"error": "Topic is required"}, status=400)

        prompt = f"Generate 5 multiple choice questions on '{topic}' in JSON format like: \
[{{'question':'', 'option1':'', 'option2':'', 'option3':'', 'option4':'', 'correct_option':1}}]"

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        text = response.choices[0].message.content
        return Response({"quiz": text})

    except Exception as e:
        print(e)
        return Response({"error": "❌ Failed to generate AI quiz"}, status=500)