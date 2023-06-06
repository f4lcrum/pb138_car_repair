# Register

Insert a new user to Database and collect token for login (you stay logged after registration).

**URL** : `/auth/registration/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
	"email": "[valid email address]",
	"firstName": "[string]",
	"lastName": "[string]",
	"phoneNumber": "[valid phone number]",
	"password": "[string with min. length of 8 chars]",
	"role": "['TECHNICIAN', Optional parameter. Default role is 'CLIENT']"
}
```

**Data example** :
*request :*
```json
{
	"email": "m23123@azet.sk",
	"firstName": "Vladqo",
	"lastName": "sherlock",
	"phoneNumber": "+421123456789",
	"password": "12345678",
	"isTechnician": "false"
}
```
OR
```json
{
	"email": "m23123@azet.sk",
	"firstName": "Vladqo",
	"lastName": "sherlock",
	"phoneNumber": "+421123456789",
	"password": "12345678",
	"isTechnician": "true"
}
```
## Success Response

**Code** : `201 CREATED`

**Content example** : *response body :*

```json
{
	"error": null,
	"data": {
		"item": {
			"firstName": "Vladqo",
			"lastName": "sherlock",
			"email": "m23123@azet.sk",
			"role": "CLIENT"
		},
		"message": "User m23123@azet.sk is authorized"
	}
}
```
OR

```json
{
	"error": null,
	"data": {
		"item": {
			"firstName": "Vladqo",
			"lastName": "sherlock",
			"email": "m23123@azet.sk",
			"role": "TECHNICIAN"
		},
		"message": "User m23123@azet.sk is authorized"
	}
}
```
## Error Responses

**Condition** : If body does not pass validation.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"error": "Invalid body data",
	"data": null
}
```


**Condition** : If someone use input email already.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Email is already in use!",
	"data": null
}
```
