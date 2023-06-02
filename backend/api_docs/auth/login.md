# Login

Used to collect a Token for a registered User.

**URL** : `/auth/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid email address]",
    "password": "[password in plain text, with minimal length of 8 chars]"
}
```

**Data example**

```json
{
    "username": "iloveauth@example.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**
*request body:*
```json
{
	"email" : "alino@gmail.com",
	"password": "alinko123"
}
```
*Response* :
```json
{
	"error": null,
	"data": {
		"message": "Logged in"
	}
}
```


## Error Responses

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"error": "Wrong mail or password",
	"data": null
}
```

**Condition** : If body does not pass validation.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"error": "Invalid Body",
	"data": null
}
```
