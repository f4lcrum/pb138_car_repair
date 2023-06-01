# Create brand

Adds a new brand

**URL** : `/auth/admin/brand`

**Method** `POST`

**Auth required** : YES (ADMIN)

## Success Response

**Code** : `201 CREATED`

**Content example**
```json
{
	"error": null,
	"data": {
		"id": "149d26a8-211e-48fa-9650-15aad01fdfe9",
		"name": "SAAB"
	}
}
```

**Body requirements**

```json
{
    "name" : "[just a string]"
}
```

**Body example**

```json
{
	"name" : "SAAB"
}
```

## Error Response

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content example** :
```json
{
    "status": "Internal error"
}
```

**Condition** : If Body is invalid

**Code** : `400 BAD REQUEST`

**Content example** :
```json
{
	"error": "Invalid Params",
	"data": null
}
```
