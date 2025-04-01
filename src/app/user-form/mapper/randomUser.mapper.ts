import { RandomUser } from "../interface/randomUserApi.interface";
import { UserForm } from "../interface/user-form.interface";


export default class RandomUserMapper{

  static userFormat(user : RandomUser ) : UserForm{
    return {
      name: `${user.results[0].name.first} ${user.results[0].name.last}`,
      gender: user.results[0].gender,
      email: user.results[0].email,
      birthday: user.results[0].dob.date
    }
  }

}
