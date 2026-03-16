from rest_framework import serializers
from .models import Quiz,Question,Category,Result

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Result
        fields = '__all__'