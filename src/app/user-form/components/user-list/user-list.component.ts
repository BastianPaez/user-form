import { Component, EventEmitter, input, output } from '@angular/core';
import { User } from '../../interface/user-form.interface';
import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'user-list',
  imports: [DatePipe, TitleCasePipe, LowerCasePipe],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {

  userList = input.required<User[]>()
  isUpdatingUser =input.required<boolean>()
  activeId = input.required<string>()

  deleteUser = output<string>()
  updateUser = output<string>()
  cancelEdit = output()

  onDelete(id : string){
    this.deleteUser.emit(id)
  }

  onUpdate(id: string){
    this.updateUser.emit(id)
  }

  onCancelEdit(id: string){
    this.cancelEdit.emit()
  }

 }
