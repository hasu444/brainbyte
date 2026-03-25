from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from decouple import config
import openai

from .models import Quiz, Question, Result, Category
from .serializers import QuizSerializer, QuizDetailSerializer, ResultSerializer


# =========================
# GET ALL + CREATE QUIZ
# =========================
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def quizzes(request):

    # =========================
    # GET ALL QUIZZES
    # =========================
    if request.method == "GET":
        quizzes = Quiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    # =========================
    # CREATE QUIZ
    # =========================
    if request.method == "POST":
        if not request.user.is_staff:
            return Response({"error": "Only admin can create"}, status=403)

        category_name = request.data.get("category", "General")
        category, _ = Category.objects.get_or_create(name=category_name)

        quiz = Quiz.objects.create(
            title=request.data.get("title"),
            description=request.data.get("description"),
            time_limit=request.data.get("time_limit", 10),
            category=category
        )

        for q in request.data.get("questions", []):
            Question.objects.create(
                quiz=quiz,
                question=q["question"],
                option1=q["options"][0],
                option2=q["options"][1],
                option3=q["options"][2],
                option4=q["options"][3],
                correct_option=q["correct_option"]
            )

        return Response({"message": "✅ Quiz created successfully!"})


# =========================
# GET + UPDATE + DELETE QUIZ
# =========================
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def quiz_detail_update(request, id):

    try:
        quiz = Quiz.objects.get(id=id)
    except Quiz.DoesNotExist:
        return Response({"error": "Quiz not found"}, status=404)

    # =========================
    # GET SINGLE QUIZ
    # =========================
    if request.method == "GET":
        serializer = QuizDetailSerializer(quiz)
        return Response(serializer.data)

    # =========================
    # UPDATE QUIZ
    # =========================
    if request.method == "PUT":
        if not request.user.is_staff:
            return Response({"error": "Only admins can update"}, status=403)

        quiz.title = request.data.get("title", quiz.title)
        quiz.category_id = request.data.get("category", quiz.category_id)
        quiz.description = request.data.get("description", quiz.description)
        quiz.time_limit = request.data.get("time_limit", quiz.time_limit)
        quiz.save()

        # delete old questions
        quiz.question_set.all().delete()

        # recreate questions
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
    # DELETE QUIZ
    # =========================
    if request.method == "DELETE":
        if not request.user.is_staff:
            return Response({"error": "Only admins can delete"}, status=403)

        quiz.delete()
        return Response({"message": "✅ Quiz deleted successfully!"})


# =========================
# SUBMIT QUIZ
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz(request):

    quiz_id = request.data.get("quiz_id")
    answers = request.data.get("answers")

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
# AI QUIZ GENERATION
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

        prompt = f"""
        Generate 5 MCQs on {topic} in JSON:
        [
          {{
            "question": "",
            "option1": "",
            "option2": "",
            "option3": "",
            "option4": "",
            "correct_option": 1
          }}
        ]
        """

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        return Response({
            "quiz": response.choices[0].message.content
        })

    except Exception as e:
        print(e)
        return Response({"error": "❌ AI generation failed"}, status=500)