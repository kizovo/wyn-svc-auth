import UserService from '../services/UserService'

export default class UserHandler {
  private userService = new UserService

  listUser() {
    return this.userService.listUser();
  }

  insertUser(req: any) {
    this.userService.insertUser(req);
  }
}
