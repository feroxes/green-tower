import { AuthService } from './auth-service';
import { FarmService } from './farm-service';
import { UserService } from './user-service';

const Calls = {
  Auth: AuthService,
  User: UserService,
  Farm: FarmService,
};

export default Calls;
