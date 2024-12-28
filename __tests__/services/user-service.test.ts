import { UserService } from "../../src/application/Services/User/user-service";
import { IUserService } from "../../src/application/Services/User/IUserService";
import { UserRepository } from "../../src/infrastructure/userRepository/IUserRepo";
import { FakeUserRepo } from "../../src/libs/helper/FakeUserRepo";
import { CreateUserDto, ReturnUserDto } from "../../src/domain/User/dtos";
import { instanceToPlain } from "class-transformer";

describe("User service", () => {
  let userService: IUserService;
  let userRepo: UserRepository;

  beforeEach(() => {
    userRepo = new FakeUserRepo();
    userService = new UserService(userRepo);
  });

	describe('Should create User', () => {

		let returnDto: ReturnUserDto;
		const userData = {
				nombre: "Jorge",
				segundo_nombre: "Luis",
				apellido_paterno: "Duran",
				apellido_materno: "Alcala",
				fecha_de_nacimiento: "20 junio 2001",
				email: "jorgeluis20.duran@gmail.com",
				telefono: "+584267472629",
			}

		beforeEach(async () => {
			const createUserDto = CreateUserDto.create(userData);
			returnDto = await userService.create(createUserDto);
		})

		test("should create a user", async () => {
			const userData = instanceToPlain(returnDto);
			expect(userData.nombre).toBeDefined();
			expect(userData.apellido_materno).toEqual(userData.apellido_materno);
		});


	})


});
