from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

@api_view(['POST'])
def register(request):

    username = request.data['username']
    password = request.data['password']

    User.objects.create_user(
        username=username,
        password=password
    )

    return Response({"message":"User created"})


@api_view(['POST'])
def login(request):

    username = request.data['username']
    password = request.data['password']

    user = authenticate(username=username,password=password)

    if user:
        return Response({"message":"Login success"})
    else:
        return Response({"message":"Invalid login"})