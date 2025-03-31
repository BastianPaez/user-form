



##Español

# Calories Tracker 📜
Bienvenido a este proyecto construido con Angular 17+, donde mas allá de utilizar Reactive Forms, creo una válidacion personalizada y hago un llamado a una API para poder llenar los campos de forma aleatoria.

## Proyecto ☕️
Este proyecto contiene:
✅CRUD.
✅Reactive Forms.
✅Validaciones personalizadas.
✅Consulta a una api con http de tipo get con HttpClient.
✅Pipes de tipo Date.
✅Flujo de datos entre componentes con Input y Output.

## Visita la página web 🎉
Puedes visitar la página en [este enlace](https://user-form-bpt.netlify.app/).

## Detalles Generales 🔥


## Reactive Form 📋
Cree un form con los campos name, gender, email, birthday. 

```typescript
  myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern), this.formUtils.notAllowedEmail(() => this.userList(),()=> this.isUpdatingUser())]],
    birthday: [null, Validators.required]
  })

```
🛑NOTA: Tuve problemas con el input de Birthday, debido a que no sabía como manejar la inicialización del campo, porque dentro de mi interfaz que tipaba la entrada de datos tenia el tipado de esta forma
```typescript
 birthday: Date 
 ```
Entonces tome el camino de iniciar en el formulario el campo birthday como new Date(), al no saber como manejar los campos con fecha, pero esto me causaba problemas con la validación, al estar iniciacilizada de esta forma, siempre estaba con datos, entonces el required no funcionaba.
La solucion fue iniciar el formulario con un valor ```null```.

## Validación personalizada [utils](./src/app/user-form/form-utils/form-utils.ts) ❌
Debido a que estaba utilizando emails en un campo de mi formulario, necesitaba el required que ya viene con reactive forms y dos validaciones más.
  ❗Validar que el campo tenga el formato correcto de un correo electrónico(Los validators ya tienen una validación para emails, pero no es tan robusto como me gustaría, asi que lo hice con una expresión regular)

  ❗Validar que si el correo ya existe en los usuarios registrados, estos no deben repetirse.

  ```typescript
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern), this.formUtils.notAllowedEmail(() => this.userList(),()=> this.isUpdatingUser())]],
  ```

  ```typescript
    static notAllowedEmail( userList : () => User[], isUpdatingUser: () => boolean ) {
    return (email : AbstractControl) => {
      if(!email.value)  return null
      if(isUpdatingUser()) return null
      const emailExist = userList().some( item => item.email === email.value )
      return emailExist ? {emailAlreadyExist : true} : null
    }
  }
  ```
  debido a que dentro del [componente donde manejo el formulario](./src/app/user-form/components/form/form.component.ts) obtengo la lista de usuarios y un boolean y estos cambian dinámicamente, el paso primer paso fue pasarle estos parámetros a la validación, tuve que estructurarla como una función de orden superior y además pasar los parámetros como funciones, de esta forma cada vez que se inicien las validaciones se actualizaran los parametros qque recibe la validación.

## [Service](./src/app/user-form/services/user-form.service.ts) 📂⬅
Dentro del Service, mantuve gran parte de la lógica de la aplicación.
## httpClient📋
Dentro de service hice una peticion http con httpclient, donde formatee los datos obtenidos a los que necesitaba con esta [función](./src/app/user-form/mapper/randomUser.mapper.ts).
Tambien encadene efectos secundarios con tap para manejar un estado boolean en el caso de que le petición se demore en dar una respuesta el formulario deberia opacarse.
```typescript
  getRandomUser() : Observable<UserForm>{
    return this.http.get<RandomUser>(this.url()).pipe(
      tap(() =>  this.isLoadingRandomUser.set(true)),
      map( randomUser => RandomUserMapper.userFormat(randomUser)),
      tap(user => this.currentUser.set(user)),
      tap(() => this.isLoadingRandomUser.set(false))
    )
  }
```

Aquí hacemos la suscripcion a la petición mediante un acción que se le asigna a un botón
```typescript
  getRandomUser(){
    this.userFormService.getRandomUser().pipe(
    ).subscribe()
  }
```



✅ Guardado dinámico en localStorage

Cree y almacené los datos mediante un signal, sincronizándolos con un effect.

```typescript
const loadLocalStorage = () =>{
  const localstorage = localStorage.getItem('users')
  return localstorage ?  JSON.parse(localstorage) : []
}

```
```typescript
  saveLocalStorage = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.users()))
  })
```


## 📌 Conclusión:
Este proyecto me ayudó a interiorizarme un poco más en reactive forms y en obtener datos de una api con HttpClient 💡






##English

# User Form 📜
Welcome to this proyect builded with Angular 17+, here i use Reactive Forms, i make a custom validation for the form and i called an API so i can fill in the fields with random data.


## Proyect ☕️
Este proyecto contiene:
✅CRUD.
✅Reactive Forms.
✅Custom Validations.
✅Http requests with HttpClient.
✅Date pipe.
✅Components comunication with input and output

## Visit the app 🎉
You can visit the web page [in this link](https://user-form-bpt.netlify.app/).

## Detalles Generales 🔥

## Reactive Form 📋
I made a form with name, gender, email, birthday fields

```typescript
  myForm : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern), this.formUtils.notAllowedEmail(() => this.userList(),()=> this.isUpdatingUser())]],
    birthday: [null, Validators.required]
  })

```
🛑NOTE: I got problems with the field of Birthday, because i wasn't know how declare the field, in my interface i was declare this variable like this
```typescript
 birthday: Date 
 ```
 Then i take te decision of declare in my form in the field birthday how a new Date(), but this field has a problem with the validation, because when the form was create, this field are not null, then the validation didn't work. 
 The solution was be declare the field with a ```null```

## Custom Validation [utils](./src/app/user-form/form-utils/form-utils.ts) ❌
How i was utilice emails field, i was use the default required validator and two more valitions.
  ❗Validate the field was contain the correct format of a email(The default validator of email, doesn't like me, then i make this validation with a regular expresion)

  ❗Validate if the email it's exist in the users arrar, the emails doesn't be repited

  ```typescript
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern), this.formUtils.notAllowedEmail(() => this.userList(),()=> this.isUpdatingUser())]],
  ```

  ```typescript
    static notAllowedEmail( userList : () => User[], isUpdatingUser: () => boolean ) {
    return (email : AbstractControl) => {
      if(!email.value)  return null
      if(isUpdatingUser()) return null
      const emailExist = userList().some( item => item.email === email.value )
      return emailExist ? {emailAlreadyExist : true} : null
    }
  }
  ```
  Because in the [component when i use the form](./src/app/user-form/components/form/form.component.ts) i got the array of users and a boolean and this dates changing dinamically,
  the first step was to pass the parameters to the validation, i had to estructure this like a high order function and pass this parameters like a function, this method allowed to each time when the validation was activated the parameters will be updated.

## [Service](./src/app/user-form/services/user-form.service.ts) 📂⬅
In this service i keep a mostly part of the logic in the app.

## httpClient📋
I make a http request with httClient, when i was formated the data of the api with this [class](./src/app/user-form/mapper/randomUser.mapper.ts).
I also chained secondary effect with tap to manipulate a boolean state in the case if the requets has a delay in the response.

```typescript
  getRandomUser() : Observable<UserForm>{
    return this.http.get<RandomUser>(this.url()).pipe(
      tap(() =>  this.isLoadingRandomUser.set(true)),
      map( randomUser => RandomUserMapper.userFormat(randomUser)),
      tap(user => this.currentUser.set(user)),
      tap(() => this.isLoadingRandomUser.set(false))
    )
  }
```
Here made the suscription with an action in a button
```typescript
  getRandomUser(){
    this.userFormService.getRandomUser().pipe(
    ).subscribe()
  }
```



✅ Dynamic save in the local storage.

I make and save the information with a signal, synchronizing whi a Effect

```typescript
const loadLocalStorage = () =>{
  const localstorage = localStorage.getItem('users')
  return localstorage ?  JSON.parse(localstorage) : []
}

```
```typescript
  saveLocalStorage = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.users()))
  })
```


## 📌 Conclusión:
This proyect help me to learn more of the reactive forms and made http request with HttpClien💡

# user-form
