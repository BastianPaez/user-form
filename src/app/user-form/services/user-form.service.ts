import { effect, inject, Injectable, signal } from '@angular/core';
import { User, UserForm } from '../interface/user-form.interface';
import { HttpClient } from '@angular/common/http';
import {  map, Observable, tap } from 'rxjs';
import RandomUserMapper from '../mapper/randomUser.mapper';
import { RandomUser } from '../interface/randomUserApi.interface';

const loadLocalStorage = () =>{
  const localstorage = localStorage.getItem('users')
  return localstorage ?  JSON.parse(localstorage) : []
}


@Injectable({providedIn: 'root'})
export class UserFormService {

  http = inject(HttpClient)

  isUpdatingUser= signal(false)

  isLoadingRandomUser = signal(false)

  users = signal<User[]>(loadLocalStorage())


  currentId = signal<string>('')

  user = signal({
    name: '',
    gender: '',
    email: '',
    birthday: null
  })

  url = signal('https://randomuser.me/api/')


  currentUser = signal<UserForm>(this.user())

  saveLocalStorage = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.users()))
  })


  getNewUser(newUser : UserForm){
    const user = {
      ...newUser,
      id: crypto.randomUUID(),
      registerDate: new Date()
    }
    this.users.update(prev => [...prev, user])
    this.clearUserForm()
  }

  getRandomUser() : Observable<UserForm>{
    return this.http.get<RandomUser>(this.url()).pipe(
      tap(() =>  this.isLoadingRandomUser.set(true)),
      map( randomUser => RandomUserMapper.userFormat(randomUser)),
      tap(user => this.currentUser.set(user)),
      tap(() => this.isLoadingRandomUser.set(false))
    )
  }


  deleteUser(id: string){
    this.users.update(prev => prev.filter(item => item.id !== id))
  }



  getUser(id : string){
    this.isUpdatingUser.set(true)

    const selectedUser = this.users().find(item => item.id === id)
    this.currentId.set(id)

    this.setUser(selectedUser!)
  }

  setUser(selectedUser : User){
    const {name, gender, email, birthday} = selectedUser

    this.currentUser.set({
      name, gender, email, birthday
    })
  }

  updateUser(updatedUser : UserForm){
    const updatedUsersList = this.users().map( item => {
      if( item.id === this.currentId()){
        const registerDate = item.registerDate
        return {
          ...updatedUser,
          id: this.currentId(),
          registerDate: registerDate
        }
      }
      return item
    })
    this.users.set(updatedUsersList)

    this.currentId.set('')
    this.isUpdatingUser.set(false)
    this.clearUserForm()
  }

  cancelEdit(){
    this.currentId.set('');
    this.isUpdatingUser.set(false)
    this.currentUser.set(this.user())
  }

  clearUserForm(){
    this.currentUser.set({
      name: '',
      gender: '',
      email: '',
      birthday: null
    })
  }


}
