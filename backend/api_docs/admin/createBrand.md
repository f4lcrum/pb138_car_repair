# Create brand

Adds a new brand

**URL** : `/auth/admin/brand`

**Method** `POST`

**Auth required** : YES (ADMIN)

## Success Response

**Code** : `201 CREATED`


**Body requirements**

```json
{
    "name" : "[just a string]"
}
```


**Body example**
*request example*
```json
{
	"name" : "SAAB"
}
```

**Content example**
*response example*
```json
{
	"error": null,
	"data": {
		"id": "149d26a8-211e-48fa-9650-15aad01fdfe9",
		"name": "SAAB"
	}
}
```

## Error Response


**Condition** : If Body is invalid

**Code** : `400 BAD REQUEST`

**Content example** :
```json
{
	"error": "Invalid Params",
	"data": null
}
```

**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```

**Condition** : Forbidden user access (Forbidden access: CLIENT, TECHNICIAN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```