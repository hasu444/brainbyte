from rest_framework import viewsets
from .models import Quiz,Question,Category,Result
from .serializers import QuizSerializer,QuestionSerializer,CategorySerializer,ResultSerializer

class QuizViewSet(viewsets.ModelViewSet):

    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuestionViewSet(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ResultViewSet(viewsets.ModelViewSet):

    queryset = Result.objects.all()
    serializer_class = ResultSerializer