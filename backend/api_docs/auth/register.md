# Register

Insert a new user to Database and collect token for login (you stay logged after registration).

**URL** : `/auth/register/`

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

**Data example**

```json
{
	"email": "jozsissadfo@azet.sk",
	"firstName": "Vladqo",
	"lastName": "sherlock",
	"phoneNumber": "+421123456789",
	"password": "12345678",
	"role": "TECHNICIAN"
}
```
OR
```json
{
	"email": "jozsissadfo@azet.sk",
	"firstName": "Vladqo",
	"lastName": "sherlock",
	"phoneNumber": "+421123456789",
	"password": "12345678"
}
```
## Success Response

**Code** : `201 CREATED`

**Content example**

```json
{
	"data": {
		"item": {
			"firstName": "Vladqo",
			"lastName": "sherlock",
			"email": "jozsissdo@azet.sk",
			"role": "TECHNICIAN"
		},
		"message": "User jozsissdo@azet.sk is authorized"
	}
}
```

## Error Responses

**Condition** : If ANY of data does not pass validation.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"status": "failure",
	"error": "Invalid body data"
}
```

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "status": "Internal error"
}
```

**Condition** : If someone use input email already.

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
	"status": "failure",
	"error": "Email is already in use!"
}
```