using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Services
{
    public class TokenService
    {
        public TokenService(UserManager<User> userManager)
        {
            
        }
    }
}