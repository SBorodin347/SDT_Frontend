import {Pipe, PipeTransform} from "@angular/core";
import {UserList} from "../models/user.model";

@Pipe({
  name: 'userFilterByName'
})
export class UserFilterByNamePipe implements PipeTransform{
  transform(users: UserList[], search: string): UserList[] {
    if (!search.trim()){
      return users;
    }
    return users.filter(user=>{
      return user.lastName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ;
    })
  }
}
