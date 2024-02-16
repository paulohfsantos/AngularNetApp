using AngularNetApp.Server.Domain.Database;
using AngularNetApp.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace AngularNetApp.Server.Infra.Repositories
{
    public class UserRepository(DatabaseContext databaseContext)
    {
        private readonly DatabaseContext _databaseContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public async Task<User> Register(User user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
            }
            return user;
        }

        public async Task<User?> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
                if (result.Succeeded)
                {
                    return user;
                }
            }
            return null;
        }
    }
}
