# 학습 키워드

- react-router-dom 

## 정리

강의 내용 외에도 react-router-dom에 대해 정리해본다.

### useParams

URL의 파라미터를 가져와 활용하고 싶다면 useParams 훅을 사용한다.  
예를 들어, router에서 /users/:id 이렇게 라우터 경로를 설정했다고 하면  

http://localhost:3000/users/1 이라는 URL에서 아래와 같이 1을 가져올 수 있다.

```ts
const {id} = useParams()
```