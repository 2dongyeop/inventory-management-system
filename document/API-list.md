# API 설계도

## Authentication
- ### 회원가입 : `POST /auth/signup`
    - `username`은 4자 이상 20자 이하, `password`는 4자 이상 20자 이하의 길이인 영어와 숫자만 가능
    - request
        ```JSON
            {
                "username": "[username]",
                "password": "[password]"
            }
        ```
    - response : 잘못된 요청일 경우만 존재
        - 400 : Bad request
        - 409 : Existing username

<br/>

- ### 로그인 : `POST /auth/signin`
    - request
        ```JSON
            {
                "username": "[username]",
                "password": "[password]"
            }
        ```
    - response
        - 정상 동작일 경우 : 토큰을 제공
            ```JSON
                {
                    "accessToken": "@@@.@@@.@@@"
                }
            ```
        - 400 : Bad request, logIn failed

<br/>

<br/>

## Accessing User Information
- ### 유저 정보 수정 : `PATCH /users/:id/username`
    - 요청에 사용자 정보를 담아 보낸다.
    - request
        ```JSON
            {
                "username": "[username]",
                "password": "[password]",
                "updateUsername": "[updateUsername]"
            }
        ```
    - response
      - 400 : logIn failed
      - 401 : Unauthorized
      - 404 : 잘못된 id 입력

<br/>

- ### 유저 정보 삭제 : `DELETE /users/:id`
    - 요청에 사용자 정보를 담아 보낸다.
    - request
        ```JSON
            {
                "username": "[username]",
                "password": "[password]"
            }
        ```
    - response
      - 401 : Unauthorized
      - 404 : 잘못된 id 입력

<br/>

<br/>

## Inventory CRUD
- ### 재고 삽입 : `POST /inventorys`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - request
        ```JSON
            {
                "name": "[inventoryname]",
                "price": "[price]"
            }
        ```
    - response
        - 400 : 요청에 Null이 포함되어 있을 경우
        - 401 : Unauthorized

<br/>

- ### 재고 조회 : `GET /inventorys/:id`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - response 
        - 정상 동작일 경우
            ```JSON
                {
                    "id": 1,
                    "name": "[name]",
                    "price": "[price]",
                    "description": null,
                    "manufacturer": null,
                    "status": "NONSALE"
                }
            ```
        - 401 : Unauthorized
        - 404 : 해당 id를 가진 재고가 존재하지 않을 경우

<br/>

- ### 재고 수정 : `PATCH /inventorys/:id`
    - 아래 수정 과정은 모두 `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - `status`, `description`, `manufacturer` 중 바꾸고 싶은 컬럼과 값을 넣는다.
    - request 
        ```JSON
            {
                "description": "쿼리빌더로 바꿔보자"
            }
        ```
    - response
        - 400 : Bad request
        - 401 : Unauthorized   


<br/>

- ### 재고 삭제 : `DELETE /inventorys/:id`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - response
        - 정상 동작일 경우 : 응답 없음.
        - 401 : Unauthorized