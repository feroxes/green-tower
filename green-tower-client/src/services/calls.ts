import { AuthService } from './auth-service';
import { CustomersService } from './customers-service';
import { FarmService } from './farm-service';
import { PlantsService } from './plants-service';
import { UserService } from './user-service';

const Calls = {
  Auth: AuthService,
  User: UserService,
  Farm: FarmService,
  Plants: PlantsService,
  Customers: CustomersService,
};

export default Calls;
