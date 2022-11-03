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
        - 400 : 유효성 검사에 적합하지 않은 경우.

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
                    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRsZWhkZHVxMyIsImlhdCI6MTY2NzM5NTM4OSwiZXhwIjoxNjY3Mzk4OTg5fQ.f6qaf2MwXPRu-SYAGG6T5Y9EQ1OStDnaryZa3ROSqOw"
                }
            ```
        - 401 : login failed

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
        - 404 : 해당 id를 가진 재고가 존재하지 않을 경우

<br/>

- ### 재고 수정
    - 아래 수정 과정은 모두 `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - #### 상태 수정 : `PATCH /inventorys/:id/status`
        - `status`는 [InventoryStatus](https://github.com/2dongyeop/inventory-management-system/blob/main/src/inventory/inventory-status.enum.ts)에 정의된 값이어야 함.
        - request
            ```JSON
                {
                    "status": "ONSALE"
                }
            ```
        - response
            - 정상 동작일 경우
                ```JSON
                    {
                        "id": 1,
                        "name": "[name]",
                        "price": "[price]",
                        "description": null,
                        "manufacturer": null,
                        "status": "ONSALE"
                    }
                ```
        
            - 400 : 유효성 검사를 통과하지 못했을 경우
    
    <br/>

    - #### 설명 수정 : `PATCH /inventorys/:id/descriptions`
        - request
            ```JSON
                {
                    "descriptions": "삭제 대상"
                }
            ```
        - response
            ```JSON
                {
                    "id": 1,
                    "name": "[name]",
                    "price": "[price]",
                    "description": "삭제 대상",
                    "manufacturer": null,
                    "status": "ONSALE"
                }
            ```
    
    <br/>

    - #### 제조업체 수정 : `PATCH /inventorys/:id/manufacturers`
        - request
            ```JSON
                {
                    "manufacturer": "한밭 제과"
                }
            ```
        - response
            ```JSON
                {
                    "id": 1,
                    "name": "[name]",
                    "price": "[price]",
                    "description": "삭제 대상",
                    "manufacturer": "한밭 제과",
                    "status": "ONSALE"
                }
            ```

<br/>

- ### 재고 삭제 : `DELETE /inventorys/:id`
    - `signin`을 통해 얻은 토큰을 요청과 함께 보내야 함.
    - response
        - 정상 동작일 경우 : 응답 없음.